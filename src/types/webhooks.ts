// =========================================================================
// Webhook-specific Primitive Types
// =========================================================================

import {
  FileRecord,
  FolderRecord,
  Group,
  GroupInvite,
  StateDiffRecord,
} from "./core";
import { DriveID, LabelID, HostURL, UserID, WebhookID } from "./primitives";
import { IRequestInboxOrg } from "./routes";

/** Corresponds to Rust's `ShareTrackID` type alias. */
export type ShareTrackID = string;

/** Corresponds to Rust's `ShareTrackHash` type alias. */
export type ShareTrackHash = string;

/** Corresponds to Rust's `ShareTrackResourceID` which is a `DirectoryResourceID`. */
export type ShareTrackResourceID = string;

/** Corresponds to Rust's `LabelResourceID` type alias. */
export type LabelResourceID = string;

/** Corresponds to Rust's `LabelStringValue` type alias. */
export type LabelStringValue = string;

/** Corresponds to Rust's `WebhookAltIndexID` type alias. */
export type WebhookAltIndexID = string;

// =========================================================================
// Webhook Data Structures
// =========================================================================

/**
 * Payload for file-related webhooks.
 * Corresponds to Rust struct `FileWebhookData`.
 */
export interface FileWebhookData {
  file?: FileRecord;
}

/**
 * Payload for folder-related webhooks.
 * Corresponds to Rust struct `FolderWebhookData`.
 */
export interface FolderWebhookData {
  folder?: FolderRecord;
}

/**
 * Payload for share tracking webhooks.
 * Corresponds to Rust struct `ShareTrackingWebhookData`.
 */
export interface ShareTrackingWebhookData {
  id: ShareTrackID;
  hash: ShareTrackHash;
  origin_id?: ShareTrackID;
  origin_hash?: ShareTrackHash;
  from_user?: UserID;
  to_user?: UserID;
  resource_id: ShareTrackResourceID;
  resource_name: string;
  drive_id: DriveID;
  timestamp_ms: number;
  host_url: HostURL;
  metadata?: string;
}

/**
 * Represents various directory-related webhook data.
 * Corresponds to the Rust enum `DirectoryWebhookData`.
 * This uses an "externally tagged" representation, e.g., `{ "File": { ... } }`.
 */
export type DirectoryWebhookData =
  | { File: FileWebhookData }
  | { Folder: FolderWebhookData }
  | { Subfile: FileWebhookData }
  | { Subfolder: FolderWebhookData }
  | { ShareTracking: ShareTrackingWebhookData };

/**
 * Payload for group invite webhooks.
 * Corresponds to Rust struct `GroupInviteWebhookData`.
 */
export interface GroupInviteWebhookData {
  group?: Group;
  group_invite?: GroupInvite;
}

/**
 * Payload for label-related webhooks.
 * Corresponds to Rust struct `LabelWebhookData`.
 */
export interface LabelWebhookData {
  resource_id: LabelResourceID;
  label_id: LabelID;
  label_value: LabelStringValue;
  add: boolean;
}

/**
 * Payload for drive state diff webhooks.
 * Corresponds to Rust struct `DriveStateDiffWebhookData`.
 */
export interface DriveStateDiffWebhookData {
  data: StateDiffRecord;
}

/**
 * A discriminated union for all possible resource data within a webhook payload.
 * Corresponds to the Rust enum `WebhookResourceData`.
 * This uses an "adjacently tagged" representation where the `type` field co-exists
 * with the payload's fields, which are flattened into the same object.
 */
export type WebhookResourceData =
  | ({ type: "group_invite" } & GroupInviteWebhookData)
  | ({ type: "file" } & FileWebhookData)
  | ({ type: "folder" } & FolderWebhookData)
  | ({ type: "subfile" } & FileWebhookData)
  | ({ type: "subfolder" } & FolderWebhookData)
  | ({ type: "share_tracking" } & ShareTrackingWebhookData)
  | ({ type: "state_diffs" } & DriveStateDiffWebhookData)
  | ({ type: "label" } & LabelWebhookData)
  | { type: "superswap_userid"; content: UserID }
  | ({ type: "org_inbox_new_notif" } & IRequestInboxOrg);

/**
 * Represents the state of a resource before and after the event.
 * Corresponds to Rust struct `WebhookEventData`.
 */
export interface WebhookEventData {
  before?: WebhookResourceData;
  after?: WebhookResourceData;
}

/**
 * The complete payload sent to a webhook endpoint.
 * Corresponds to Rust struct `WebhookEventPayload`
 */
export interface WebhookEventPayload {
  event: string;
  timestamp_ms: number;
  nonce: number;
  webhook_id: WebhookID;
  webhook_alt_index: WebhookAltIndexID;
  payload: WebhookEventData;
  notes?: string;
}
