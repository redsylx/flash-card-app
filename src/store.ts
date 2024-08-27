import { create } from 'zustand';
import IAccount, { defaultAccount } from './interfaces/IAccount';

type AccountState = {
  account: IAccount;
  setAccount: (newAccount: IAccount) => void;
}

const useAccount = create<AccountState>((set) => ({
  account: defaultAccount,
  setAccount: (newAccount) => set(() => ({ account: newAccount })),
}));

export { useAccount };