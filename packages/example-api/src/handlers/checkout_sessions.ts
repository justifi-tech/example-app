import { Request, Response } from "express";
import { JustifiContext } from "..";

export const createCheckoutSession = (ctx: JustifiContext) => async (req: Request<any, any, any>, res: Response) => {
  console.log(req);
  const paymentIntentId = req.body;

  try {
    return res.status(200);
  } catch (e: any) {
    return res.status(e.code || 500).json(e);
  }
};