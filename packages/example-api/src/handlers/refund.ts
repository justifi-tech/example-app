import { Request, Response } from "express";
import { JustifiContext } from "..";
import { randomUUID } from "crypto";


export const listRefunds = (ctx: JustifiContext) => async (req: Request, res: Response) => {
  const sellerAccountId = req.header("Seller-Account");
  if (!sellerAccountId || sellerAccountId.length === 1) {
    return res.status(400).json({ error: "Invalid Seller-Account id header" })
  }

  try {
    const refundsForSeller = await ctx.client.listRefunds(sellerAccountId);
    return res.status(200).json(refundsForSeller)
  } catch (e: any) {
    return res.status(e.code || 500).json(e);
  }
};

export const getRefund = (ctx: JustifiContext) => async (req: Request, res: Response) => {
  const refundId = req.params.refundId;
  if (!refundId) {
    return res.status(400).json({ error: "Refund id parameter is required" })
  }

  try {
    const refund = await ctx.client.getRefund(refundId);
    return res.status(200).json(refund);
  } catch (e: any) {
    return res.status(e.code || 500).json(e);
  }
};

export const updateRefund = (ctx: JustifiContext) => async (req: Request, res: Response) => {
  const refundId = req.params.refundId;
  if (!refundId) {
    return res.status(400).json({ error: "Refund id parameter is required" })
  }

  try {
    const updatedRefund = await ctx.client.updateRefund(refundId, req.body, randomUUID());
    return res.status(200).json(updatedRefund)
  } catch (e: any) {
    return res.status(e.code || 500).json(e);
  }
};
