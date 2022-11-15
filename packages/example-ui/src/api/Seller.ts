export enum SellerStatusType {
  created = "created",
  submitted = "submitted",
  information_needed = "information_needed",
  enabled = "enabled",
  disabled = "disabled",
  rejected = "rejected",
  archived = "archived",
}

export interface ApplicationFeeRate {
  basis_point_rate: number;
  created_at: string;
  currency: string;
  id: string;
  rate_type: string;
  transaction_fee: number;
  updated_at: string;
}

export interface ISeller {
  account_type: string;
  application_fee_rates: ApplicationFeeRate[] | [];
  created_at: string;
  currency: string;
  id: string;
  name: string;
  payout_ready: boolean;
  platform_account_id: string;
  processing_ready: boolean;
  status: SellerStatusType;
  updated_at: string;
  related_accounts?: object;
}
