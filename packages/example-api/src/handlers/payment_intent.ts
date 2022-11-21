import { Request, Response } from "express";
import { JustifiContext } from "..";
import { randomUUID } from "crypto";

export const createPaymentIntent = (ctx: JustifiContext) => async (req: Request, res: Response) => {
  const sellerAccountId = req.header("Seller-Account");
  if (!sellerAccountId) {
    return res.status(400).json({ error: "Seller-Account header is required" });
  }

  const payload = req.body.json();
  const paymentIntent = await ctx.client.createPaymentIntent(randomUUID(), payload, sellerAccountId);

  return res.status(201).json(paymentIntent);
};

export const listPaymentIntents = (ctx: JustifiContext) => async (req: Request, res: Response) => {
  const sellerAccountId = req.header("Seller-Account");
  if (!sellerAccountId) {
    return res.status(400).json({ error: "Seller-Account header is required" });
  }

  const paymentIntents = await ctx.client.listPaymentIntents(sellerAccountId);

  return res.status(200).json(paymentIntents);
};

export const getPaymentIntent = (ctx: JustifiContext) => async (req: Request, res: Response) => {
  return res.status(200).json(await ctx.client.getPaymentIntent(req.params.paymentIntentId));
};

export const updatePaymentIntent = (ctx: JustifiContext) => async (req: Request, res: Response) => {
  const sellerAccountId = req.header("Seller-Account");
  if (!sellerAccountId) {
    return res.status(400).json({ error: "Seller-Account header is required" });
  }

  return res.status(200).json(await ctx.client.updatePaymentIntent(req.params.paymentIntentId, sellerAccountId, req.body.json()));
};

export const capturePaymentIntent = (ctx: JustifiContext) => async (req: Request, res: Response) => {
  const sellerAccountId = req.header("Seller-Account");
  if (!sellerAccountId) {
    return res.status(400).json({ error: "Seller-Account header is required" });
  }

  return res.status(200).json(await ctx.client.capturePaymentIntent(req.params.paymentIntentId, sellerAccountId, req.body.json()));
};

export const listPaymentsForPaymentIntent = (ctx: JustifiContext) => async (req: Request, res: Response) => {
  return res.status(200).json(await ctx.client.listPaymentsForPaymentIntent(req.params.paymentIntentId));
};
