import { Request, Response } from "express";
import { JustifiContext } from "..";

export const createCheckoutSession = (ctx: JustifiContext) => async (req: Request, res: Response) => {
  try {
    const checkoutSession = await ctx.client.createCheckoutSession(req.body);
    return res.status(201).json(checkoutSession);
  } catch (e: any) {
    return res.status(e.code || 500).json(e);
  }
};