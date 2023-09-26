import { ContractResult, PstAction, PstState } from '../../types/types';

declare const ContractError;

export const askedMints = async (
  state: PstState,
  { input: { target } }: PstAction
): Promise<ContractResult> => {
  const ticker = state.ticker;
  const waitingForMint = state.waitingForMint;
  const balances = state.balances;


  if (typeof balances[target] !== 'number') {
    throw new ContractError('Cannot get balance, target does not exist');
  }

  return { result: { target, ticker, waitingForMint: waitingForMint } };
};
