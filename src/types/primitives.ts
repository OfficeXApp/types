// src/types/primitives.ts

import { v4 as uuidv4 } from "uuid";

/**
 * OfficeX API Type Definitions
 * Derived from OpenAPI v3.0.3 specification
 */

// =========================================================================
// ID Type Definitions
// =========================================================================

// enum for id prefix IDPrefixEnum
export enum IDPrefixEnum {
  File = "FileID_",
  Folder = "FolderID_",
  Drive = "DriveID_",
  ApiKey = "ApiKeyID_",
  Disk = "DiskID_",
  Group = "GroupID_",
  GroupInvite = "GroupInviteID_",
  SystemPermission = "SystemPermissionID_",
  DirectoryPermission = "DirectoryPermissionID_",
  PlaceholderPermissionGrantee = "PlaceholderPermissionGranteeID_",
  Webhook = "WebhookID_",
  User = "UserID_",
  DirectoryActionOutcome = "DirectoryActionOutcomeID_",
  PlaceholderGroupInviteeID = "PlaceholderGroupInviteeID_",
  ShareTrackID = "ShareTrackID_",
  DriveStateDiffID = "DriveStateDiffID_",
  LabelID = "LabelID_",
  RedeemCode = "RedeemTokenID_",
  FactoryApiKey = "FactoryApiKeyID_",
  GiftcardSpawnOrg = "GiftcardSpawnOrgID_",
  GiftcardRefuel = "GiftcardRefuelID_",
  InboxNotifID = "InboxNotifID_",
  FileVersionID = "FileVersionID_",
  RedeemTokenID = "RedeemTokenID_",
  PurchaseID = "PurchaseID_",
}

export const GenerateID = {
  File: () => `${IDPrefixEnum.File}${uuidv4()}` as FileID,
  Folder: () => `${IDPrefixEnum.Folder}${uuidv4()}` as FolderID,
  Drive: (icp_principal: string) =>
    `${IDPrefixEnum.Drive}${icp_principal}` as DriveID,
  ApiKey: () => `${IDPrefixEnum.ApiKey}${uuidv4()}` as ApiKeyID,
  FactoryApiKey: () =>
    `${IDPrefixEnum.FactoryApiKey}${uuidv4()}` as FactoryApiKeyID,
  Disk: () => `${IDPrefixEnum.Disk}${uuidv4()}` as DiskID,
  Group: () => `${IDPrefixEnum.Group}${uuidv4()}` as GroupID,
  GroupInvite: () => `${IDPrefixEnum.GroupInvite}${uuidv4()}` as GroupInviteID,
  SystemPermission: () =>
    `${IDPrefixEnum.SystemPermission}${uuidv4()}` as SystemPermissionID,
  DirectoryPermission: () =>
    `${IDPrefixEnum.DirectoryPermission}${uuidv4()}` as DirectoryPermissionID,
  PlaceholderPermissionGrantee: () =>
    `${IDPrefixEnum.PlaceholderPermissionGrantee}${uuidv4()}`,
  Webhook: () => `${IDPrefixEnum.Webhook}${uuidv4()}` as WebhookID,
  User: (icp_principal: string) =>
    `${IDPrefixEnum.User}${icp_principal}` as UserID,
  DirectoryActionOutcome: () =>
    `${IDPrefixEnum.DirectoryActionOutcome}${uuidv4()}`,
  PlaceholderGroupInviteeID: () =>
    `${IDPrefixEnum.PlaceholderGroupInviteeID}${uuidv4()}`,
  ShareTrackID: () => `${IDPrefixEnum.ShareTrackID}${uuidv4()}`,
  DriveStateDiffID: () => `${IDPrefixEnum.DriveStateDiffID}${uuidv4()}`,
  Label: () => `${IDPrefixEnum.LabelID}${uuidv4()}` as LabelID,
  RedeemCode: () => `${IDPrefixEnum.RedeemCode}${uuidv4()}`,
  InboxNotifID: () => `${IDPrefixEnum.InboxNotifID}${uuidv4()}`,
  FileVersionID: () => `${IDPrefixEnum.FileVersionID}${uuidv4()}`,
  PurchaseID: () => `${IDPrefixEnum.PurchaseID}${uuidv4()}`,
};

/** Unique identifier for a file */
export type FileID = string;

/** Unique identifier for a folder */
export type FolderID = string;

/** Unique identifier for an API key */
export type ApiKeyID = string;

/** Unique identifier for a factory API key */
export type FactoryApiKeyID = string;

/** Unique identifier for a user */
export type UserID = string;

export type DriveStateDiffID = string;

export type GiftcardSpawnOrgID = string;
export type GiftcardRefuelID = string;

/** Unique identifier for a group */
export type GroupID = string;

/** Unique identifier for a group invite */
export type GroupInviteID = string;

/** Either a UserID or GroupID */
export type GranteeID =
  | UserID
  | GroupID
  | `PlaceholderPermissionGranteeID_${string}`
  | "PUBLIC";

/** Unique identifier for a disk */
export type DiskID = string;

/** Search result resource ID */
export type SearchResultResourceID = string;

/** Unique identifier for a drive */
export type DriveID = string;

export type InboxNotifID = string;

/** Unique identifier for a label */
export type LabelID = string;

/** Unique identifier for a webhook */
export type WebhookID = string;

/** Unique identifier for a state diff record */
export type StateDiffRecordID = string;

/** Unique identifier for a directory resource (file or folder) */
export type DirectoryResourceID = `FileID_${string}` | `FolderID_${string}`;

/** Unique identifier for a directory permission */
export type DirectoryPermissionID = string;

/** Unique identifier for a system permission */
export type SystemPermissionID = string;

/** ICP principal identifier */
export type ICPPrincipalString = string;

export type PurchaseID = string;

/** EVM public address */
export type EvmPublicAddress = string;

/** URL endpoint */
export type URLEndpoint = string;

/** External identifier for integration purposes */
export type ExternalID = string;

export type FileVersionID = string;

/** Additional data for external integrations */
export type ExternalPayload = string;

/** Value for a label */
export type LabelValue = string;

/** API key value */
export type ApiKeyValue = string;

/** Full path to a file or folder in the drive */
export type DriveFullFilePath = string;
export type DriveClippedFilePath = string;

// =========================================================================
// Enum Definitions
// =========================================================================

/** Type of disk storage */
export enum DiskTypeEnum {
  BrowserCache = "BROWSER_CACHE",
  LocalSSD = "LOCAL_SSD",
  AwsBucket = "AWS_BUCKET",
  StorjWeb3 = "STORJ_WEB3",
  IcpCanister = "ICP_CANISTER",
}

/** Type of directory action to perform */
export enum DirectoryActionEnum {
  GET_FILE = "GET_FILE",
  GET_FOLDER = "GET_FOLDER",
  CREATE_FILE = "CREATE_FILE",
  CREATE_FOLDER = "CREATE_FOLDER",
  UPDATE_FILE = "UPDATE_FILE",
  UPDATE_FOLDER = "UPDATE_FOLDER",
  DELETE_FILE = "DELETE_FILE",
  DELETE_FOLDER = "DELETE_FOLDER",
  COPY_FILE = "COPY_FILE",
  COPY_FOLDER = "COPY_FOLDER",
  MOVE_FILE = "MOVE_FILE",
  MOVE_FOLDER = "MOVE_FOLDER",
  RESTORE_TRASH = "RESTORE_TRASH",
}

/** How to handle file name conflicts during copy, move, or restore operations */
export enum FileConflictResolutionEnum {
  REPLACE = "REPLACE",
  KEEP_BOTH = "KEEP_BOTH",
  KEEP_ORIGINAL = "KEEP_ORIGINAL",
  KEEP_NEWER = "KEEP_NEWER",
}

/** Types of permissions for directory resources */
export enum DirectoryPermissionType {
  VIEW = "VIEW",
  UPLOAD = "UPLOAD",
  EDIT = "EDIT",
  DELETE = "DELETE",
  INVITE = "INVITE",
  MANAGE = "MANAGE",
}

/** Types of permissions for system resources */
export enum SystemPermissionType {
  CREATE = "CREATE",
  EDIT = "EDIT",
  DELETE = "DELETE",
  VIEW = "VIEW",
  INVITE = "INVITE",
}

/** Roles for group members */
export enum GroupRole {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

/** Sort direction for pagination */
export enum SortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

/** Type of event that triggers a webhook */
export enum WebhookEventLabel {
  FILE_VIEWED = "file.viewed",
  FILE_CREATED = "file.created",
  FILE_UPDATED = "file.updated",
  FILE_DELETED = "file.deleted",
  FILE_SHARED = "file.shared",
  FOLDER_VIEWED = "folder.viewed",
  FOLDER_CREATED = "folder.created",
  FOLDER_UPDATED = "folder.updated",
  FOLDER_DELETED = "folder.deleted",
  FOLDER_SHARED = "folder.shared",
  SUBFILE_VIEWED = "subfile.viewed",
  SUBFILE_CREATED = "subfile.created",
  SUBFILE_UPDATED = "subfile.updated",
  SUBFILE_DELETED = "subfile.deleted",
  SUBFILE_SHARED = "subfile.shared",
  SUBFOLDER_VIEWED = "subfolder.viewed",
  SUBFOLDER_CREATED = "subfolder.created",
  SUBFOLDER_UPDATED = "subfolder.updated",
  SUBFOLDER_DELETED = "subfolder.deleted",
  SUBFOLDER_SHARED = "subfolder.shared",
  GROUP_INVITE_CREATED = "group.invite.created",
  GROUP_INVITE_UPDATED = "group.invite.updated",
  DRIVE_RESTORE_TRASH = "drive.restore_trash",
  DRIVE_STATE_DIFFS = "drive.state_diffs",
  LABEL_ADDED = "label.added",
  LABEL_REMOVED = "label.removed",
  ORG_SUPERSWAP_USER = "org.superswap_user",
  ORG_INBOX_NEW_MAIL = "org.inbox.new_mail",
}

export enum UploadStatus {
  QUEUED = "QUEUED",
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

export type SystemRecordIDEnum =
  | DriveID
  | DiskID
  | UserID
  | GroupID
  | ApiKeyID
  | SystemPermissionID
  | DirectoryPermissionID
  | WebhookID
  | LabelID
  | `Unknown_${string}`;

export enum GroupInviteeTypeEnum {
  USER = "USER",
  PLACEHOLDER_GROUP_INVITEE = "PLACEHOLDER_GROUP_INVITEE",
  PUBLIC = "PUBLIC",
}

export type GroupInviteeID =
  | UserID
  | `PlaceholderGroupInviteeID_${string}`
  | "PUBLIC";
