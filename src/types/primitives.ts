// src/types/primitives.ts

/**
 * OfficeX API Type Definitions
 * Derived from OpenAPI v3.0.3 specification
 */

// =========================================================================
// ID Type Definitions
// =========================================================================

/** Unique identifier for a file */
export type FileID = string;

/** Unique identifier for a folder */
export type FolderID = string;

/** Unique identifier for an API key */
export type ApiKeyID = string;

/** Unique identifier for a user */
export type UserID = string;

/** Unique identifier for a team */
export type TeamID = string;

/** Unique identifier for a team invite */
export type TeamInviteID = string;

/** Either a UserID or TeamID */
export type GranteeID = UserID | TeamID;

/** Unique identifier for a disk */
export type DiskID = string;

/** Unique identifier for a drive */
export type DriveID = string;

/** Unique identifier for a tag */
export type TagID = string;

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

/** EVM public address */
export type EvmPublicAddress = string;

/** External identifier for integration purposes */
export type ExternalID = string;

/** Additional data for external integrations */
export type ExternalPayload = string;

/** Value for a tag */
export type TagValue = string;

/** API key value */
export type ApiKeyValue = string;

/** Full path to a file or folder in the drive */
export type DriveFullFilePath = string;

// =========================================================================
// Enum Definitions
// =========================================================================

/** Type of disk storage */
export enum DiskTypeEnum {
  BrowserCache = "BrowserCache",
  LocalSSD = "LocalSSD",
  AwsBucket = "AwsBucket",
  StorjWeb3 = "StorjWeb3",
  IcpCanister = "IcpCanister",
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

/** Roles for team members */
export enum TeamRole {
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
  TEAM_INVITE_CREATED = "team.invite.created",
  TEAM_INVITE_UPDATED = "team.invite.updated",
  DRIVE_RESTORE_TRASH = "drive.restore_trash",
  DRIVE_STATE_DIFFS = "drive.state_diffs",
  TAG_ADDED = "tag.added",
  TAG_REMOVED = "tag.removed",
}
