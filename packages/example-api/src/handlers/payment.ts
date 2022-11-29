import { Request, Response } from "express";
import { JustifiContext } from "..";
import { randomUUID } from "crypto";
import { PaymentListFilters } from "@justifi/justifi-node/dist/internal/payment";

export const createPayment = (ctx: JustifiContext) => async (req: Request, res: Response) => {
  const sellerAccountId = req.header("Seller-Account");
  if (!sellerAccountId) {
    return res.status(400).json({ error: "Seller-Account header is required" });
  }

  try {
    const payment = await ctx.client.createPayment(randomUUID(), req.body, sellerAccountId);
    return res.status(200).json(payment);
  } catch (e: any) {
    return res.status(e.code || 500).json(e);
  }
};

export const listPayments = (ctx: JustifiContext) => async (req: Request<any, any, any, PaymentListFilters>, res: Response) => {
  const sellerAccountId = req.header("Seller-Account");

  try {
    return res.status(200).json(await ctx.client.listPayments(req.query, sellerAccountId));
  } catch (e: any) {
    return res.status(e.code || 500).json(e);
  }
};

export const getPayment = (ctx: JustifiContext) => async (req: Request, res: Response) => {
  try {
    return res.status(200).json(await ctx.client.getPayment(req.params.paymentId));
  } catch (e: any) {
    return res.status(e.code || 500).json(e);
  }
};

export const updatePayment = (ctx: JustifiContext) => async (req: Request, res: Response) => {
  const updatedPayment = await ctx.client.updatePayment(randomUUID(), req.params.paymentId, req.body);

  try {
    return res.status(200).json(updatedPayment)
  } catch (e: any) {
    return res.status(e.code || 500).json(e);
  }
};

export const capturePayment = (ctx: JustifiContext) => async (req: Request, res: Response) => {
  try {
    return res.status(200).json(await ctx.client.capturePayment(randomUUID(), req.params.paymentId));
  } catch (e: any) {
    return res.status(e.code || 500).json(e);
  }
};

export const refundPayment = (ctx: JustifiContext) => async (req: Request, res: Response) => {
  try {
    return res.status(200).json(await ctx.client.refundPayment(randomUUID(), req.params.paymentId, req.body));
  } catch (e: any) {
    return res.status(e.code || 500).json(e);
  }
};

export const listPaymentBalanceTransactions = (ctx: JustifiContext) => async (
  req: Request,
  res: Response
) => {
  try {
    return res.status(200).json(await ctx.client.listPaymentsForPaymentIntent(req.params.paymentId));
  } catch (e: any) {
    return res.status(e.code || 500).json(e);
  }
};
