import { Request, Response } from "express";
import { accounts } from "../constants/accounts";
import { Account } from "../models/account";

const checkAccount = (id: string) => {
  if (accounts.length === 0) return -1;
  else {
    var index_acc = -1;
    accounts.map((acc: Account, index: number) => {
      if (acc.id === id) index_acc = index;
    });
    return index_acc;
  }
};
export const balance = async (request: Request, response: Response) => {
  const index_acc = checkAccount(request.params.account_id);
  if (index_acc !== -1) {
    const data = accounts[index_acc].balance;
    return response.status(201).json(data);
  } else {
    return response.status(404).end(0);
  }
};
