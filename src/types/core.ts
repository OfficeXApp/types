// src/types/core.ts

/**
 * OfficeX API Type Definitions
 * Derived from OpenAPI v3.0.3 specification
 */

import {
  ApiKeyID,
  ApiKeyValue,
  DiskID,
  DiskTypeEnum,
  DriveFullFilePath,
  DriveID,
  EvmPublicAddress,
  ExternalID,
  ExternalPayload,
  FileID,
  FolderID,
  ICPPrincipalString,
  StateDiffRecordID,
  SystemPermissionType,
  TagID,
  TagValue,
  GroupID,
  GroupInviteID,
  GroupRole,
  URLEndpoint,
  UserID,
  WebhookEventLabel,
  WebhookID,
} from "./primitives";

// =========================================================================
// Core Data Models
// =========================================================================

/** File record */
export interface FileRecord {
  id: FileID;
  name: string;
  folder_uuid: FolderID;
  file_version: number;
  prior_version?: FileID;
  next_version?: FileID;
  extension: string;
  full_file_path: DriveFullFilePath;
  tags: TagValue[];
  created_by: UserID;
  created_at: number;
  disk_id: DiskID;
  disk_type: DiskTypeEnum;
  file_size: number;
  raw_url: string;
  last_updated_date_ms: number;
  last_updated_by: UserID;
  deleted: boolean;
  canister_id: ICPPrincipalString;
  expires_at: number;
  restore_trash_prior_folder_path?: DriveFullFilePath;
  has_sovereign_permissions: boolean;
  external_id?: ExternalID;
  external_payload?: ExternalPayload;
}

/** Folder record */
export interface FolderRecord {
  id: FolderID;
  name: string;
  parent_folder_uuid?: FolderID;
  subfolder_uuids: FolderID[];
  file_uuids: FileID[];
  full_folder_path: DriveFullFilePath;
  tags: TagValue[];
  created_by: UserID;
  created_at: number;
  last_updated_date_ms: number;
  last_updated_by: UserID;
  disk_id: DiskID;
  deleted: boolean;
  expires_at: number;
  canister_id: ICPPrincipalString;
  restore_trash_prior_folder_path?: DriveFullFilePath;
  has_sovereign_permissions: boolean;
  external_id?: ExternalID;
  external_payload?: ExternalPayload;
}

/** API key */
export interface ApiKey {
  id: ApiKeyID;
  value: ApiKeyValue;
  user_id: UserID;
  name: string;
  created_at: number;
  expires_at: number;
  is_revoked: boolean;
  tags: TagValue[];
  external_id?: ExternalID;
  external_payload?: ExternalPayload;
}

export interface ApiKeyFE extends ApiKey {
  user_name?: string;
  permission_previews: SystemPermissionType[];
}

/** Contact */
export interface Contact {
  id: UserID;
  name: string;
  avatar: string;
  email: string;
  notifications_url: string;
  public_note: string;
  private_note?: string;
  evm_public_address: EvmPublicAddress;
  icp_principal: ICPPrincipalString;
  groups: GroupID[];
  tags: TagValue[];
  last_online_ms: number;
  created_at: number;
  external_id?: ExternalID;
  external_payload?: ExternalPayload;
}

export interface ContactFE extends Contact {
  group_previews: ContactGroupPreview[];
  permission_previews: SystemPermissionType[];
}

export interface ContactGroupPreview {
  group_id: GroupID;
  invite_id: GroupInviteID;
  is_admin: boolean;
  group_name: string;
  group_avatar?: string;
}

/** Disk */
export interface Disk {
  id: DiskID;
  name: string;
  disk_type: DiskTypeEnum;
  public_note?: string;
  private_note?: string;
  auth_json?: string;
  tags: TagValue[];
  external_id?: ExternalID;
  external_payload?: ExternalPayload;
  created_at: number;
}

export interface DiskFE extends Disk {
  permission_previews: SystemPermissionType[];
}

/** Drive */
export interface Drive {
  id: DriveID;
  name: string;
  icp_principal: ICPPrincipalString;
  public_note?: string;
  private_note?: string;
  endpoint_url: URLEndpoint;
  last_indexed_ms?: number;
  tags: string[];
  external_id?: ExternalID;
  external_payload?: ExternalPayload;
  created_at: number;
}

export interface DriveFE extends Drive {
  permission_previews: SystemPermissionType[];
}

/** Tag */
export interface Tag {
  id: TagID;
  value: string;
  description?: string;
  color: string;
  created_by: string;
  created_at: number;
  last_updated_at: number;
  resources: any[];
  tags: string[];
  external_id?: ExternalID;
  external_payload?: ExternalPayload;
}

export interface TagFE extends Tag {
  permission_previews: SystemPermissionType[];
}

/** Group */
export interface Group {
  id: GroupID;
  name: string;
  owner: string;
  avatar: string;
  public_note?: string;
  private_note?: string;
  admin_invites: string[];
  member_invites: string[];
  created_at: number;
  last_modified_at: number;
  drive_id: DriveID;
  endpoint_url: URLEndpoint;
  tags: string[];
  external_id?: ExternalID;
  external_payload?: ExternalPayload;
}

export interface GroupFE extends Group {
  member_previews: GroupMemberPreview[];
  permission_previews: SystemPermissionType[];
}

export interface GroupMemberPreview {
  user_id: UserID;
  name: String;
  note?: String;
  avatar?: String;
  group_id: GroupID;
  is_admin: boolean;
  invite_id: GroupInviteID;
  last_online_ms: number;
}

/** Group invite */
export interface GroupInvite {
  id: GroupInviteID;
  group_id: GroupID;
  inviter_id: UserID;
  invitee_id: UserID;
  role: GroupRole;
  note: string;
  active_from: number;
  expires_at: number;
  created_at: number;
  last_modified_at: number;
  from_placeholder_invitee?: string;
  tags: TagValue[];
  external_id?: ExternalID;
  external_payload?: ExternalPayload;
}

export interface GroupInviteFE extends GroupInvite {
  group_name: String;
  group_avatar?: String;
  invitee_name: String;
  invitee_avatar?: String;
  permission_previews: SystemPermissionType[];
}

/** Webhook */
export interface Webhook {
  id: WebhookID;
  url: string;
  alt_index: string;
  event: WebhookEventLabel;
  signature: string;
  description: string;
  active: boolean;
  filters: string;
  tags: string[];
  external_id?: ExternalID;
  external_payload?: ExternalPayload;
  created_at: number;
}

export interface WebhookFE extends Webhook {
  permission_previews: SystemPermissionType[];
}

/** Permission for directory resource frontend representation */
export interface DirectoryResourcePermissionFE {
  permission_id: string;
  grant_type: string;
}

/** State diff record */
export interface StateDiffRecord {
  id: StateDiffRecordID;
  timestamp_ns: number;
  notes?: string;
  drive_id: DriveID;
  endpoint_url: URLEndpoint;
  implementation: "RUST_ICP_CANISTER" | "JAVASCRIPT_RUNTIME";
  diff_forward: string;
  diff_backward: string;
  checksum_forward: string;
  checksum_backward: string;
}
