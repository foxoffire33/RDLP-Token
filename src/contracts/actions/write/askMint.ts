import { ContractResult, PstAction, PstState } from '../../types/types';

declare const ContractError;

export const askMint = async (
  state: PstState,
  { caller, input: { target, qty } }: PstAction
): Promise<ContractResult> => {
  const balances = state.balances;
  const waitingForMint = state.waitingForMint;

  if (!Number.isInteger(qty)) {
    throw new ContractError('Invalid value for "qty". Must be an integer');
  }

  if (!target) {
    throw new ContractError('No target specified');
  }

  if (qty <= 0 || caller === target) {
    throw new ContractError('Invalid token transfer');
  }

  if (!balances[caller]) {
    throw new ContractError(`Caller balance is not defined!`);
  }

  waitingForMint[caller] ? (waitingForMint[caller] += qty) : (waitingForMint[caller] = qty);

  return { state };
};
