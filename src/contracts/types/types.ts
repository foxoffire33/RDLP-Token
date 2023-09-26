export interface PstState {
  ticker: string;
  name: string;
  owner: string;
  waitingForMint: {
    [address: string]: number;
  };
  balances: {
    [address: string]: number;
  };
}

export interface PstAction {
  input: PstInput;
  caller: string;
}

export interface PstInput {
  function: PstFunction;
  target: string;
  qty: number;
  address?: string
}

export interface PstResult {
  target: string;
  ticker: string;
  balance?: number;
  waitingForMint?: { [key: string]: number };
}

export type PstFunction = 'transfer' | 'mint' | 'balance' | 'approveAllMints'  | 'approveMint' | 'askMint' | 'askedMints' | 'burn';

export type ContractResult = { state: PstState } | { result: PstResult };
