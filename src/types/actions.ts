// src/types/actions.ts

/**
 * OfficeX Directory Action Payload Types
 * Represents the payloads for directory action operations
 */

import {
  FilePathBreadcrumb,
  FileRecord,
  FileRecordFE,
  FolderRecord,
  FolderRecordFE,
} from "./core";
import {
  DiskID,
  DiskTypeEnum,
  ExternalID,
  ExternalPayload,
  FileConflictResolutionEnum,
  FileID,
  FolderID,
  LabelValue,
  UploadStatus,
} from "./primitives";

// =========================================================================
// GET Action Payloads
// =========================================================================

/** Payload for GET_FILE action */
export interface GetFilePayload {
  id: FileID;
  /** Hash for share tracking */
  share_track_hash?: string;
}

/** Payload for GET_FOLDER action */
export interface GetFolderPayload {
  id: FolderID;
  /** Hash for share tracking */
  share_track_hash?: string;
}

// =========================================================================
// CREATE Action Payloads
// =========================================================================

/** Payload for CREATE_FILE action */
export interface CreateFilePayload {
  id?: FileID;
  name: string;
  parent_folder_uuid: FolderID;
  extension: string;
  labels: LabelValue[];
  file_size: number;
  disk_id: DiskID;
  disk_type: DiskTypeEnum;
  expires_at?: number;
  file_conflict_resolution?: FileConflictResolutionEnum;
  has_sovereign_permissions?: boolean;
  shortcut_to?: FileID;
  external_id?: ExternalID;
  external_payload?: ExternalPayload;
}

/** Payload for CREATE_FOLDER action */
export interface CreateFolderPayload {
  id?: FolderID;
  /** Name of the folder */
  name: string;
  /** Labels to associate with the folder */
  labels: LabelValue[];
  /** ID of the disk where the folder will be stored */
  disk_id: DiskID;
  /** ID of the disk where the folder will be stored */
  disk_type: DiskTypeEnum;
  /** ID of the parent folder */
  parent_folder_uuid: FolderID;
  /** Timestamp when the folder expires */
  expires_at?: number;
  /** How to handle file name conflicts */
  file_conflict_resolution?: FileConflictResolutionEnum;
  /** Whether the folder has sovereign permissions */
  has_sovereign_permissions?: boolean;
  /** ID of the folder to create a shortcut to */
  shortcut_to?: FolderID;
  /** External identifier for integration purposes */
  external_id?: ExternalID;
  /** Additional data for external integrations */
  external_payload?: ExternalPayload;
}

// =========================================================================
// UPDATE Action Payloads
// =========================================================================

/** Payload for UPDATE_FILE action */
export interface UpdateFilePayload {
  id: FileID;
  /** New name for the file */
  name?: string;
  /** New labels for the file */
  labels?: LabelValue[];
  /** New */
  upload_status?: UploadStatus;
  /** New URL where the raw file content can be accessed */
  raw_url?: string;
  /** New expiration timestamp */
  expires_at?: number;
  /** External identifier for integration purposes */
  external_id?: ExternalID;
  /** Additional data for external integrations */
  external_payload?: ExternalPayload;
}

/** Payload for UPDATE_FOLDER action */
export interface UpdateFolderPayload {
  id: FolderID;
  /** New name for the folder */
  name?: string;
  /** New labels for the folder */
  labels?: LabelValue[];
  /** New expiration timestamp */
  expires_at?: number;
  /** External identifier for integration purposes */
  external_id?: ExternalID;
  /** Additional data for external integrations */
  external_payload?: ExternalPayload;
}

// =========================================================================
// DELETE Action Payloads
// =========================================================================

/** Payload for DELETE_FILE action */
export interface DeleteFilePayload {
  id: FileID;
  /** Whether to permanently delete the file or move it to trash */
  permanent: boolean;
}

/** Payload for DELETE_FOLDER action */
export interface DeleteFolderPayload {
  id: FolderID;
  /** Whether to permanently delete the folder or move it to trash */
  permanent: boolean;
}

// =========================================================================
// COPY Action Payloads
// =========================================================================

/** Payload for COPY_FILE action */
export interface CopyFilePayload {
  id: FileID;
  /** ID of the destination folder */
  destination_folder_id?: FolderID;
  /** Path to the destination folder */
  destination_folder_path?: string;
  /** How to handle file name conflicts */
  file_conflict_resolution?: FileConflictResolutionEnum;
}

/** Payload for COPY_FOLDER action */
export interface CopyFolderPayload {
  id: FolderID;
  /** ID of the destination folder */
  destination_folder_id?: FolderID;
  /** Path to the destination folder */
  destination_folder_path?: string;
  /** How to handle file name conflicts */
  file_conflict_resolution?: FileConflictResolutionEnum;
}

// =========================================================================
// MOVE Action Payloads
// =========================================================================

/** Payload for MOVE_FILE action */
export interface MoveFilePayload {
  id: FileID;
  /** ID of the destination folder */
  destination_folder_id?: FolderID;
  /** Path to the destination folder */
  destination_folder_path?: string;
  /** How to handle file name conflicts */
  file_conflict_resolution?: FileConflictResolutionEnum;
}

/** Payload for MOVE_FOLDER action */
export interface MoveFolderPayload {
  id: FolderID;
  /** ID of the destination folder */
  destination_folder_id?: FolderID;
  /** Path to the destination folder */
  destination_folder_path?: string;
  /** How to handle file name conflicts */
  file_conflict_resolution?: FileConflictResolutionEnum;
}

// =========================================================================
// RESTORE Action Payloads
// =========================================================================

/** Payload for RESTORE_TRASH action */
export interface RestoreTrashPayload {
  id: FileID | FolderID;
  /** How to handle file conflicts during restore */
  file_conflict_resolution?: FileConflictResolutionEnum;
  /** Custom path to restore to (if not using original path) */
  restore_to_folder_path?: string;
}

// =========================================================================
// Action Type Definitions
// =========================================================================

/** Base interface for all directory actions */
export interface DirectoryActionBase<T extends string, P> {
  /** Type of action to perform */
  action: T;
  /** Payload for the action */
  payload: P;
}

/** GET_FILE action */
export type GetFileAction = DirectoryActionBase<"GET_FILE", GetFilePayload>;

/** GET_FOLDER action */
export type GetFolderAction = DirectoryActionBase<
  "GET_FOLDER",
  GetFolderPayload
>;

/** CREATE_FILE action */
export type CreateFileAction = DirectoryActionBase<
  "CREATE_FILE",
  CreateFilePayload
>;

/** CREATE_FOLDER action */
export type CreateFolderAction = DirectoryActionBase<
  "CREATE_FOLDER",
  CreateFolderPayload
>;

/** UPDATE_FILE action */
export type UpdateFileAction = DirectoryActionBase<
  "UPDATE_FILE",
  UpdateFilePayload
>;

/** UPDATE_FOLDER action */
export type UpdateFolderAction = DirectoryActionBase<
  "UPDATE_FOLDER",
  UpdateFolderPayload
>;

/** DELETE_FILE action */
export type DeleteFileAction = DirectoryActionBase<
  "DELETE_FILE",
  DeleteFilePayload
>;

/** DELETE_FOLDER action */
export type DeleteFolderAction = DirectoryActionBase<
  "DELETE_FOLDER",
  DeleteFolderPayload
>;

/** COPY_FILE action */
export type CopyFileAction = DirectoryActionBase<"COPY_FILE", CopyFilePayload>;

/** COPY_FOLDER action */
export type CopyFolderAction = DirectoryActionBase<
  "COPY_FOLDER",
  CopyFolderPayload
>;

/** MOVE_FILE action */
export type MoveFileAction = DirectoryActionBase<"MOVE_FILE", MoveFilePayload>;

/** MOVE_FOLDER action */
export type MoveFolderAction = DirectoryActionBase<
  "MOVE_FOLDER",
  MoveFolderPayload
>;

/** RESTORE_TRASH action */
export type RestoreTrashAction = DirectoryActionBase<
  "RESTORE_TRASH",
  RestoreTrashPayload
>;

/** All possible directory actions */
export type DirectoryAction =
  | GetFileAction
  | GetFolderAction
  | CreateFileAction
  | CreateFolderAction
  | UpdateFileAction
  | UpdateFolderAction
  | DeleteFileAction
  | DeleteFolderAction
  | CopyFileAction
  | CopyFolderAction
  | MoveFileAction
  | MoveFolderAction
  | RestoreTrashAction;

/** Request body for directory actions */
export interface DirectoryActionRequestBody {
  /** List of directory actions to execute */
  actions: DirectoryAction[];
}

/**
 * Directory Action Response
 */
export interface IResponseDirectoryAction {
  data: DirectoryActionOutcome[];
}

/**
 * Directory Action-specific Response Types
 */
export type GetFileResponse = {
  file: FileRecordFE;
  breadcrumbs: FilePathBreadcrumb[];
};

export type GetFolderResponse = {
  folder: FolderRecordFE;
  breadcrumbs: FilePathBreadcrumb[];
};

export type CreateFileResponse = {
  file: FileRecord;
  upload: {
    url: string;
    fields: Record<string, string>;
  };
  notes: string;
};

export type CreateFolderResponse = FolderRecord;

export type UpdateFileResponse = FileRecord;

export type UpdateFolderResponse = FolderRecord;

export type DeleteFileResponse = {
  file_id: FileID;
  path_to_trash: string;
};

export type DeleteFolderResponse = {
  folder_id: FolderID;
  path_to_trash: string;
  deleted_files?: FileID[];
  deleted_folders?: FolderID[];
};

export type RestoreTrashResponse = {
  restored_files: FileID[];
  restored_folders: FolderID[];
};

export type DirectoryActionResponse = {
  result?:
    | FileRecord
    | FolderRecord
    | GetFileResponse
    | GetFolderResponse
    | CreateFileResponse
    | CreateFolderResponse
    | UpdateFileResponse
    | UpdateFolderResponse
    | DeleteFileResponse
    | DeleteFolderResponse
    | RestoreTrashResponse;
  error?: {
    code: number;
    message: string;
  };
};

export type DirectoryActionOutcome = {
  id: string;
  success: boolean;
  request: DirectoryAction;
  response: DirectoryActionResponse;
};
