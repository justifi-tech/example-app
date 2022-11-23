import { Request, Response } from "express";
import { JustifiContext } from "..";

enum EventType {
  PaymentCreated = "payment.created",
  PaymentSucceeded = "payment.succeeded",
  PaymentFailed = "payment.failed",
  PaymentPending = "payment.pending",
  PaymentAuthorized = "payment.authorized",
  PaymentCaptured = "payment.captured",
  PaymentRefunded = "payment.refunded",
  PaymentDisputeCreated = "payment.dispute.created",
  PaymentDisputeClosed = "payment.dispute.closed",
  PaymentMethodCreated = "payment_method.created",
  PaymentMethodUpdated = "payment_method.updated",
  PaymentIntentRequiresCapture = "payment_intent.requires_capture",
  PaymentIntentSucceeded = "payment_intent.succeeded",
  PayoutCreated = "payout.created",
  PayoutPaid = "payout.paid",
  PayoutFailed = "payout.failed",
  SellerAccountUpdated = "seller_account.updated",
}

export const justifiWebhook = (ctx: JustifiContext) => async (req: Request, res: Response) => {
  ctx.cache.add(req.body)

  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) {
    console.log("SECRET_KEY env var must be set, returning 200 to cancel retries");
    return res.status(200).send();
  }

  const signature = req.header("JUSTIFI-SIGNATURE");
  if (!signature) {
    console.log("missing signature header, returning 400 to retry request");
    return res.status(400).send();
  }

  const timestamp = req.header("JUSTIFI-TIMESTAMP");
  if (!timestamp) {
    console.log("missing timestamp header, returning 400 to retry request");
    return res.status(400).send();
  }

  console.log(req.body, timestamp, secretKey, signature)
  if (!ctx.client.verifySignature(req.body, timestamp, secretKey, signature)) {
    console.log("invalid webhook signature, returning 400 to retry request");
    return res.status(400).send();
  }

  switch (req.body.event_name) {
    case EventType.PaymentCreated:
      console.log("handle payment created event!");
      break;
    case EventType.PaymentSucceeded:
      console.log("handle payment succeeded event!");
      break;
    case EventType.PaymentFailed:
      console.log("handle payment failed event!");
      break;
    case EventType.PaymentPending:
      console.log("handle payment pending event!");
      break;
    case EventType.PaymentAuthorized:
      console.log("handle payment authorized event!");
      break;
    case EventType.PaymentCaptured:
      console.log("handle payment captured event!");
      break;
    case EventType.PaymentRefunded:
      console.log("handle payment refunded event!");
      break;
    default:
      console.log("Received event that shouldn't be handled");
      break;
  }

  // We must return 200 otherwise the request will retry a few times
  return res.status(200).send();
}

export const listRecentWebhooks = (ctx: JustifiContext) => (_req: Request, res: Response) => {
  return res.status(200).json(ctx.cache.get())
}
