import { Router, Request, Response, NextFunction } from "express";
import { event } from "../controllers/event";
import { balance } from "../controllers/balance";
import { reset } from "../controllers/reset";

const router = Router();

router.get("/", (request: Request, response: Response) => {
  response.json({
    version: "1.0.0",
  });
});

router.get(
  "/balance",
  (request: Request, response: Response, next: NextFunction) => {
    balance(request, response).then(next).catch(next);
  }
);

router.post(
  "/event",
  (request: Request, response: Response, next: NextFunction) => {
    event(request, response).then(next).catch(next);
  }
);

router.post(
  "/reset",
  (request: Request, response: Response, next: NextFunction) => {
    reset(request, response).then(next).catch(next);
  }
);

export default router;
