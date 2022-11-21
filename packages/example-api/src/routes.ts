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

export const configAppRoutes = (app: Express, ctx: JustifiContext): Express => {
  app.post("/v1/seller_accounts", createSellerAccount(ctx));
  app.get("/v1/seller_accounts", listSellerAccounts(ctx));
  app.get("/v1/seller_accounts/:accountId", getSellerAccount(ctx));

  app.get("/v1/refunds", listRefunds);
  app.get("/v1/refunds/:refundId", getRefund);
  app.get("/v1/refunds/:refundId", updateRefund);

  app.post("/v1/payment_intents", createPaymentIntent);
  app.get("/v1/payment_intents", listPaymentIntents);
  app.get("/v1/payment_intents/:paymentIntentId", getPaymentIntent);
  app.patch("/v1/payment_intents/:paymentIntentId", updatePaymentIntent);
  app.post(
    "/v1/payment_intents/:paymentIntentId/capture",
    capturePaymentIntent
  );
  app.get(
    "/v1/payment_intents/:paymentIntentId/payments",
    listPaymentsForPaymentIntent
  );

  app.post("/v1/payments", createPayment);
  app.get("/v1/payments", listPayments);
  app.get("/v1/payments/:paymentId", getPayment);
  app.patch("/v1/payments/:paymentId", updatePayment);
  app.post("/v1/payments/:paymentId/capture", capturePayment);
  app.post("/v1/payments/:paymentId/refunds", refundPayment);
  app.get(
    "/v1/payments/:paymentId/payment_balance_transactions",
    listPaymentBalanceTransactions
  );

  return app;
};
