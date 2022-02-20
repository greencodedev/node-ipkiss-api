import { Account } from "../models/account";

export let accounts: Account[] = [];

export const setAccounts = (newAccounts: Account[]) => {
  accounts = newAccounts;
};

export const getAccounts = () => {
  return accounts;
};
