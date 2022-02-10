// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "./interfaces/IStableSwap.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract StableSwap is IStableSwap, ReentrancyGuard {
  uint public constant N_COINS = 2;

  uint256 public constant  FEE_DENOMINATOR = 10 ** 10;
  uint256 public constant  PRECISION = 10 ** 18;  // The precision to convert to
  uint256[N_COINS] public PRECISION_MUL = [1, 1];
  uint256[N_COINS] public RATES = [1000000000000000000000000000000, 1000000000000000000000000000000];
  

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

  bool private is_killed;
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

  function exchange(uint i, uint j, uint256 dx, uint256 min_dy) internal returns(uint256) {
      require(!is_killed);  // dev: is killed
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

      return dy;
  }


  function swapExact(uint256 amountIn, address assetIn, address assetOut) external payable returns (uint256) {
    uint i = (coins[0] == assetIn ? 0 : 1);
    uint j = i == 0 ? 1 : 0;

    uint256 dy = exchange(i, j, amountIn, 0);
    return dy;
  }
}
