import { ContractResult, PstAction, PstState } from '../../types/types';

declare const ContractError;

export const burnTokens = async (
  state: PstState,
  { caller, input: { target, qty } }: PstAction
): Promise<ContractResult> => {
  const balances = state.balances;

  if(caller !== state.owner){
    throw new ContractError('Only the owner of the contract can mint tokens.');
  }

  if (qty <= 0) {
    throw new ContractError('Invalid token mint');
  }

  if(balances[target] < qty){
    throw new ContractError(`Balance not high enough to brun ${qty} token(s)!`);
  }

  if (!Number.isInteger(qty)) {
    throw new ContractError('Invalid value for "qty". Must be an integer');
  }

  balances[target] =- qty;
  
  return { state };
};
