export enum RefundStatuses {
  succeeded = "succeeded",
  failed = "failed",
}

export enum RefundReasons {
  customerRequest = "customer_request",
  duplicate = "duplicate",
  fraudulent = "fraudulent",
}

export class Refund {
  public amount: number;
  public createdAt: string;
  public description: string;
  public id: string;
  public metadata: object | null;
  public paymentId: string;
  public reason: RefundReasons | null;
  public status: RefundStatuses;
  public updatedAt: string;

  constructor(refund: Refund) {
    this.amount = refund.amount;
    this.createdAt = refund.createdAt;
    this.description = refund.description;
    this.id = refund.id;
    this.metadata = refund.metadata;
    this.paymentId = refund.paymentId;
    this.reason = refund.reason;
    this.status = refund.status;
    this.updatedAt = refund.updatedAt;
  }
}
