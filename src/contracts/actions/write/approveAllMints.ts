import { ContractResult, PstAction, PstState } from '../../types/types';

declare const ContractError;

export const approveAllMints = async (
  state: PstState,
  { caller, input: { qty } }: PstAction
): Promise<ContractResult> => {
  const waitingForMint = state.waitingForMint;
  const balances = state.balances;

  if(caller !== state.owner){
    throw new ContractError('Only the owner can mint the coins.');
  }

  if (qty <= 0) {
    throw new ContractError('Invalid token mint');
  }

  if (!Number.isInteger(qty)) {
    throw new ContractError('Invalid value for "qty". Must be an integer');
  }

  for (let address in waitingForMint) {
    balances[address] ? (balances[address] += qty) : (balances[address] = qty);
}

  return { state };
};
