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
export type SystemTableResource = string;

/** Unique identifier for a system record resource */
export type SystemRecordResource = string;

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
  external_id?: ExternalID;
  external_payload?: ExternalPayload;
}

export interface DirectoryPermissionFE {
  id: string;
  resource_id: string;
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
  external_id?: string;
  external_payload?: string;
  permission_previews: SystemPermissionType[];
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
  metadata?: Record<string, any>;
  external_id?: ExternalID;
  external_payload?: ExternalPayload;
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
  metadata?: Record<string, any>;
  external_id?: string;
  external_payload?: string;
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
