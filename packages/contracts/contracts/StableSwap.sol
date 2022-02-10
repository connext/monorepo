// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "./interfaces/IStableSwap.sol";

contract StableSwap is IStableSwap, ReentrancyGuard {
    uint public constant N_COINS = 2;

    uint256 public constant  FEE_DENOMINATOR = 10 ** 10;
    uint256 public constant  PRECISION = 10 ** 18;  // The precision to convert to
    uint256[N_COINS] public PRECISION_MUL = [1, 1];  // decimal 18 => 1, 6 = 10 ** 12
    uint256[N_COINS] public RATES = [1000000000000000000, 1000000000000000000];   // 10 ** (36 - decimals)
    
    uint256 public constant  MAX_FEE = 5 * 10 ** 9;
    uint256 public constant  MAX_A = 10 ** 6;
    uint256 public constant  MAX_A_CHANGE = 10;

    uint256 public constant  ADMIN_ACTIONS_DELAY = 3 * 86400;
    uint256 public constant  MIN_RAMP_TIME = 86400;

    address[N_COINS] public coins;
    uint256[N_COINS] public balances;

    address public owner;
    uint256 public fee;

    uint256 public  initial_A;
    uint256 public  future_A;
    uint256 public  initial_A_time;
    uint256 public  future_A_time;

    uint256 public  admin_actions_deadline;
    uint256 public  transfer_ownership_deadline;
    address public  future_owner;
    uint256 public  future_fee;

    bool public is_inited;

    bool private is_stopped;
    uint256 private kill_deadline;
    uint256 public constant KILL_DEADLINE_DT = 2 * 30 * 86400;

    constructor(
        address _owner,
        address[N_COINS] memory _coins,
        uint256 _A,
        uint256 _fee
    ) {
        for(uint i = 0; i < N_COINS; i++) {
        require(_coins[i] != address(0));
        }
        coins = _coins;
        initial_A = _A;
        future_A = _A;
        fee = _fee;
        owner = _owner;
        kill_deadline = block.timestamp + KILL_DEADLINE_DT;
    }

    function _get_A() internal view returns(uint256) {
        //Handle ramping A up or down
        uint256 t1 = future_A_time;
        uint256 A1 = future_A;

        if (block.timestamp < t1) {
            uint256 A0 = initial_A;
            uint256 t0 = initial_A_time;
            // Expressions in uint256 cannot have negative numbers, thus "if"
            if (A1 > A0) {
                return A0 + (A1 - A0) * (block.timestamp - t0) / (t1 - t0);
            } else {
                return A0 - (A0 - A1) * (block.timestamp - t0) / (t1 - t0);
            }
        } else {  //when t1 == 0 or block.timestamp >= t1
            return A1;
        }
    }

    function get_A() external view returns(uint256) {
        return _get_A();
    }

    function _xp() internal view returns(uint256[N_COINS] memory) {
        uint256[N_COINS] memory result = RATES;
        for (uint i = 0; i < N_COINS; i++) {
            result[i] = result[i] * balances[i] / PRECISION;
        }
           
        return result;    
    }

    function _xp_mem(uint256[N_COINS] memory _balances) internal view returns(uint256[N_COINS] memory) {
        uint256[N_COINS] memory result = RATES;
        for (uint i = 0; i < N_COINS; i++) {
            result[i] = result[i] * _balances[i] / PRECISION;
        }
           
        return result;    
    }

    function get_D(uint256[N_COINS] memory xp, uint256 amp) internal pure returns(uint256) {
        uint256 S = 0;
        for (uint x_i = 0; x_i < N_COINS; x_i++) {
            S += xp[x_i];
        }
        
        if (S == 0) {
            return 0;
        }
            
        uint256 Dprev = 0;
        uint256 D = S;
        uint256 Ann = amp * N_COINS;

        for (uint _i = 0; _i < 255; _i ++) {
            uint D_P = D;
            for (uint x_i = 0; x_i < N_COINS; x_i++) {
                D_P = D_P * D / (xp[x_i] * N_COINS);  // If division by 0, this will be borked: only withdrawal will work. And that is good
            }

            Dprev = D;
            D = (Ann * S + D_P * N_COINS) * D / ((Ann - 1) * D + (N_COINS + 1) * D_P);
            // Equality with the precision of 1
            if (D > Dprev) {
                if (D - Dprev <= 1) {
                    break;
                }
            }
            else {
                if (Dprev - D <= 1) {
                    break;
                }
            }
                
        }
            
        return D;
    }

    function get_D_mem(uint256[N_COINS] memory _balances, uint256 amp) internal view returns(uint256) {
        return get_D(_xp_mem(_balances), amp);
    }

    function get_y(uint i, uint j, uint256 x, uint256[N_COINS] memory xp_) internal view returns(uint256) {
        // x in the input is converted to the same price/precision

        require(i != j);       // dev: same coin
        require(j >= 0);       // dev: j below zero
        require(j < N_COINS);  // dev: j above N_COINS

        // should be unreachable, but good for safety
        require(i >= 0);
        require(i < N_COINS);

        uint256 amp = _get_A();
        uint256 D = get_D(xp_, amp);
        uint256 c = D;
        uint256 S_ = 0;
        uint256 Ann = amp * N_COINS;

        uint256 _x = 0;
        for (uint _i = 0; _i < N_COINS; _i++) {
            if (_i == i) {
                _x = x;
            }
            else if (_i != j) {
                _x = xp_[_i];
            } 
            else {
                continue;
            }
                
            S_ += _x;
            c = c * D / (_x * N_COINS);
        }

        c = c * D / (Ann * N_COINS);
        uint256 b = S_ + D / Ann;  // - D
        uint256 y_prev = 0;
        uint256 y = D;

        for (uint _i = 0 ; _i < 255; _i ++) {
            y_prev = y;
            y = (y*y + c) / (2 * y + b - D);
            // Equality with the precision of 1
            if (y > y_prev) {
                if (y - y_prev <= 1) {
                    break;
                }
            } 
            else {
                if (y_prev - y <= 1) {
                    break;
                }
            }
        }

        return y;
    }

    function get_dy(uint i, uint j, uint256 dx) external view returns(uint256) {
        uint256[N_COINS] memory rates = RATES;
        uint256[N_COINS] memory xp = _xp();

        uint256 x = xp[i] + (dx * rates[i] / PRECISION);
        uint256 y = get_y(i, j, x, xp);
        uint256 dy = (xp[j] - y - 1) * PRECISION / rates[j];
        uint256 _fee = fee * dy / FEE_DENOMINATOR;
        return dy - _fee;
    }

    function exchange(uint i, uint j, uint256 dx, uint256 min_dy) internal onlyNotStopped {
        uint256[N_COINS] memory rates = RATES;

        uint256[N_COINS] memory old_balances = balances;
        uint256[N_COINS] memory xp = _xp_mem(old_balances);

        // Handling an unexpected charge of a fee on transfer (USDT, PAXG)
        uint256 dx_w_fee = dx;
        IERC20 input_coin = IERC20(coins[i]);

        dx_w_fee = input_coin.balanceOf(address(this));
        SafeERC20.safeTransferFrom(input_coin, address(msg.sender), address(this), dx);
        dx_w_fee = input_coin.balanceOf(address(this)) - dx_w_fee;

        uint256 x = xp[i] + dx_w_fee * rates[i] / PRECISION;
        uint256 y = get_y(i, j, x, xp);

        uint256 dy = xp[j] - y - 1;  // -1 just in case there were some rounding errors
        uint256 dy_fee = dy * fee / FEE_DENOMINATOR;
        
        // Convert all to real units
        dy = (dy - dy_fee) * PRECISION / rates[j];
        require(dy >= min_dy, "Exchange resulted in fewer coins than expected");

        // Change balances exactly in same way as we change actual ERC20 coin amounts
        
        balances[i] = old_balances[i] + dx_w_fee;
        // When rounding errors happen, we undercharge admin fee in favor of LP
        balances[j] = old_balances[j] - dy;


        SafeERC20.safeTransfer(IERC20(coins[j]), address(msg.sender), dy);
    }

    function add_liquidity(uint256[N_COINS] calldata amounts) external onlyNotStopped {
        uint256[N_COINS] memory fees = [uint256(0), 0];
        uint256 _fee = fee * N_COINS / (4 * (N_COINS - 1));
        uint256 amp = _get_A();

        // Initial invariant
        uint256 D0 = 0;
        uint256[N_COINS] memory old_balances = balances;
        if (is_inited) {
            D0 = get_D_mem(old_balances, amp);
        } 
            
        uint256[N_COINS] memory new_balances = old_balances;

        for (uint i = 0 ; i < N_COINS; i++) {
            uint256 in_amount = amounts[i];
            if (!is_inited) {
                require(in_amount > 0, "initial deposit requires all coins");
            }
                
            IERC20 in_coin = IERC20(coins[i]);

            // Take coins from the sender
            if (in_amount > 0) {
                in_amount = in_coin.balanceOf(address(this));
                SafeERC20.safeTransferFrom(in_coin, address(msg.sender), address(this), in_amount);
                in_amount = in_coin.balanceOf(address(this)) - in_amount;
            }
            new_balances[i] = old_balances[i] + in_amount;
        }

        // Invariant after change
        uint256 D1 = get_D_mem(new_balances, amp);
        require(D1 > D0);

        // We need to recalculate the invariant accounting for fees
        // to calculate fair user's share
        uint256 D2 = D1;
        if (is_inited) {
            // Only account for fees if we are not the first to deposit
            for (uint i = 0 ; i < N_COINS; i++) {
                uint256 ideal_balance = D1 * old_balances[i] / D0;
                uint256 difference = 0;
                if (ideal_balance > new_balances[i]) {
                    difference = ideal_balance - new_balances[i];
                } else {
                    difference = new_balances[i] - ideal_balance;
                }
                fees[i] = _fee * difference / FEE_DENOMINATOR;
                balances[i] = new_balances[i];
                new_balances[i] -= fees[i];
            }
        
            D2 = get_D_mem(new_balances, amp);
        }
        else {
            balances = new_balances;
        }
            
        is_inited = true;

        //emit AddLiquidity(msg.sender, amounts, fees, D1);
    }

    function remove_liquidity(uint256[N_COINS] calldata amounts) external onlyNotStopped {
        require(is_inited);
        
        uint256 _fee = fee * N_COINS / (4 * (N_COINS - 1));
        uint256 amp = _get_A();

        uint256[N_COINS] memory old_balances = balances;
        uint256[N_COINS] memory new_balances = old_balances;
        uint256 D0 = get_D_mem(old_balances, amp);
        for (uint i = 0; i < N_COINS; i++) {
            new_balances[i] -= amounts[i];
        }
        uint256 D1 = get_D_mem(new_balances, amp);
        uint256[N_COINS] memory fees = [uint256(0), 0];
        for (uint i = 0 ; i < N_COINS; i++) {
            uint256 ideal_balance = D1 * old_balances[i] / D0;
            uint256 difference = 0;
            if (ideal_balance > new_balances[i]) {
                difference = ideal_balance - new_balances[i];
            }
            else {
                difference = new_balances[i] - ideal_balance;
            }

            fees[i] = _fee * difference / FEE_DENOMINATOR;
            balances[i] = new_balances[i];
            new_balances[i] -= fees[i];
        }

        for (uint i = 0; i < N_COINS; i++) {
            if (amounts[i] != 0) {
                SafeERC20.safeTransfer(IERC20(coins[i]), msg.sender, amounts[i]);
            }
        }

        //emit RemoveLiquidityImbalance(msg.sender, amounts, fees, D1);
    }

    /* Admin functions */
    function ramp_A(uint256 _future_A, uint256 _future_time) external onlyOwner {
        require (block.timestamp >= initial_A_time + MIN_RAMP_TIME);
        require (_future_time >= block.timestamp + MIN_RAMP_TIME);  // dev: insufficient time

        uint256 _initial_A = _get_A();
        require (_future_A > 0 && _future_A < MAX_A);
        require (((_future_A >= _initial_A) && (_future_A <= _initial_A * MAX_A_CHANGE)) ||
            ((_future_A < _initial_A) && (_future_A * MAX_A_CHANGE >= _initial_A)));

        initial_A = _initial_A;
        future_A = _future_A;
        initial_A_time = block.timestamp;
        future_A_time = _future_time;

        //emit RampA(_initial_A, _future_A, block.timestamp, _future_time);
    }

    function stop_ramp_A() external onlyOwner {
        uint256 current_A = _get_A();
        initial_A = current_A;
        future_A = current_A;
        initial_A_time = block.timestamp;
        future_A_time = block.timestamp;
        // now (block.timestamp < t1) is always False, so we return saved A

        //emit StopRampA(current_A, block.timestamp);
    }

    function commit_new_fee(uint256 new_fee) external onlyOwner {
        require (admin_actions_deadline == 0); // dev: active action
        require (new_fee <= MAX_FEE);  // dev: fee exceeds maximum
        
        uint256 _deadline = block.timestamp + ADMIN_ACTIONS_DELAY;
        admin_actions_deadline = _deadline;
        future_fee = new_fee;
        
        //emit CommitNewFee(_deadline, new_fee);
    }

    function apply_new_fee() external onlyOwner {
        require (block.timestamp >= admin_actions_deadline);  // dev: insufficient time
        require (admin_actions_deadline != 0);  // dev: no active action

        admin_actions_deadline = 0;
        uint256 _fee = future_fee;
        fee = _fee;
        
        //emit NewFee(_fee);
    }

    function revert_new_parameters() external onlyOwner {
        admin_actions_deadline = 0;
    }

    function commit_transfer_ownership(address _owner) external onlyOwner {
        require (transfer_ownership_deadline == 0);  // dev: active transfer

        uint256 _deadline = block.timestamp + ADMIN_ACTIONS_DELAY;
        transfer_ownership_deadline = _deadline;
        future_owner = _owner;

        //emit CommitNewAdmin(_deadline, _owner);
    }

    function apply_transfer_ownership() external onlyOwner {
        require (block.timestamp >= transfer_ownership_deadline);  // dev: insufficient time
        require (transfer_ownership_deadline != 0);  // dev: no active transfer

        transfer_ownership_deadline = 0;
        owner = future_owner;

        //emit NewAdmin(_owner);
    }

    function revert_transfer_ownership() external onlyOwner {
        transfer_ownership_deadline = 0;
    }

    function stop() external onlyOwner {
        require (kill_deadline > block.timestamp);  // dev: deadline has passed
        is_stopped = true;
    }

    function start() external onlyOwner {
        is_stopped = false;
    }
    
    modifier onlyOwner() {
        require(address(msg.sender) == owner, "caller is not owner");
        _;
    }

    modifier onlyNotStopped() {
        require(!is_stopped, "stopped");
        _;
    }
}
