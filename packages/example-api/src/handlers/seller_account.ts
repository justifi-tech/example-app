import { AccountStatus } from "@justifi/justifi-node/dist/internal/account";
import { Request, Response } from "express";
import { JustifiContext } from "..";

export const createSellerAccount = (ctx: JustifiContext) => async (req: Request, res: Response) => {
  try {
    const sellerAccountResponse = await ctx.client.createSellerAccount(req.body.name);
    return res.status(201).json(sellerAccountResponse);
  } catch (e: any) {
    return res.status(e.code || 500).json(e);
  }
};

export const listSellerAccounts = (ctx: JustifiContext) => async (req: Request<any, any, any, { status?: AccountStatus }>, res: Response) => {
  try {
    const sellerAccountsResponse = await ctx.client.listSellerAccounts(req.query.status)
    return res.status(200).json(sellerAccountsResponse);
  } catch (e: any) {
    return res.status(e.code || 500).json(e);
  }
};

export const getSellerAccount = (ctx: JustifiContext) => async (req: Request, res: Response) => {
  try {
    const sellerAccountResponse = await ctx.client.getSellerAccount(req.params.accountId);
    return res.status(200).json(sellerAccountResponse);
  } catch (e: any) {
    return res.status(e.code || 500).json(e)
  }
};
