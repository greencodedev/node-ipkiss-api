import { accounts } from "../constants/accounts"; // for data.
import { Account } from "../models/account";

export const checkAccount = (id: string) => {
  if (accounts.length === 0) return -1;
  else {
    var index_acc = -1;
    accounts.map((acc: Account, index: number) => {
      if (acc.id === id) index_acc = index;
    });
    return index_acc;
  }
};
