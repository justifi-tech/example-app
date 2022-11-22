import { Request, Response } from "express";
import { JustifiContext } from "..";
import { randomUUID } from "crypto";

export const createPaymentIntent = (ctx: JustifiContext) => async (req: Request, res: Response) => {
  const sellerAccountId = req.header("Seller-Account");
  if (!sellerAccountId) {
    return res.status(400).json({ error: "Seller-Account header is required" });
  }

  try {
    const paymentIntent = await ctx.client.createPaymentIntent(randomUUID(), req.body, sellerAccountId);
    return res.status(201).json(paymentIntent);
  } catch (e: any) {
    return res.status(e.code || 500).json(e);
  }
};

export const listPaymentIntents = (ctx: JustifiContext) => async (req: Request, res: Response) => {
  const sellerAccountId = req.header("Seller-Account");
  if (!sellerAccountId) {
    return res.status(400).json({ error: "Seller-Account header is required" });
  }

  try {
    const paymentIntents = await ctx.client.listPaymentIntents(sellerAccountId);
    return res.status(200).json(paymentIntents);
  } catch (e: any) {
    return res.status(e.code || 500).json(e);
  }
};

export const getPaymentIntent = (ctx: JustifiContext) => async (req: Request, res: Response) => {
  try {
    return res.status(200).json(await ctx.client.getPaymentIntent(req.params.paymentIntentId));
  } catch (e: any) {
    return res.status(e.code || 500).json(e);
  }
};

export const updatePaymentIntent = (ctx: JustifiContext) => async (req: Request, res: Response) => {
  const sellerAccountId = req.header("Seller-Account");
  if (!sellerAccountId) {
    return res.status(400).json({ error: "Seller-Account header is required" });
  }

  try {
    return res.status(200).json(await ctx.client.updatePaymentIntent(req.params.paymentIntentId, sellerAccountId, req.body));
  } catch (e: any) {
    return res.status(e.code || 500).json(e);
  }
};

export const capturePaymentIntent = (ctx: JustifiContext) => async (req: Request, res: Response) => {
  const sellerAccountId = req.header("Seller-Account");
  if (!sellerAccountId) {
    return res.status(400).json({ error: "Seller-Account header is required" });
  }

  try {
    return res.status(200).json(await ctx.client.capturePaymentIntent(req.params.paymentIntentId, sellerAccountId, req.body));
  } catch (e: any) {
    return res.status(e.code || 500).json(e);
  }
};

export const listPaymentsForPaymentIntent = (ctx: JustifiContext) => async (req: Request, res: Response) => {
  try {
    return res.status(200).json(await ctx.client.listPaymentsForPaymentIntent(req.params.paymentIntentId));
  } catch (e: any) {
    return res.status(e.code || 500).json(e);
  }
};
