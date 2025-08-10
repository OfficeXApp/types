import { PurchaseStatus } from "./permissions";
import {
  ApiKeyValue,
  DiskTypeEnum,
  DriveID,
  IDPrefixEnum,
  PurchaseID,
  UserID,
} from "./primitives";

// =========================================================================
// Offer Models
// =========================================================================

export interface ServiceWithOffersFromVendors {
  id: string;
  name: string;
  subheading: string;
  cover_image: string;
  is_featured: boolean;
  offers: OfferPreview[];
}

export interface OfferPreview {
  id: string;
  title: string;
  images: string[];
  description: string;
  price: number;
  price_unit: string;
  price_explanation: string;
  bookmarks: number;
  bookmarked_demand: number;
  cumulative_sales: number;
  bookmark_url: string;
  call_to_action: string;
  vendors: VendorOffer[];
}

export interface VendorOffer {
  id: string;
  name: string;
  avatar: string;
  checkout_video?: string;
  uptime_score: number;
  reviews_score: number;
  community_links: { label: string; url: string }[];
  price_line: string;
  view_page_link: string;
  call_to_action: string;
  description: string;
  vendor_disclaimer?: string;
  about_url: string;
  checkout_options: CheckoutOption[];
}

export interface CheckoutOption {
  offer_id: OfferID;
  about_url: string;
  checkout_flow_id: CheckoutFlowID;
  title: string;
  note: string;
  checkout_init_endpoint: string;
  checkout_pattern: CartCheckoutPatternEnum;
  vendor_disclaimer?: string;
  vendor_notes?: string;
  terms_of_service_url?: string;
  requires_email_for_init?: boolean;
}
export interface VendorOfferReqField {
  id: string;
  title: string;
  explanation: string;
  type:
    | "number"
    | "date"
    | "text"
    | "url"
    | "select"
    | "multi-select"
    | "boolean"
    | IDPrefixEnum
    | DiskTypeEnum;
  required: boolean;
  options?: string[];
  defaultValue?: any;
  placeholder?: string;
  suffix?: string;
}
export type CheckoutFlowID = string;
export type CheckoutSessionID = string;
export type OfferID = string;

export enum CartCheckoutPatternEnum {
  CRYPTO_DIRECT_TRANSFER = "CRYPTO_DIRECT_TRANSFER",
  CRYPTO_WALLET_TOPUP = "CRYPTO_WALLET_TOPUP",
  EXTERNAL_PAYMENT_LINK = "EXTERNAL_PAYMENT_LINK",
}

// =========================================================================
// Checkout Models
// =========================================================================

// upon initiating a checkout flow, a officex_purchase_id is created
export interface IRequestCheckoutInit {
  checkout_flow_id: CheckoutFlowID;
  org_id?: DriveID;
  user_id?: UserID;
  host?: string;
  tracer?: string;
  email?: string;
}
export interface IResponseCheckoutInit_Base {
  offer_id: OfferID;
  checkout_flow_id: CheckoutFlowID;
  checkout_pattern: CartCheckoutPatternEnum;
  checkout_session_id: CheckoutSessionID; // this depends on the vendors server, it could represent a offer id, a cart id, or a sku id, etc. but ultimately we will pass it back to vendor on POST /offer/:offer_id/checkout/wallet/:wallet_id/verify
  vendor_disclaimer?: string; // vendor may ask customer to provide certain details in their payment signature (details from customer)
  required_note_from_customer?: string; // vendor may require customer to sign a message to verify payment (details from vendor)
  tracer?: string;
  validation_endpoint?: string;
  finalization_endpoint?: string;
  final_cta?: string;
  requirements: VendorOfferReqField[];
  // post-payment checkout flow depends on which checkout option was selected
  post_payment: {
    vendor_disclaimer?: string;
    needs_cloud_officex?: boolean;
    auth_installation_url?: string;
    verify_installation_url?: string;
  };
}
export type IResponseCheckoutInit =
  | IResponseCheckoutInit_Crypto
  | IResponseCheckoutInit_External;

export interface IRequestCheckoutValidate {
  checkout_flow_id: CheckoutFlowID;
  checkout_session_id: CheckoutSessionID; // same as `IResponseCheckoutInit.id`
  note?: string; // depends on vendor server,
  tracer?: string;
}
export interface IResponseCheckoutValidate {
  success: boolean;
  message: string;
  type: CartCheckoutPatternEnum;
  tracer?: string;
  checkout_session_id: CheckoutSessionID;
  checkout_flow_id: CheckoutFlowID;
  vendor_disclaimer?: string;
}
export interface IRequestCheckoutFinalize {
  checkout_flow_id: CheckoutFlowID;
  checkout_session_id: CheckoutSessionID;
  officex_purchase_id: PurchaseID;
  note?: string; // depends on vendor server,
  tracer?: string;
  proxy_buyer_data?: {
    org_id: DriveID;
    org_host: string;
    user_id: UserID;
  };
  sweep_tokens?: string[];
}
export interface IResponseCheckoutFinalize {
  success: boolean;
  message: string;
  tracer?: string;
  receipt?: {
    vendor_disclaimer?: string;
    checkout_session_id: CheckoutSessionID;
    checkout_flow_id: CheckoutFlowID;
    redeem_code?: string;
    skip_to_final_redirect?: string;
    skip_to_final_cta?: string;
    vendor_name?: string; // can be updated, only set on create
    vendor_id?: UserID; // can be updated, only set on create
    status?: PurchaseStatus; // can be updated by vendor
    description?: string; // can be updated, only set on create
    about_url?: string; // can be updated by vendor
    billing_url?: string; // can be updated by vendor
    support_url?: string; // can be updated by vendor
    delivery_url?: string; // can be updated by vendor
    verification_url?: string; // can be updated by vendor
    auth_installation_url?: string; // the script to run to install the purchase
    title?: string; // can be updated, only set on create
    subtitle?: string; // can be updated
    pricing?: string; // can be updated
    next_delivery_date?: number; // can be updated
    vendor_notes?: string; // can be updated by vendor
  };
}

export interface IRequestCheckoutTopup {
  checkout_session_id: CheckoutSessionID;
  note?: string;
  tracer?: string;
  sweep_tokens: string[];
}
export interface IResponseCheckoutTopup {
  vendor_disclaimer?: string;
  checkout_session_id: CheckoutSessionID;
  success: boolean;
  message: string;
  tracer?: string;
  updatedValue: number;
}

export interface IRequestValidateCustomerProductAuth {
  token: string;
}
export interface IResponseValidateCustomerProductAuth {
  success: boolean;
  message: string;
}

// -------- CRYPTO CHECKOUT -------- //

// crypto - init checkout
export type IRequestCheckoutInit_Crypto = IRequestCheckoutInit;
export interface IResponseCheckoutInit_Crypto
  extends IResponseCheckoutInit_Base {
  crypto_checkout: {
    receiving_address: string;
    token_address: string;
    token_name: string;
    token_symbol: string;
    token_decimals: number;
    suggested_amount_decimals: number; // not in wei
    minimum_amount_decimals: number; // not in wei
    maximum_amount_decimals: number; // not in wei
    chain: string;
    chain_explorer_url: string;
    vendor_disclaimer?: string;
  };
}
// crypto - validate checkout
export type IRequestCheckoutValidate_Crypto = IRequestCheckoutValidate;
export type IResponseCheckoutValidate_Crypto = IResponseCheckoutValidate;
// crypto - finalize checkout
export type IRequestCheckoutFinalize_Crypto = IRequestCheckoutFinalize;
export type IResponseCheckoutFinalize_Crypto = IResponseCheckoutFinalize;

// -------- EXTERNAL CHECKOUT -------- //

// External Checkout
export type IRequestCheckoutInit_External = IRequestCheckoutInit;
export interface IResponseCheckoutInit_External
  extends IResponseCheckoutInit_Base {
  external_checkout: {
    external_checkout_url: string;
    vendor_disclaimer?: string;
  };
}
export type IRequestCheckoutValidate_External = IRequestCheckoutValidate;
export type IResponseCheckoutValidate_External = IResponseCheckoutValidate;
export type IRequestCheckoutFinalize_External = IRequestCheckoutFinalize;
export type IResponseCheckoutFinalize_External = IResponseCheckoutFinalize;

// =========================================================================
// Checkout Run Models
// =========================================================================

export interface CheckoutRun {
  vendorID: UserID;
  vendorName: string;
  vendorAvatar: string;
  aboutUrl: string;
  offerName: string;
  offerDescription: string;
  checkoutOptions: CheckoutOption[]; // list of checkout init urls
  callToAction: string;
  checkoutVideo?: string;
  priceLine: string;
  terms_of_service_url?: string;
}

export interface IRequestAuthInstallation {
  checkout_session_id: CheckoutSessionID;
  requirements?: Record<string, string>;
  org_id?: DriveID;
  org_host?: string;
  org_api_key?: ApiKeyValue;
  user_id?: UserID;
  redeem_code?: string;
}

export interface IResponseAuthInstallation {
  status: "success" | "error";
  message?: string;
  redirect_url?: string;
  redirect_cta?: string;
  purchase_id?: PurchaseID;
}
