import { formatCurrency } from "../components/common/FormattingUtilities";
import { TagTypes } from "../components/common/Tag";
import { Refund } from "./Refund";

export enum CaptureStrategy {
  automatic = "automatic",
  manual = "manual",
}

export enum PaymentMethodTypes {
  card = "card",
  bankAccount = "bank_account",
}

export enum PaymentStatuses {
  pending = "pending",
  authorized = "authorized",
  succeeded = "succeeded",
  failed = "failed",
  disputed = "disputed",
  fully_refunded = "fully_refunded",
  partially_refunded = "partially_refunded",
}

export enum PaymentStatusFilters {
  pending = "pending",
  authorized = "authorized",
  succeeded = "succeeded",
  failed = "failed",
  disputed = "disputed",
  refunded = "refunded",
}

export enum PaymentDisputedStatuses {
  // if a dispute is 'won', we don't show a dispute status, just general status
  lost = "lost",
  open = "open",
}

export interface IPaymentMethod {
  card?: ICard;
  bank_account?: IBankAccount;
}

export type CardBrand =
  | "american_express"
  | "diners_club"
  | "discover"
  | "jcb"
  | "mastercard"
  | "china_unionpay"
  | "visa"
  | "unknown";

export interface ICard {
  id: string;
  acct_last_four: string;
  name: string;
  brand: CardBrand;
  token: string;
  created_at: string;
  updated_at: string;
  metadata?: object | null;
  customer_id: string | null;
  address_line1_check: string;
  address_postal_code_check: string;
}

export interface IBankAccount {
  id: string;
  acct_last_four: string;
  name: string;
  brand: string;
  token: string;
  created_at: string;
  updated_at: string;
  metadata?: object | null;
  customer_id: string | null;
}

export interface IDispute {
  amount_cents: number;
  created_at: string;
  currency: string;
  gateway_ref_id: string;
  id: string;
  payment_id: string;
  reason: null;
  status: string;
  updated_at: string;
}

export interface IApplicationFee {
  id: string;
  amount: number;
  currency: string;
  created_at: string;
  updated_at: string;
}

export interface IPayment {
  id: string;
  account_id: string;
  amount: number;
  amount_disputed: number;
  amount_refundable: number;
  amount_refunded: number;
  amount_returned: number;
  application_fee_rate_id: string;
  application_fee: IApplicationFee | null;
  balance: number;
  captured: boolean;
  capture_strategy: CaptureStrategy;
  currency: "usd";
  description: string;
  disputed: boolean;
  disputes: IDispute[];
  error_code: string | null;
  error_description: string | null;
  fee_amount: number;
  is_test: boolean;
  last_error: string | null;
  metadata: object | null;
  payment_method: IPaymentMethod;
  payment_intent_id: string | null;
  refunded: boolean;
  refunds: Refund[];
  returned: boolean;
  status: PaymentStatuses;
  created_at: string;
  updated_at: string;
}

export class Payment implements IPayment {
  public id: string;
  public account_id: string;
  public amount: number;
  public amount_disputed: number;
  public amount_refundable: number;
  public amount_refunded: number;
  public amount_returned: number;
  public application_fee_rate_id: string;
  public application_fee: IApplicationFee | null;
  public balance: number;
  public captured: boolean;
  public capture_strategy: CaptureStrategy;
  public currency: "usd";
  public description: string;
  public disputed: boolean;
  public disputes: IDispute[];
  public error_code: string | null;
  public error_description: string | null;
  public fee_amount: number;
  public is_test: boolean;
  public last_error: string | null;
  public metadata: Object | null;
  public payment_method: IPaymentMethod;
  public payment_intent_id: string | null;
  public refunded: boolean;
  public refunds: Refund[];
  public returned: boolean;
  public status: PaymentStatuses;
  public created_at: string;
  public updated_at: string;

  constructor(payment: IPayment) {
    this.id = payment.id;
    this.account_id = payment.account_id;
    this.amount = payment.amount;
    this.amount_disputed = payment.amount_disputed;
    this.amount_refundable = payment.amount_refundable;
    this.amount_refunded = payment.amount_refunded;
    this.amount_returned = payment.amount_returned;
    this.application_fee_rate_id = payment.application_fee_rate_id;
    this.application_fee = payment.application_fee;
    this.balance = payment.balance;
    this.captured = payment.captured;
    this.capture_strategy = payment.capture_strategy;
    this.currency = payment.currency;
    this.description = payment.description;
    this.disputed = payment.disputed;
    this.disputes = payment.disputes;
    this.error_code = payment.error_code;
    this.error_description = payment.error_description;
    this.fee_amount = payment.fee_amount;
    this.is_test = payment.is_test;
    this.last_error = payment.last_error;
    this.metadata = payment.metadata;
    this.payment_method = payment.payment_method;
    this.payment_intent_id = payment.payment_intent_id;
    this.refunded = payment.refunded;
    this.refunds = payment.refunds;
    this.returned = payment.returned;
    this.status = payment.status;
    this.created_at = payment.created_at;
    this.updated_at = payment.updated_at;
  }

  get statusTagType(): TagTypes {
    const typeMap = {
      [PaymentStatuses.authorized]: TagTypes.info,
      [PaymentStatuses.disputed]: TagTypes.warning,
      [PaymentStatuses.failed]: TagTypes.error,
      [PaymentStatuses.fully_refunded]: TagTypes.info,
      [PaymentStatuses.partially_refunded]: TagTypes.info,
      [PaymentStatuses.pending]: TagTypes.neutral,
      [PaymentStatuses.succeeded]: TagTypes.success,
    };
    return typeMap[this.status];
  }

  get disputedStatus(): PaymentDisputedStatuses | null {
    const lost = this.disputes.some(
      (dispute) => dispute.status === PaymentDisputedStatuses.lost
    );
    // if a dispute is 'won', we don't show a dispute status, just general status
    if (!this.disputed) {
      return null;
    } else if (lost) {
      return PaymentDisputedStatuses.lost;
    } else {
      return PaymentDisputedStatuses.open;
    }
  }

  get disputedStatusTagType(): TagTypes | null {
    if (this.disputedStatus) {
      const typeMap = {
        [PaymentDisputedStatuses.lost]: TagTypes.error,
        [PaymentDisputedStatuses.open]: TagTypes.info,
      };
      return typeMap[this.disputedStatus];
    } else {
      return null;
    }
  }

  get displayAmount(): string {
    return formatCurrency(this.amount);
  }

  get displayFeeAmount(): string {
    return formatCurrency(-this.fee_amount);
  }

  get displayBalance(): string {
    return formatCurrency(this.balance);
  }

  get displayRefundedAmount(): string {
    return formatCurrency(-this.amount_refunded);
  }

  get displayDisputedAmount(): string {
    return formatCurrency(-this.amount_disputed);
  }

  get displayReturnedAmount(): string {
    return formatCurrency(-this.amount_returned);
  }
}
