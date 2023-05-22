import { formatCurrency } from "../components/common/FormattingUtilities";
import { TagTypes } from "../components/common/Tag";
import { Refund } from "./Refund";
import { HttpMethod, IApiResponse, Api } from './Api';

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
  fullyRefunded = "fully_refunded",
  partiallyRefunded = "partially_refunded",
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
  bankAccount?: IBankAccount;
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
  acctLastFour: string;
  name: string;
  brand: CardBrand;
  token: string;
  createdAt: string;
  updatedAt: string;
  metadata?: object | null;
  customerId: string | null;
  addressLine1Check: string;
  addressPostalCodeCheck: string;
}

export interface IBankAccount {
  id: string;
  acctLastFour: string;
  name: string;
  brand: string;
  token: string;
  createdAt: string;
  updatedAt: string;
  metadata?: object | null;
  customerId: string | null;
}

export interface IDispute {
  amountCents: number;
  createdAt: string;
  currency: string;
  gatewayRefId: string;
  id: string;
  paymentId: string;
  reason: null;
  status: string;
  updatedAt: string;
}

export interface IApplicationFee {
  id: string;
  amount: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPayment {
  id: string;
  accountId: string;
  amount: number;
  amountDisputed: number;
  amountRefundable: number;
  amountRefunded: number;
  amountReturned: number;
  applicationFeeRateId: string;
  applicationFee: IApplicationFee | null;
  balance: number;
  captured: boolean;
  captureStrategy: CaptureStrategy;
  currency: "usd";
  description: string;
  disputed: boolean;
  disputes: IDispute[];
  errorCode: string | null;
  errorDescription: string | null;
  feeAmount: number;
  isTest: boolean;
  lastError: string | null;
  metadata: object | null;
  paymentMethod: IPaymentMethod;
  paymentIntentId: string | null;
  refunded: boolean;
  refunds: Refund[];
  returned: boolean;
  status: PaymentStatuses;
  createdAt: string;
  updatedAt: string;
}

type ICheckoutSession = {
  checkoutSessionId: string
}

export class Payment implements IPayment {
  public id: string;
  public accountId: string;
  public amount: number;
  public amountDisputed: number;
  public amountRefundable: number;
  public amountRefunded: number;
  public amountReturned: number;
  public applicationFeeRateId: string;
  public applicationFee: IApplicationFee | null;
  public balance: number;
  public captured: boolean;
  public captureStrategy: CaptureStrategy;
  public currency: "usd";
  public description: string;
  public disputed: boolean;
  public disputes: IDispute[];
  public errorCode: string | null;
  public errorDescription: string | null;
  public feeAmount: number;
  public isTest: boolean;
  public lastError: string | null;
  public metadata: Object | null;
  public paymentMethod: IPaymentMethod;
  public paymentIntentId: string | null;
  public refunded: boolean;
  public refunds: Refund[];
  public returned: boolean;
  public status: PaymentStatuses;
  public createdAt: string;
  public updatedAt: string;

  constructor(payment: IPayment) {
    this.id = payment.id;
    this.accountId = payment.accountId;
    this.amount = payment.amount;
    this.amountDisputed = payment.amountDisputed;
    this.amountRefundable = payment.amountRefundable;
    this.amountRefunded = payment.amountRefunded;
    this.amountReturned = payment.amountReturned;
    this.applicationFeeRateId = payment.applicationFeeRateId;
    this.applicationFee = payment.applicationFee;
    this.balance = payment.balance;
    this.captured = payment.captured;
    this.captureStrategy = payment.captureStrategy;
    this.currency = payment.currency;
    this.description = payment.description;
    this.disputed = payment.disputed;
    this.disputes = payment.disputes;
    this.errorCode = payment.errorCode;
    this.errorDescription = payment.errorDescription;
    this.feeAmount = payment.feeAmount;
    this.isTest = payment.isTest;
    this.lastError = payment.lastError;
    this.metadata = payment.metadata;
    this.paymentMethod = payment.paymentMethod;
    this.paymentIntentId = payment.paymentIntentId;
    this.refunded = payment.refunded;
    this.refunds = payment.refunds;
    this.returned = payment.returned;
    this.status = payment.status;
    this.createdAt = payment.createdAt;
    this.updatedAt = payment.updatedAt;
  }

  get statusTagType(): TagTypes {
    const typeMap = {
      [PaymentStatuses.authorized]: TagTypes.info,
      [PaymentStatuses.disputed]: TagTypes.warning,
      [PaymentStatuses.failed]: TagTypes.error,
      [PaymentStatuses.fullyRefunded]: TagTypes.info,
      [PaymentStatuses.partiallyRefunded]: TagTypes.info,
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
    return formatCurrency(-this.feeAmount);
  }

  get displayBalance(): string {
    return formatCurrency(this.balance);
  }

  get displayRefundedAmount(): string {
    return formatCurrency(-this.amountRefunded);
  }

  get displayDisputedAmount(): string {
    return formatCurrency(-this.amountDisputed);
  }

  get displayReturnedAmount(): string {
    return formatCurrency(-this.amountReturned);
  }
}

export const PaymentsApi = () => {
  const api = Api();

  const createPayment = async (payload: any, headers: any = {}): Promise<IApiResponse<IPayment>> => {
    const url = api.requestUrl("/v1/payments");
  
    return api.makeRequest<IApiResponse<IPayment>>(url, HttpMethod.Post, headers, payload);
  }

  const createPaymentIntent = async (payload: any, headers: any = {}): Promise<IApiResponse<IPayment>> => {
    const url = api.requestUrl("/v1/payment_intents");
  
    return api.makeRequest<IApiResponse<IPayment>>(url, HttpMethod.Post, headers, payload);
  }
  
  const createCheckoutSession = async (payload: any, headers: any = {}): Promise<IApiResponse<ICheckoutSession>> => {
    const url = api.requestUrl("/v1/checkout_sessions");
  
    return api.makeRequest<IApiResponse<ICheckoutSession>>(url, HttpMethod.Post, headers, payload);
  }

  return {
    createPayment,
    createPaymentIntent,
    createCheckoutSession
  }
};