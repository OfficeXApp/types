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
  LabelID,
  LabelValue,
  GroupID,
  GroupInviteID,
  GroupRole,
  URLEndpoint,
  UserID,
  WebhookEventLabel,
  WebhookID,
  DirectoryPermissionType,
  DriveClippedFilePath,
  UploadStatus,
  SearchResultResourceID,
} from "./primitives";

// =========================================================================
// Core Data Models
// =========================================================================

/** File record */
export interface FileRecord {
  id: FileID;
  name: string;
  parent_folder_uuid: FolderID;
  file_version: number;
  prior_version?: FileID;
  next_version?: FileID;
  extension: string;
  full_directory_path: DriveFullFilePath;
  labels: LabelValue[];
  created_by: UserID;
  created_at: number;
  disk_id: DiskID;
  disk_type: DiskTypeEnum;
  file_size: number;
  raw_url: string;
  last_updated_date_ms: number;
  last_updated_by: UserID;
  deleted: boolean;
  drive_id: ICPPrincipalString;
  expires_at: number;
  restore_trash_prior_folder_uuid?: FolderID;
  has_sovereign_permissions: boolean;
  shortcut_to?: FileID;
  upload_status: UploadStatus;
  external_id?: ExternalID;
  external_payload?: ExternalPayload;
}

export interface FileRecordFE extends FileRecord {
  clipped_directory_path: DriveClippedFilePath;
  permission_previews: DirectoryPermissionType[];
}

/** Folder record */
export interface FolderRecord {
  id: FolderID;
  name: string;
  parent_folder_uuid?: FolderID;
  subfolder_uuids: FolderID[];
  file_uuids: FileID[];
  full_directory_path: DriveFullFilePath;
  labels: LabelValue[];
  created_by: UserID;
  created_at: number;
  last_updated_date_ms: number;
  last_updated_by: UserID;
  disk_id: DiskID;
  disk_type: DiskTypeEnum;
  deleted: boolean;
  expires_at: number;
  drive_id: DriveID;
  restore_trash_prior_folder_uuid?: FolderID;
  has_sovereign_permissions: boolean;
  shortcut_to?: FolderID;
  external_id?: ExternalID;
  external_payload?: ExternalPayload;
}
export interface FolderRecordFE extends FolderRecord {
  clipped_directory_path: DriveClippedFilePath;
  permission_previews: DirectoryPermissionType[];
}

/** API key */
export interface ApiKey {
  id: ApiKeyID;
  value: ApiKeyValue;
  user_id: UserID;
  name: string;
  created_at: number;
  begins_at: number;
  expires_at: number;
  is_revoked: boolean;
  labels: LabelValue[];
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
  labels: LabelValue[];
  from_placeholder_user_id?: UserID;
  redeem_code?: string;
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
  labels: LabelValue[];
  root_folder: FolderID;
  trash_folder: FolderID;
  external_id?: ExternalID;
  external_payload?: ExternalPayload;
  created_at: number;
  endpoint?: string;
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
  labels: string[];
  external_id?: ExternalID;
  external_payload?: ExternalPayload;
  created_at: number;
}

export interface DriveFE extends Drive {
  permission_previews: SystemPermissionType[];
}

/** Label */
export interface Label {
  id: LabelID;
  value: string;
  description?: string;
  color: string;
  created_by: string;
  created_at: number;
  last_updated_at: number;
  resources: any[];
  labels: string[];
  external_id?: ExternalID;
  external_payload?: ExternalPayload;
}

export interface LabelFE extends Label {
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
  labels: string[];
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
  labels: LabelValue[];
  redeem_code?: string;
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
  name: string;
  url: string;
  alt_index: string;
  event: WebhookEventLabel;
  signature: string;
  description: string;
  active: boolean;
  filters: string;
  labels: string[];
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

export interface FilePathBreadcrumb {
  resource_id: string;
  resource_name: string;
  visibility_preview: BreadcrumbVisibilityPreviewEnum[];
}

export enum BreadcrumbVisibilityPreviewEnum {
  PUBLIC_VIEW = "PUBLIC_VIEW",
  PUBLIC_MODIFY = "PUBLIC_MODIFY",
  PRIVATE_VIEW = "PRIVATE_VIEW",
  PRIVATE_MODIFY = "PRIVATE_MODIFY",
}

/** Search category enum */
export enum SearchCategoryEnum {
  ALL = "ALL",
  FILES = "FILES",
  FOLDERS = "FOLDERS",
  CONTACTS = "CONTACTS",
  DISKS = "DISKS",
  DRIVES = "DRIVES",
  GROUPS = "GROUPS",
}

/** Search sort by enum */
export enum SearchSortByEnum {
  RELEVANCE = "RELEVANCE",
  ALPHABETICAL = "ALPHABETICAL",
  SCORE = "SCORE",
  CREATED_AT = "CREATED_AT",
  UPDATED_AT = "UPDATED_AT",
}

/** Search result item */
export interface SearchResult {
  /** Title of the search result */
  title: string;
  /** Preview text */
  preview: string;
  /** Relevance score */
  score: number;
  /** Resource ID with type information */
  resource_id: SearchResultResourceID;
  /** Category of the search result */
  category: SearchCategoryEnum;
  metadata?: string;
  created_at: number;
  updated_at: number;
}
