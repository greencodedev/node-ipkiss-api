import { Request, Response } from "express";
import { getAccounts, setAccounts } from "../constants/accounts";
import { checkAccount } from "../helpers/checkAccount";
import { Account } from "../models/account";

export const event = async (request: Request, response: Response) => {
  try {
    let data: any = {};
    switch (request.body.type) {
      case "deposit":
        data = depositAmount(request);
        return response.status(201).json(data);
      case "withdraw":
        data = withdrawAmount(request);
        return response.status(201).json(data);
      case "transfer":
        data = transferAmount(request);
        return response.status(201).json(data);
      default:
        return response.status(404).json(0);
    }
  } catch (error: any) {
    response.status(404).json(0);
  }
};

const depositAmount = (request: Request) => {
  const index: number = checkAccount(request.body.destination);
  const accounts: Account[] = getAccounts();
  if (index !== -1) {
    accounts[index].balance += request.body.amount;
    setAccounts(accounts);
    return {
      destination: accounts[index],
    };
  } else {
    const newAccount = {
      id: request.body.destination,
      balance: request.body.amount,
    };
    accounts.push(newAccount);
    setAccounts(accounts);
    return {
      destination: newAccount,
    };
  }
};

const withdrawAmount = (request: Request) => {
  const index = checkAccount(request.body.origin);
  const accounts = getAccounts();
  if (index !== -1) {
    accounts[index].balance -= request.body.amount;
    setAccounts(accounts);
    return {
      origin: accounts[index],
    };
  } else {
    throw "non-exist";
  }
};

const transferAmount = (request: Request) => {
  const origin_index = checkAccount(request.body.origin);
  const dest_index = request.body.destination;
  const accounts = getAccounts();
  if (origin_index !== -1) {
    accounts[origin_index].balance -= request.body.amount;
    if (checkAccount(request.body.destination) === -1)
      accounts.push({
        id: dest_index,
        balance: request.body.amount,
      });
    else accounts[dest_index].balance += request.body.amount;
    setAccounts(accounts);
    return {
      origin: accounts[origin_index],
      destination: accounts[checkAccount(request.body.destination)],
    };
  } else {
    throw "non-exist";
  }
};
