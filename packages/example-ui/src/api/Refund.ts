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
  public created_at: string;
  public description: string;
  public id: string;
  public metadata: object | null;
  public payment_id: string;
  public reason: RefundReasons | null;
  public status: RefundStatuses;
  public updated_at: string;

  constructor(refund: Refund) {
    this.amount = refund.amount;
    this.created_at = refund.created_at;
    this.description = refund.description;
    this.id = refund.id;
    this.metadata = refund.metadata;
    this.payment_id = refund.payment_id;
    this.reason = refund.reason;
    this.status = refund.status;
    this.updated_at = refund.updated_at;
  }
}
