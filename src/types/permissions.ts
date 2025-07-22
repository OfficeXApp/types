// src/types/permissions.ts

/**
 * OfficeX API Type Definitions
 * Derived from OpenAPI v3.0.3 specification
 */

import {
  DirectoryPermissionID,
  DirectoryPermissionType,
  DirectoryResourceID,
  ExternalID,
  ExternalPayload,
  GranteeID,
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
