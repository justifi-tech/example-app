import { Express } from "express";
import { JustifiContext } from "."; import {
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
import { justifiWebhook } from "./handlers/webhook";

export const configAppRoutes = (app: Express, ctx: JustifiContext): Express => {
  app.post("/v1/seller_accounts", createSellerAccount(ctx));
  app.get("/v1/seller_accounts", listSellerAccounts(ctx));
  app.get("/v1/seller_accounts/:accountId", getSellerAccount(ctx));

  app.get("/v1/refunds", listRefunds(ctx));
  app.get("/v1/refunds/:refundId", getRefund(ctx));
  app.get("/v1/refunds/:refundId", updateRefund(ctx));

  app.post("/v1/payment_intents", createPaymentIntent(ctx));
  app.get("/v1/payment_intents", listPaymentIntents(ctx));
  app.get("/v1/payment_intents/:paymentIntentId", getPaymentIntent(ctx));
  app.patch("/v1/payment_intents/:paymentIntentId", updatePaymentIntent(ctx));
  app.post(
    "/v1/payment_intents/:paymentIntentId/capture",
    capturePaymentIntent(ctx)
  );
  app.get(
    "/v1/payment_intents/:paymentIntentId/payments",
    listPaymentsForPaymentIntent(ctx)
  );

  app.post("/v1/payments", createPayment(ctx));
  app.get("/v1/payments", listPayments(ctx));
  app.get("/v1/payments/:paymentId", getPayment(ctx));
  app.patch("/v1/payments/:paymentId", updatePayment(ctx));
  app.post("/v1/payments/:paymentId/capture", capturePayment(ctx));
  app.post("/v1/payments/:paymentId/refunds", refundPayment(ctx));
  app.get(
    "/v1/payments/:paymentId/payment_balance_transactions",
    listPaymentBalanceTransactions(ctx)
  );

  app.post("/v1/webhook", justifiWebhook(ctx))

  return app;
};
