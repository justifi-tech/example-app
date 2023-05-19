import { Express } from "express";
import { JustifiContext } from ".";import { createCheckoutSession } from "./handlers/checkout_sessions";
 import {
  capturePayment,
  createPayment,
  getPayment,
  listPaymentBalanceTransactions,
  listPayments,
  refundPayment,
  updatePayment,
} from "./handlers/payment";
import {
  createPaymentIntent,
  listPaymentIntents,
  getPaymentIntent,
  updatePaymentIntent,
  capturePaymentIntent,
  listPaymentsForPaymentIntent,
} from "./handlers/payment_intent";
import { getRefund, listRefunds, updateRefund } from "./handlers/refund";
import {
  createSellerAccount,
  getSellerAccount,
  listSellerAccounts,
} from "./handlers/seller_account";
import { justifiWebhook, listRecentWebhooks } from "./handlers/webhook";

export const configAppRoutes = (app: Express, ctx: JustifiContext, auth: any): Express => {
  app.post("/v1/seller_accounts", auth, createSellerAccount(ctx));
  app.get("/v1/seller_accounts", auth, listSellerAccounts(ctx));
  app.get("/v1/seller_accounts/:accountId", auth, getSellerAccount(ctx));

  app.get("/v1/refunds", auth, listRefunds(ctx));
  app.get("/v1/refunds/:refundId", auth, getRefund(ctx));
  app.get("/v1/refunds/:refundId", auth, updateRefund(ctx));

  app.post("/v1/payment_intents", auth, createPaymentIntent(ctx));
  app.get("/v1/payment_intents", auth, listPaymentIntents(ctx));
  app.get("/v1/payment_intents/:paymentIntentId", auth, getPaymentIntent(ctx));
  app.patch("/v1/payment_intents/:paymentIntentId", auth, updatePaymentIntent(ctx));
  app.post(
    "/v1/payment_intents/:paymentIntentId/capture",
    auth,
    capturePaymentIntent(ctx)
  );
  app.get(
    "/v1/payment_intents/:paymentIntentId/payments",
    auth,
    listPaymentsForPaymentIntent(ctx)
  );

  app.post("/v1/checkout_sessions", auth, createCheckoutSession(ctx));

  app.post("/v1/payments", auth, createPayment(ctx));
  app.get("/v1/payments", auth, listPayments(ctx));
  app.get("/v1/payments/:paymentId", auth, getPayment(ctx));
  app.patch("/v1/payments/:paymentId", auth, updatePayment(ctx));
  app.post("/v1/payments/:paymentId/capture", auth, capturePayment(ctx));
  app.post("/v1/payments/:paymentId/refunds", auth, refundPayment(ctx));
  app.get(
    "/v1/payments/:paymentId/payment_balance_transactions",
    auth,
    listPaymentBalanceTransactions(ctx)
  );

  app.post("/v1/webhook", justifiWebhook(ctx))
  app.get("/v1/webhook/recent", auth, listRecentWebhooks(ctx))

  return app;
};
