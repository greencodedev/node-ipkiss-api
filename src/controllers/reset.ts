import { Request, Response } from "express";
import { setAccounts } from "../constants/accounts";

export const reset = async (request: Request, response: Response) => {
  setAccounts([]);
  response.send(200);
};
