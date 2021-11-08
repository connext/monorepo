import { BigNumber } from "bignumber.js";

const BIG_ZERO = new BigNumber(0);
const BIG_ONE = new BigNumber(1);

// Computes the invariant given the current balances, using the Newton-Raphson approximation.
// The amplification parameter equals: A n^(n-1)
const _calculateInvariant = (amplificationParameter: BigNumber, balances: BigNumber[]): BigNumber => {
  /**********************************************************************************************
    // invariant                                                                                 //
    // D = invariant                                                  D^(n+1)                    //
    // A = amplification coefficient      A  n^n S + D = A D n^n + -----------                   //
    // S = sum of balances                                             n^n P                     //
    // P = product of balances                                                                   //
    // n = number of tokens                                                                      //
    *********x************************************************************************************/
  // D(n+1) = D(n) - (f(Dn)/f'(Dn)) = (AnnS + nDp)Dn / [(Ann-1)Dn + (n+1)Dp]
  // We support rounding up or down.

  const numTokens = balances.length;
  const sum: BigNumber = balances.reduce((prev, curr) => prev.plus(curr), BIG_ZERO);

  if (sum.isEqualTo(0)) {
    return BIG_ZERO;
  }

  let Dprev: BigNumber = BIG_ZERO; // Dn
  let D: BigNumber = sum; // Dn+1
  const Ann = new BigNumber(amplificationParameter).times(numTokens); // An

  for (let i = 0; i < 255; i++) {
    // calculate derivative of f(D)
    let D_P = D;
    for (let j = 0; j < numTokens; j++) {
      D_P = D_P.multipliedBy(D).dividedBy(new BigNumber(balances[j]).times(numTokens));
    }

    Dprev = D;

    //D = (Ann * sum + D_P * numTokens) * D / ((Ann - 1) * D + (numTokens + 1) * D_P)
    const temp1 = Ann.multipliedBy(sum).plus(D_P.times(numTokens));
    const temp2 = Ann.minus(BIG_ONE)
      .multipliedBy(Dprev)
      .plus(D_P.times(numTokens + 1));
    D = temp1.multipliedBy(Dprev).dividedBy(temp2);

    if (D.minus(Dprev).abs().lte(BIG_ONE)) {
      break;
    }
  }

  return D;
};

// This function calculates the balance of a given token (tokenIndex)
// given all the other balances and the invariant
const _getTokenBalanceGivenInvariantAndAllOtherBalances = (
  amp: BigNumber,
  balances: BigNumber[],
  invariant: BigNumber,
  tokenIndex: number,
): BigNumber => {
  const numTokens = balances.length;

  let c = invariant;
  let S_ = BIG_ZERO;
  const Ann = amp.multipliedBy(numTokens);
  let _x = BIG_ZERO;

  for (let i = 0; i < numTokens; i++) {
    if (tokenIndex == i) {
      continue;
    }

    _x = balances[i];

    S_ = S_.plus(_x);
    c = c.multipliedBy(invariant).dividedBy(_x.multipliedBy(numTokens));
  }

  c = c.multipliedBy(invariant).dividedBy(Ann.multipliedBy(numTokens));
  const b = S_.plus(invariant.dividedBy(Ann));

  let y_prev = BIG_ZERO;
  let y = invariant;

  for (let i = 0; i < 255; i++) {
    y_prev = y;
    y = y.pow(2).plus(c).div(y.multipliedBy(2).plus(b).minus(invariant));

    if (y.minus(y_prev).abs().lte(BIG_ONE)) {
      break;
    }
  }

  return y;
};

/**
 * Computes how many tokens can be taken out of a pool if `tokenAmountIn` are sent, given the current balances.
 *
 * @param amp - The amplification parameter
 * @param balances - Array of pool balances
 * @param tokenIndexIn - Input token Index of the pool array
 * @param tokenIndexOut - Output token Index of the pool array
 * @param tokenAmountIn - Input Amount of token
 * @returns BigNumberish string
 */
export const getAmountsOut = (
  amp: string,
  balances: string[],
  tokenIndexIn: number,
  tokenIndexOut: number,
  tokenAmountIn: string,
): string => {
  /**************************************************************************************************************
  // getAmountsOut token x for y - polynomial equation to solve                                                //
  // ay = amount out to calculate                                                                              //
  // by = balance token out                                                                                    //
  // y = by - ay (finalBalanceOut)                                                                             //
  // D = invariant                                               D                     D^(n+1)                 //
  // A = amplification coefficient               y^2 + ( S - ----------  - D) * y -  ------------- = 0         //
  // n = number of tokens                                    (A * n^n)               A * n^2n * P              //
  // S = sum of final balances but y                                                                           //
  // P = product of final balances but y                                                                       //
  **************************************************************************************************************/

  const convertedBalances = balances.map((balance) => new BigNumber(balance));
  const convertedAmp = new BigNumber(amp);

  const lastInvariant = _calculateInvariant(convertedAmp, convertedBalances);

  convertedBalances[tokenIndexIn] = convertedBalances[tokenIndexIn].plus(tokenAmountIn);

  const finalBalanceOut: BigNumber = _getTokenBalanceGivenInvariantAndAllOtherBalances(
    convertedAmp,
    convertedBalances,
    lastInvariant,
    tokenIndexOut,
  );

  return convertedBalances[tokenIndexOut].minus(finalBalanceOut).minus(BIG_ONE).toFixed(0).toString();
};

/**
 * Computes how many tokens must be sent to a pool if `tokenAmountOut` are sent given the
 *
 * @param amp - The amplification parameter
 * @param balances - Array of pool balances
 * @param tokenIndexIn - Input token Index of the pool array
 * @param tokenIndexOut - Output token Index of the pool array
 * @param tokenAmountOut - Output Amount of token
 * @returns BigNumberish string
 */
export const getAmountsIn = (
  amp: number,
  balances: string[],
  tokenIndexIn: number,
  tokenIndexOut: number,
  tokenAmountOut: string,
): string => {
  /**************************************************************************************************************
  // inGivenOut token x for y - polynomial equation to solve                                                   //
  // ax = amount in to calculate                                                                               //
  // bx = balance token in                                                                                     //
  // x = bx + ax (finalBalanceIn)                                                                              //
  // D = invariant                                                D                     D^(n+1)                //
  // A = amplification coefficient               x^2 + ( S - ----------  - D) * x -  ------------- = 0         //
  // n = number of tokens                                     (A * n^n)               A * n^2n * P             //
  // S = sum of final balances but x                                                                           //
  // P = product of final balances but x                                                                       //
  **************************************************************************************************************/
  const convertedBalances = balances.map((balance) => new BigNumber(balance));
  const convertedAmp = new BigNumber(amp);

  const lastInvariant = _calculateInvariant(convertedAmp, convertedBalances);

  convertedBalances[tokenIndexOut] = convertedBalances[tokenIndexOut].plus(tokenAmountOut);

  const finalBalanceIn: BigNumber = _getTokenBalanceGivenInvariantAndAllOtherBalances(
    convertedAmp,
    convertedBalances,
    lastInvariant,
    tokenIndexIn,
  );

  return finalBalanceIn.minus(convertedBalances[tokenIndexIn]).plus(BIG_ONE).toFixed(0).toString();
};
