import { askedMints } from './actions/read/askedMints';
import { balance } from './actions/read/balance';
import { approveAllMints } from './actions/write/approveAllMints';
import { approveMint } from './actions/write/approveMint';
import { askMint } from './actions/write/askMint';
import { mintTokens } from './actions/write/mintTokens';
import { transferTokens } from './actions/write/transferTokens';
import { ContractResult, PstAction, PstResult, PstState } from './types/types';

declare const ContractError;

export async function handle(state: PstState, action: PstAction): Promise<ContractResult> {
  const input = action.input;

  switch (input.function) {
    case 'mint':
      return await mintTokens(state, action);
      case 'askMint':
        return await askMint(state, action);
      case 'approveMint':
        return await approveMint(state, action);
      case 'approveAllMints':
        return await approveAllMints(state, action);
    case 'transfer':
      return await transferTokens(state, action);
    case 'balance':
      return await balance(state, action);
      case 'askedMints':
        return await askedMints(state, action);
    default:
      throw new ContractError(`No function supplied or function not recognised: "${input.function}"`);
  }
}
