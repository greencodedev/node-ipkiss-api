import { Request, Response } from "express";
import { accounts } from "../constants/accounts";
import { checkAccount } from "../helpers/checkAccount";

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
        return response.status(404).end(0);
    }
  } catch (error: any) {
    response.status(404).end(0);
  }
};

const depositAmount = (request: Request) => {
  const index = checkAccount(request.body.destination);
  if (index !== -1) {
    accounts[index].balance += request.body.amount;
    return {
      destination: accounts[index],
    };
  } else {
    const newAccount = {
      id: request.body.destination,
      balance: request.body.amount,
    };
    accounts.push(newAccount);
    return {
      destination: newAccount,
    };
  }
};

const withdrawAmount = (request: Request) => {
  const index = checkAccount(request.body.origin);
  if (index !== -1) {
    accounts[index].balance -= request.body.amount;
    return {
      origin: accounts[index],
    };
  } else {
    throw "non-exist";
  }
};

const transferAmount = (request: Request) => {
  const origin_index = checkAccount(request.body.origin);
  const dest_index = checkAccount(request.body.destination);
  if (origin_index !== -1 && dest_index !== -1) {
    accounts[origin_index].balance -= request.body.amount;
    accounts[dest_index].balance += request.body.amount;
    return {
      origin: accounts[origin_index],
      destination: accounts[dest_index],
    };
  } else {
    throw "non-exist";
  }
};
