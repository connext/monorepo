/* eslint-disable */
import { decimal } from "@protofire/subgraph-toolkit";

import { LpToken, LpTransferEvent } from "../../../generated/schema";
import { Transfer } from "../../../generated/templates/LpToken/ERC20";
import { ADDRESS_ZERO } from "@protofire/subgraph-toolkit";
import { generateNonce, getOrCreateLpAccount, getOrCreateLpAccountBalance } from "./helper";

export function handleLpTransfer(event: Transfer): void {
  let token = LpToken.load(event.address.toHex());

  if (token != null) {
    let amount = decimal.fromBigInt(event.params.value, token.decimals);

    let isBurn = event.params.to.toHex() == ADDRESS_ZERO;
    let isMint = event.params.from.toHex() == ADDRESS_ZERO;
    let isTransfer = !isBurn && !isMint;

    if (isBurn) {
      token.totalSupply = token.totalSupply.minus(amount);
    } else if (isMint) {
      token.totalSupply = token.totalSupply.plus(amount);
    }
    token.save();

    let transferEvent = new LpTransferEvent(event.transaction.hash.toHex() + "-" + event.logIndex.toString());
    transferEvent.token = event.address.toHex();
    transferEvent.amount = amount;
    transferEvent.from = event.params.from;
    transferEvent.to = event.params.to;

    transferEvent.block = event.block.number;
    transferEvent.timestamp = event.block.timestamp;
    transferEvent.transaction = event.transaction.hash;
    transferEvent.nonce = generateNonce(event);

    // Updates balances of accounts
    if (isTransfer || isBurn) {
      let sourceAccount = getOrCreateLpAccount(event.params.from);
      let sourceAccountBalance = getOrCreateLpAccountBalance(sourceAccount, token);

      sourceAccountBalance.amount = sourceAccountBalance.amount.minus(amount);
      sourceAccountBalance.block = event.block.number;
      sourceAccountBalance.modified = event.block.timestamp;
      sourceAccountBalance.transaction = event.transaction.hash;

      sourceAccount.save();
      sourceAccountBalance.save();

      transferEvent.fromBalance = sourceAccountBalance.amount;
    } else {
      transferEvent.fromBalance = decimal.ZERO;
    }

    if (isTransfer || isMint) {
      let destinationAccount = getOrCreateLpAccount(event.params.to);
      let destAccountBalance = getOrCreateLpAccountBalance(destinationAccount, token);

      destAccountBalance.amount = destAccountBalance.amount.plus(amount);
      destAccountBalance.block = event.block.number;
      destAccountBalance.modified = event.block.timestamp;
      destAccountBalance.transaction = event.transaction.hash;

      destinationAccount.save();
      destAccountBalance.save();

      transferEvent.toBalance = destAccountBalance.amount;
    } else {
      transferEvent.toBalance = decimal.ZERO;
    }

    transferEvent.save();
  }
}
