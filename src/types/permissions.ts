// src/types/permissions.ts

/**
 * OfficeX API Type Definitions
 * Derived from OpenAPI v3.0.3 specification
 */

import {
  DirectoryPermissionID,
  DirectoryPermissionType,
  DirectoryResourceID,
  DriveID,
  ExternalID,
  ExternalPayload,
  GranteeID,
  JobRunID,
  SystemPermissionID,
  SystemPermissionType,
  SystemRecordIDEnum,
  UserID,
} from "./primitives";

// =========================================================================
// System Resource Types
// =========================================================================

/** System table resources */
export enum SystemTableValueEnum {
  DRIVES = "DRIVES",
  DISKS = "DISKS",
  CONTACTS = "CONTACTS",
  GROUPS = "GROUPS",
  API_KEYS = "API_KEYS",
  PERMISSIONS = "PERMISSIONS",
  WEBHOOKS = "WEBHOOKS",
  LABELS = "LABELS",
  INBOX = "INBOX",
  JOB_RUNS = "JOB_RUNS",
}

/** Unique identifier for a system table resource */
export type SystemTableResource = `TABLE_${SystemTableValueEnum}`;

/** Unique identifier for a system record resource */
export type SystemRecordResource = SystemRecordIDEnum;

/** Unique identifier for a system resource (table or record) */
export type SystemResourceID = SystemTableResource | SystemRecordResource;

/** Directory permission */
export interface DirectoryPermission {
  id: DirectoryPermissionID;
  resource_id: DirectoryResourceID;
  resource_path: string;
  granted_to: GranteeID;
  granted_by: UserID;
  permission_types: DirectoryPermissionType[];
  begin_date_ms: number;
  expiry_date_ms: number;
  inheritable: boolean;
  note: string;
  created_at: number;
  last_modified_at: number;
  from_placeholder_grantee?: string;
  labels: string[];
  redeem_code?: string;
  external_id?: ExternalID;
  external_payload?: ExternalPayload;
  metadata?: PermissionMetadata;
}

// Type alias for the wrapped string type from Rust
export type LabelStringValuePrefix = string;

/**
 * Enum for the type of metadata content.
 * Corresponds to the Rust enum `PermissionMetadataTypeEnum`.
 * @enum {string}
 */
export enum PermissionMetadataTypeEnum {
  LABELS = "LABELS",
  DIRECTORY_PASSWORD = "DIRECTORY_PASSWORD",
}

/**
 * A discriminated union representing the content of the permission metadata.
 * This corresponds to the Rust enum `PermissionMetadataContent`.
 * The structure `{ VariantName: value }` mimics the default serialization of Rust enums with data.
 */
export type PermissionMetadataContent =
  | { Labels: LabelStringValuePrefix }
  | { DirectoryPassword: string };

/**
 * The primary container for permission metadata.
 * This directly corresponds to the Rust struct `PermissionMetadata`.
 * It contains a discriminator field (`metadata_type`) and the `content` union.
 */
export interface PermissionMetadata {
  metadata_type: PermissionMetadataTypeEnum;
  content: PermissionMetadataContent;
}

// --- Optional: Type Guards for Ergonomics ---

/**
 * Type guard to check if the metadata is for Labels.
 * This allows for type-safe access to the `content` property.
 *
 * @example
 * if (isLabelMetadata(metadata)) {
 * console.log(metadata.content.Labels); // TypeScript knows this is a string
 * }
 */
export function isLabelMetadata(metadata: PermissionMetadata): metadata is {
  metadata_type: PermissionMetadataTypeEnum.LABELS;
  content: { Labels: LabelStringValuePrefix };
} {
  return metadata.metadata_type === PermissionMetadataTypeEnum.LABELS;
}

/**
 * Type guard to check if the metadata is for a Directory Password.
 * This allows for type-safe access to the `content` property.
 *
 * @example
 * if (isDirectoryPasswordMetadata(metadata)) {
 * console.log(metadata.content.DirectoryPassword); // TypeScript knows this is a string
 * }
 */
export function isDirectoryPasswordMetadata(
  metadata: PermissionMetadata
): metadata is {
  metadata_type: PermissionMetadataTypeEnum.DIRECTORY_PASSWORD;
  content: { DirectoryPassword: string };
} {
  return (
    metadata.metadata_type === PermissionMetadataTypeEnum.DIRECTORY_PASSWORD
  );
}

export interface DirectoryPermissionFE {
  id: DirectoryPermissionID;
  resource_id: DirectoryResourceID;
  resource_path: string;
  granted_to: string;
  granted_by: string;
  permission_types: DirectoryPermissionType[];
  begin_date_ms: number;
  expiry_date_ms: number;
  inheritable: boolean;
  note: string;
  created_at: number;
  last_modified_at: number;
  from_placeholder_grantee?: string;
  labels: string[];
  redeem_code?: string;
  external_id?: string;
  external_payload?: string;
  resource_name?: string;
  grantee_name?: string;
  grantee_avatar?: string;
  granter_name?: string;
  permission_previews: SystemPermissionType[];
  metadata?: PermissionMetadata;
}

/** System permission */
export interface SystemPermission {
  id: SystemPermissionID;
  resource_id: SystemResourceID;
  granted_to: GranteeID;
  granted_by: UserID;
  permission_types: SystemPermissionType[];
  begin_date_ms: number;
  expiry_date_ms: number;
  note: string;
  created_at: number;
  last_modified_at: number;
  from_placeholder_grantee?: string;
  labels: string[];
  redeem_code?: string;
  external_id?: ExternalID;
  external_payload?: ExternalPayload;
  metadata?: PermissionMetadata;
}

export interface SystemPermissionFE {
  id: string;
  resource_id: string;
  granted_to: string;
  granted_by: string;
  permission_types: SystemPermissionType[];
  begin_date_ms: number;
  expiry_date_ms: number;
  note: string;
  created_at: number;
  last_modified_at: number;
  from_placeholder_grantee?: string;
  labels: string[];
  metadata?: PermissionMetadata;
  external_id?: string;
  external_payload?: string;
  redeem_code?: string;
  resource_name?: string;
  grantee_name?: string;
  grantee_avatar?: string;
  granter_name?: string;
  permission_previews: SystemPermissionType[];
}

/** CheckPermissionResult type */
export interface CheckPermissionResult {
  resource_id: string;
  grantee_id: string;
  permissions: DirectoryPermissionType[];
}

/** CheckSystemPermissionResult type */
export interface CheckSystemPermissionResult {
  resource_id: string;
  grantee_id: string;
  permissions: SystemPermissionType[];
}

export interface JobRun {
  id: JobRunID;
  template_id?: string; // no guarnatees on this, only set on create
  vendor_name: string; // can be updated, only set on create
  vendor_id: UserID; // can be updated, only set on create
  status: JobRunStatus; // can be updated by vendor
  description: string; // can be updated, only set on create
  about_url: string; // can be updated by vendor
  run_url: string; // can be updated by vendor
  billing_url: string; // can be updated by vendor
  support_url: string; // can be updated by vendor
  delivery_url: string; // can be updated by vendor
  verification_url: string; // can be updated by vendor
  installation_url: string; // the script to run to install the job
  title: string; // can be updated, only set on create
  subtitle: string; // can be updated
  pricing: string; // can be updated
  vendor_notes: string; // can be updated by vendor
  notes: string; // can be viewed or updated by vendor
  created_at: number;
  updated_at: number;
  last_updated_at: number;
  labels: string[]; // can be updated by vendor
  related_resources: string[]; // list of ID strings, can be updated
  tracer?: string; // can be updated by vendor
  external_id?: string; // can be updated by vendor
  external_payload?: string; // can be updated by vendor
}
export enum JobRunStatus {
  REQUESTED = "REQUESTED",
  AWAITING = "AWAITING",
  RUNNING = "RUNNING",
  BLOCKED = "BLOCKED",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELED = "CANCELED",
  REFUNDED = "REFUNDED",
  ARCHIVED = "ARCHIVED",
  UNKNOWN = "UNKNOWN",
}

export interface InitJobRunRequestBody {
  job_id: JobRunID;
  customer_notes: string;
  payload?: string; // json string encoded object
  template_id?: string;
  drive_id: DriveID;
  drive_endpoint: string;
  init_password?: string;
  temp_auth_token: string;
  callback_url?: string;
  tracer?: string;
  metadata?: string; // json string encoded object
}

// Example Install Scripts
/**

  Example #1
  JobRun: Buy Storage Giftcard from Amazon
  1. Receive install request body with temp auth
  2. Create contact for vendor
  3. Create job run record
  4. Create disk
  5. Grant vendor permission to disk root & trash
  6. Update the job run record
  7. End the job run

  Example #2
  JobRun: YouTube Downloader


  Example #3
  JobRun: Delegate Reddit Farming

 */
