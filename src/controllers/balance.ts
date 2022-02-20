import { Request, Response } from "express";
import { getAccounts } from "../constants/accounts";
import { checkAccount } from "../helpers/checkAccount";

export const balance = async (request: Request, response: Response) => {
  const index_acc = checkAccount(request.query.account_id.toString());
  const accounts = getAccounts();
  if (index_acc !== -1) {
    const data = accounts[index_acc].balance;
    return response.status(200).json(data);
  } else {
    return response.status(404).json(0);
  }
};
