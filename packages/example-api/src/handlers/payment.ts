import { Request, Response } from "express";
import { JustifiContext } from "..";
import { randomUUID } from "crypto";
import { PaymentListFilters } from "@justifi/justifi-node/dist/internal/payment";

export const createPayment = (ctx: JustifiContext) => async (req: Request, res: Response) => {
  const sellerAccountId = req.header("Seller-Account");
  if (!sellerAccountId) {
    return res.status(400).json({ error: "Seller-Account header is required" });
  }

  return res.status(200).json(await ctx.client.createPayment(randomUUID(), req.body.json(), sellerAccountId));
};

export const listPayments = (ctx: JustifiContext) => async (req: Request<any, any, any, PaymentListFilters>, res: Response) => {
  const sellerAccountId = req.header("Seller-Account");
  if (!sellerAccountId) {
    return res.status(400).json({ error: "Seller-Account header is required" });
  }

  return res.status(200).json(await ctx.client.listPayments(req.query, sellerAccountId));
};

export const getPayment = (ctx: JustifiContext) => async (req: Request, res: Response) => {
  return res.status(200).json(await ctx.client.getPayment(req.params.paymentId));
};

export const updatePayment = (ctx: JustifiContext) => async (req: Request, res: Response) => {
  const updatedPayment = await ctx.client.updatePayment(randomUUID(), req.params.paymentId, req.body.json());

  return res.status(200).json(updatedPayment)
};

export const capturePayment = (ctx: JustifiContext) => async (req: Request, res: Response) => {
  return res.status(200).json(await ctx.client.capturePayment(randomUUID(), req.params.paymentId));
};

export const refundPayment = (ctx: JustifiContext) => async (req: Request, res: Response) => {
  return res.status(200).json(await ctx.client.refundPayment(randomUUID(), req.params.paymentId, req.body.json()));
};

export const listPaymentBalanceTransactions = (ctx: JustifiContext) => async (
  req: Request,
  res: Response
) => {
  return res.status(200).json(await ctx.client.listPaymentsForPaymentIntent(req.params.paymentId));
};
