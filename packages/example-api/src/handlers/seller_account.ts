import { AccountStatus } from "@justifi/justifi-node/dist/internal/account";
import { Request, Response } from "express";
import { JustifiContext } from "..";

export const createSellerAccount = (ctx: JustifiContext) => async (req: Request, res: Response) => {
  const sellerAccountResponse = await ctx.client.createSellerAccount(req.body);

  return res.status(201).json(sellerAccountResponse);
};
export const listSellerAccounts = (ctx: JustifiContext) => async (req: Request<any, any, any, { status?: AccountStatus }>, res: Response) => {
  const sellerAccountsResponse = await ctx.client.listSellerAccounts(req.query.status)

  return res.status(200).json(sellerAccountsResponse);
};
export const getSellerAccount = (ctx: JustifiContext) => async (req: Request, res: Response) => {
  const sellerAccountResponse = await ctx.client.getSellerAccount(req.params.accountId);

  return res.status(200).json(sellerAccountResponse);
};
