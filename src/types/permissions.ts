// src/types/permissions.ts

/**
 * OfficeX API Type Definitions
 * Derived from OpenAPI v3.0.3 specification
 */

import { DirectoryPermissionID, DirectoryPermissionType, DirectoryResourceID, ExternalID, ExternalPayload, GranteeID, SystemPermissionID, SystemPermissionType, UserID } from "./primitives";

// =========================================================================
// System Resource Types
// =========================================================================

/** System table resources */
export enum SystemTableValueEnum {
    DRIVES = "DRIVES",
    DISKS = "DISKS",
    CONTACTS = "CONTACTS",
    TEAMS = "TEAMS",
    API_KEYS = "API_KEYS",
    PERMISSIONS = "PERMISSIONS",
    WEBHOOKS = "WEBHOOKS",
    TAGS = "TAGS"
  }
  
  /** Unique identifier for a system table resource */
  export interface SystemTableResource {
    type: "Table";
    value: SystemTableValueEnum;
  }
  
  /** Unique identifier for a system record resource */
  export interface SystemRecordResource {
    type: "Record";
    value: string; // ID with appropriate prefix (e.g., "DriveID_abcdef123456")
  }
  
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
    tags: string[];
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
    tags: string[];
    metadata?: Record<string, any>;
    external_id?: ExternalID;
    external_payload?: ExternalPayload;
  }
  