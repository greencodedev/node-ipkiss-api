import { Request, Response } from "express";
import { accounts } from "../constants/accounts";
import { checkAccount } from "../helpers/checkAccount";

export const balance = async (request: Request, response: Response) => {
  const index_acc = checkAccount(request.params.account_id);
  if (index_acc !== -1) {
    const data = accounts[index_acc].balance;
    return response.status(201).json(data);
  } else {
    return response.status(404).end(0);
  }
};
