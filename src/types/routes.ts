// src/types/routes.ts

import { DirectoryAction } from "./actions";
import {
  ApiKey,
  ContactFE,
  DirectoryResourcePermissionFE,
  Disk,
  Drive,
  FileRecord,
  FolderRecord,
  Tag,
  Team,
  TeamInvite,
  Webhook,
} from "./core";
import {
  DirectoryPermission,
  SystemPermission,
  SystemResourceID,
} from "./permissions";
import {
  ApiKeyID,
  DirectoryPermissionID,
  DirectoryResourceID,
  DiskID,
  DiskTypeEnum,
  DriveID,
  ExternalID,
  ExternalPayload,
  GiftCardID,
  GranteeID,
  ICPPrincipalString,
  SortDirection,
  SystemPermissionID,
  TagID,
  TeamID,
  TeamInviteID,
  TeamRole,
  URLEndpoint,
  UserID,
  WebhookEventLabel,
  WebhookID,
} from "./primitives";

/**
 * OfficeX API Route Types
 * Generated from OpenAPI v3.0.3 specification
 */

// =========================================================================
// Base Interfaces
// =========================================================================

/** Common structure for successful API responses */
export interface ISuccessResponse<T> {
  ok: {
    data: T;
  };
}

/** Common structure for error API responses */
export interface IErrorResponse {
  err: {
    code: number;
    message: string;
  };
}

/** Common pagination parameters */
export interface IPaginationParams {
  /** Filter string */
  filters?: string;
  /** Number of items per page */
  page_size?: number;
  /** Sort direction */
  direction?: SortDirection;
  /** Cursor for previous page */
  cursor_up?: string | null;
  /** Cursor for next page */
  cursor_down?: string | null;
}

/** Common paginated response */
export interface IPaginatedResponse<T> {
  items: T[];
  page_size: number;
  total: number;
  cursor_up?: string | null;
  cursor_down?: string | null;
}

// =========================================================================
// Directory Routes
// =========================================================================

/** List Directory Request */
export interface IRequestListDirectory {
  /** ID of the folder to list contents from */
  folder_id?: string;
  /** Path to the folder to list contents from */
  path?: string;
  /** Filter string for directory contents */
  filters?: string;
  /** Number of items per page */
  page_size?: number;
  /** Sort direction */
  direction?: SortDirection;
  /** Cursor for pagination */
  cursor?: string | null;
}

/** List Directory Response */
export interface IResponseListDirectory
  extends ISuccessResponse<{
    folders: {
      folder: FolderRecord;
      permissions: DirectoryResourcePermissionFE[];
      requester_id: UserID;
    }[];
    files: {
      file: FileRecord;
      permissions: DirectoryResourcePermissionFE[];
      requester_id: UserID;
    }[];
    total_files: number;
    total_folders: number;
    cursor?: string | null;
  }> {}

/** Directory Action Request */
export interface IRequestDirectoryAction {
  actions: DirectoryAction[];
}

/** Get File Asset (uses 302 redirect) */
export interface IRequestGetFileAsset {
  /** File ID with file extension */
  file_id_with_extension: string;
}

// =========================================================================
// API Keys Routes
// =========================================================================

/** Get API Key Request */
export interface IRequestGetApiKey {
  /** ID of the API key to retrieve */
  api_key_id: ApiKeyID;
}

/** Get API Key Response */
export interface IResponseGetApiKey extends ISuccessResponse<ApiKey> {}

/** List API Keys Request */
export interface IRequestListApiKeys {
  /** ID of the user whose API keys to list */
  user_id: UserID;
}

/** List API Keys Response */
export interface IResponseListApiKeys extends ISuccessResponse<ApiKey[]> {}

/** Create API Key Request */
export interface IRequestCreateApiKey {
  id?: ApiKeyID;
  /** Name for the API key */
  name: string;
  /** ID of the user to create the API key for */
  user_id?: UserID;
  /** Timestamp when the key expires, -1 for never expires */
  expires_at?: number;
  /** External identifier */
  external_id?: string;
  /** Additional data for external systems */
  external_payload?: string;
}

/** Create API Key Response */
export interface IResponseCreateApiKey extends ISuccessResponse<ApiKey> {}

/** Update API Key Request */
export interface IRequestUpdateApiKey {
  /** ID of the API key to update */
  id: ApiKeyID;
  /** New name for the API key */
  name?: string;
  /** New expiration timestamp, -1 for never expires */
  expires_at?: number;
  /** Whether to revoke the API key */
  is_revoked?: boolean;
  /** External identifier */
  external_id?: string;
  /** Additional data for external systems */
  external_payload?: string;
}

/** Update API Key Response */
export interface IResponseUpdateApiKey extends ISuccessResponse<ApiKey> {}

/** Delete API Key Request */
export interface IRequestDeleteApiKey {
  /** ID of the API key to delete */
  id: ApiKeyID;
}

/** Delete API Key Response */
export interface IResponseDeleteApiKey
  extends ISuccessResponse<{
    /** ID of the deleted API key */
    id: ApiKeyID;
    /** Whether the API key was successfully deleted */
    deleted: boolean;
  }> {}

// =========================================================================
// Contacts Routes
// =========================================================================

/** Get Contact Request */
export interface IRequestGetContact {
  /** ID of the contact to retrieve */
  contact_id: UserID;
}

/** Get Contact Response */
export interface IResponseGetContact extends ISuccessResponse<ContactFE> {}

/** List Contacts Request */
export interface IRequestListContacts extends IPaginationParams {}

/** List Contacts Response */
export interface IResponseListContacts
  extends ISuccessResponse<IPaginatedResponse<ContactFE>> {}

/** Create Contact Request */
export interface IRequestCreateContact {
  id?: UserID;
  /** ICP principal associated with the contact */
  icp_principal: string;
  /** Nickname for the contact */
  name: string;
  /** EVM public address */
  evm_public_address?: string;
  /** Public note about the contact */
  public_note?: string;
  /** Private note about the contact */
  private_note?: string;
  /** External identifier */
  external_id?: string;
  /** Additional data for external systems */
  external_payload?: string;
}

/** Create Contact Response */
export interface IResponseCreateContact extends ISuccessResponse<ContactFE> {}

/** Update Contact Request */
export interface IRequestUpdateContact {
  /** ID of the contact to update */
  id: UserID;
  /** New nickname for the contact */
  nickname?: string;
  /** New nickname for the contact */
  email?: string;
  /** New nickname for the contact */
  notifications_url?: string;
  /** Public note about the contact */
  public_note?: string;
  /** Private note about the contact */
  private_note?: string;
  /** EVM public address */
  evm_public_address?: string;
  /** External identifier */
  external_id?: string;
  /** Additional data for external systems */
  external_payload?: string;
}

/** Update Contact Response */
export interface IResponseUpdateContact extends ISuccessResponse<ContactFE> {}

/** Delete Contact Request */
export interface IRequestDeleteContact {
  /** ID of the contact to delete */
  id: UserID;
}

/** Delete Contact Response */
export interface IResponseDeleteContact
  extends ISuccessResponse<{
    /** ID of the deleted contact */
    id: UserID;
    /** Whether the contact was successfully deleted */
    deleted: boolean;
  }> {}

/** Redeem Contact Request */
export interface IRequestRedeemContact {
  current_user_id: UserID;
  new_user_id: UserID;
  redeem_code: String;
}

/** Redeem Contact Response */
export interface IResponseRedeemContact extends ISuccessResponse<ContactFE> {}

// =========================================================================
// Disks Routes
// =========================================================================

/** Get Disk Request */
export interface IRequestGetDisk {
  /** ID of the disk to retrieve */
  disk_id: DiskID;
}

/** Get Disk Response */
export interface IResponseGetDisk extends ISuccessResponse<Disk> {}

/** List Disks Request */
export interface IRequestListDisks extends IPaginationParams {}

/** List Disks Response */
export interface IResponseListDisks
  extends ISuccessResponse<IPaginatedResponse<Disk>> {}

/** Create Disk Request */
export interface IRequestCreateDisk {
  id?: DiskID;
  /** Name for the disk */
  name: string;
  /** Type of disk */
  disk_type: DiskTypeEnum;
  /** Public note about the disk */
  public_note?: string;
  /** Private note about the disk */
  private_note?: string;
  /** Authentication JSON for the disk */
  auth_json?: string;
  /** External identifier */
  external_id?: string;
  /** Additional data for external systems */
  external_payload?: string;
}

/** Create Disk Response */
export interface IResponseCreateDisk extends ISuccessResponse<Disk> {}

/** Update Disk Request */
export interface IRequestUpdateDisk {
  /** ID of the disk to update */
  id: DiskID;
  /** New name for the disk */
  name?: string;
  /** Public note about the disk */
  public_note?: string;
  /** Private note about the disk */
  private_note?: string;
  /** Authentication JSON for the disk */
  auth_json?: string;
  /** External identifier */
  external_id?: string;
  /** Additional data for external systems */
  external_payload?: string;
}

/** Update Disk Response */
export interface IResponseUpdateDisk extends ISuccessResponse<Disk> {}

/** Delete Disk Request */
export interface IRequestDeleteDisk {
  /** ID of the disk to delete */
  id: DiskID;
}

/** Delete Disk Response */
export interface IResponseDeleteDisk
  extends ISuccessResponse<{
    /** ID of the deleted disk */
    id: DiskID;
    /** Whether the disk was successfully deleted */
    deleted: boolean;
  }> {}

// =========================================================================
// Drives Routes
// =========================================================================

/** Get Drive Request */
export interface IRequestGetDrive {
  /** ID of the drive to retrieve */
  external_drive_id: DriveID;
}

/** Get Drive Response */
export interface IResponseGetDrive extends ISuccessResponse<Drive> {}

/** List Drives Request */
export interface IRequestListDrives extends IPaginationParams {}

/** List Drives Response */
export interface IResponseListDrives
  extends ISuccessResponse<IPaginatedResponse<Drive>> {}

/** Create Drive Request */
export interface IRequestCreateDrive {
  id?: DriveID;
  /** Name for the drive */
  name: string;
  /** ICP principal */
  icp_principal: string;
  /** Public note about the drive */
  public_note?: string;
  /** Private note about the drive */
  private_note?: string;
  /** URL endpoint for the drive */
  endpoint_url?: URLEndpoint;
  /** External identifier */
  external_id?: string;
  /** Additional data for external systems */
  external_payload?: string;
}

/** Create Drive Response */
export interface IResponseCreateDrive extends ISuccessResponse<Drive> {}

/** Update Drive Request */
export interface IRequestUpdateDrive {
  /** ID of the drive to update */
  id: DriveID;
  /** New name for the drive */
  name?: string;
  /** Public note about the drive */
  public_note?: string;
  /** Private note about the drive */
  private_note?: string;
  /** ICP principal */
  icp_principal?: string;
  /** URL endpoint for the drive */
  endpoint_url?: URLEndpoint;
  /** External identifier */
  external_id?: string;
  /** Additional data for external systems */
  external_payload?: string;
}

/** Update Drive Response */
export interface IResponseUpdateDrive extends ISuccessResponse<Drive> {}

/** Delete Drive Request */
export interface IRequestDeleteDrive {
  /** ID of the drive to delete */
  id: DriveID;
}

/** Delete Drive Response */
export interface IResponseDeleteDrive
  extends ISuccessResponse<{
    /** ID of the deleted drive */
    id: DriveID;
    /** Whether the drive was successfully deleted */
    deleted: boolean;
  }> {}

// =========================================================================
// Self Canister Routes
// =========================================================================

/** Replay Drive Request */
export interface IRequestReplayDrive {
  /** List of state diffs to replay */
  diffs: any[];
  /** Notes about the replay */
  notes?: string;
}

/** Replay Drive Response */
export interface IResponseReplayDrive
  extends ISuccessResponse<{
    /** Timestamp in nanoseconds when replay completed */
    timestamp_ns: number;
    /** Number of diffs that were applied */
    diffs_applied: number;
    /** ID of the checkpoint diff */
    checkpoint_diff_id?: string;
    /** Final state checksum after replay */
    final_checksum: string;
  }> {}

/** Search Drive Request */
export interface IRequestSearchDrive {
  /** Search query */
  query: string;
  /** Categories to search in */
  categories?: Array<"FILES" | "FOLDERS" | "METADATA">;
  /** Number of items per page */
  page_size?: number;
  /** Cursor for previous page */
  cursor_up?: string;
  /** Cursor for next page */
  cursor_down?: string;
  /** Field to sort by */
  sort_by?: "CREATED_AT" | "UPDATED_AT";
  /** Sort direction */
  direction?: SortDirection;
}

/** Search Drive Response */
export interface IResponseSearchDrive
  extends ISuccessResponse<{
    /** Search result items */
    items: any[];
    /** Number of items per page */
    page_size: number;
    /** Total number of items */
    total: number;
    /** Cursor for previous page */
    cursor_up?: string;
    /** Cursor for next page */
    cursor_down?: string;
  }> {}

/** Reindex Drive Request */
export interface IRequestReindexDrive {
  /** Force reindexing even if the rate limit would be exceeded */
  force?: boolean;
}

/** Reindex Drive Response */
export interface IResponseReindexDrive
  extends ISuccessResponse<{
    /** Whether reindexing was successful */
    success: boolean;
    /** Timestamp when reindexing completed */
    timestamp_ms: number;
    /** Number of items indexed */
    indexed_count: number;
  }> {}

/** Transfer Drive Ownership Request */
export interface IRequestTransferDriveOwnership {
  /** ID of the user to transfer ownership to */
  next_owner_id: UserID;
}

/** Transfer Drive Ownership Response */
export interface IResponseTransferDriveOwnership
  extends ISuccessResponse<{
    /** Status of the transfer request */
    status: "REQUESTED" | "COMPLETED";
    /** Timestamp when the transfer will be ready to complete */
    ready_ms: number;
  }> {}

// =========================================================================
// Permissions by Directory Routes
// =========================================================================

/** Get Directory Permission Request */
export interface IRequestGetDirectoryPermission {
  /** ID of the directory permission to retrieve */
  directory_permission_id: DirectoryPermissionID;
}

/** Get Directory Permission Response */
export interface IResponseGetDirectoryPermission
  extends ISuccessResponse<DirectoryPermission> {}

/** Create Directory Permission Request */
export interface IRequestCreateDirectoryPermission {
  id?: DirectoryPermissionID;
  /** ID of the resource to grant permission for */
  resource_id: DirectoryResourceID;
  /** ID of the user/team to grant permission to */
  granted_to?: GranteeID;
  /** Types of permissions to grant */
  permission_types: Array<
    "VIEW" | "UPLOAD" | "EDIT" | "DELETE" | "INVITE" | "MANAGE"
  >;
  /** When the permission becomes active */
  begin_date_ms?: number;
  /** When the permission expires */
  expiry_date_ms?: number;
  /** Whether permission applies to sub-resources */
  inheritable: boolean;
  /** Note about the permission */
  note?: string;
  /** Additional metadata for the permission */
  metadata?: Record<string, any>;
  /** External identifier */
  external_id?: string;
  /** Additional data for external systems */
  external_payload?: string;
}

/** Create Directory Permission Response */
export interface IResponseCreateDirectoryPermission
  extends ISuccessResponse<DirectoryPermission> {}

/** Update Directory Permission Request */
export interface IRequestUpdateDirectoryPermission {
  /** ID of the permission to update */
  id: DirectoryPermissionID;
  /** ID of the resource to grant permission for */
  resource_id?: DirectoryResourceID;
  /** ID of the user/team to grant permission to */
  granted_to?: GranteeID;
  /** Types of permissions to grant */
  permission_types?: Array<
    "VIEW" | "UPLOAD" | "EDIT" | "DELETE" | "INVITE" | "MANAGE"
  >;
  /** When the permission becomes active */
  begin_date_ms?: number;
  /** When the permission expires */
  expiry_date_ms?: number;
  /** Whether permission applies to sub-resources */
  inheritable?: boolean;
  /** Note about the permission */
  note?: string;
  /** Additional metadata for the permission */
  metadata?: Record<string, any>;
  /** External identifier */
  external_id?: string;
  /** Additional data for external systems */
  external_payload?: string;
}

/** Update Directory Permission Response */
export interface IResponseUpdateDirectoryPermission
  extends ISuccessResponse<DirectoryPermission> {}

/** Delete Directory Permission Request */
export interface IRequestDeleteDirectoryPermission {
  /** ID of the directory permission to delete */
  permission_id: DirectoryPermissionID;
}

/** Delete Directory Permission Response */
export interface IResponseDeleteDirectoryPermission
  extends ISuccessResponse<{
    /** ID of the deleted directory permission */
    deleted_id: DirectoryPermissionID;
  }> {}

/** Check Directory Permissions Request */
export interface IRequestCheckDirectoryPermissions {
  /** ID of the resource to check permissions for */
  resource_id: DirectoryResourceID;
  /** ID of the user/team to check permissions for */
  grantee_id: GranteeID;
}

/** Check Directory Permissions Response */
export interface IResponseCheckDirectoryPermissions
  extends ISuccessResponse<{
    /** ID of the resource checked */
    resource_id: DirectoryResourceID;
    /** ID of the grantee checked */
    grantee_id: GranteeID;
    /** Permissions the grantee has for the resource */
    permissions: Array<
      "VIEW" | "UPLOAD" | "EDIT" | "DELETE" | "INVITE" | "MANAGE"
    >;
  }> {}

/** Redeem Directory Permission Request */
export interface IRequestRedeemDirectoryPermission {
  /** ID of the placeholder permission to redeem */
  permission_id: DirectoryPermissionID;
  /** ID of the user to redeem the permission for */
  user_id: UserID;
}

/** Redeem Directory Permission Response */
export interface IResponseRedeemDirectoryPermission
  extends ISuccessResponse<{
    /** The redeemed permission */
    permission: DirectoryPermission;
  }> {}

// =========================================================================
// Permissions by System Routes
// =========================================================================

/** Get System Permission Request */
export interface IRequestGetSystemPermission {
  /** ID of the system permission to retrieve */
  system_permission_id: SystemPermissionID;
}

/** Get System Permission Response */
export interface IResponseGetSystemPermission
  extends ISuccessResponse<SystemPermission> {}

/** Create System Permission Request */
export interface IRequestCreateSystemPermission {
  id?: SystemPermissionID;
  /** ID of the resource to grant permission for */
  resource_id: SystemResourceID;
  /** ID of the user/team to grant permission to */
  granted_to?: GranteeID;
  /** Types of permissions to grant */
  permission_types: Array<"CREATE" | "UPDATE" | "DELETE" | "VIEW" | "INVITE">;
  /** When the permission becomes active */
  begin_date_ms?: number;
  /** When the permission expires */
  expiry_date_ms?: number;
  /** Note about the permission */
  note?: string;
  /** Additional metadata for the permission */
  metadata?: Record<string, any>;
  /** External identifier */
  external_id?: string;
  /** Additional data for external systems */
  external_payload?: string;
}

/** Create System Permission Response */
export interface IResponseCreateSystemPermission
  extends ISuccessResponse<SystemPermission> {}

/** Update System Permission Request */
export interface IRequestUpdateSystemPermission {
  /** ID of the permission to update */
  id: SystemPermissionID;
  /** ID of the resource to grant permission for */
  resource_id?: SystemResourceID;
  /** ID of the user/team to grant permission to */
  granted_to?: GranteeID;
  /** Types of permissions to grant */
  permission_types?: Array<"CREATE" | "UPDATE" | "DELETE" | "VIEW" | "INVITE">;
  /** When the permission becomes active */
  begin_date_ms?: number;
  /** When the permission expires */
  expiry_date_ms?: number;
  /** Note about the permission */
  note?: string;
  /** Additional metadata for the permission */
  metadata?: Record<string, any>;
  /** External identifier */
  external_id?: string;
  /** Additional data for external systems */
  external_payload?: string;
}

/** Update System Permission Response */
export interface IResponseUpdateSystemPermission
  extends ISuccessResponse<SystemPermission> {}

/** Delete System Permission Request */
export interface IRequestDeleteSystemPermission {
  /** ID of the system permission to delete */
  permission_id: SystemPermissionID;
}

/** Delete System Permission Response */
export interface IResponseDeleteSystemPermission
  extends ISuccessResponse<{
    /** ID of the deleted system permission */
    deleted_id: SystemPermissionID;
  }> {}

/** Check System Permissions Request */
export interface IRequestCheckSystemPermissions {
  /** ID of the resource to check permissions for */
  resource_id: SystemResourceID;
  /** ID of the user/team to check permissions for */
  grantee_id: GranteeID;
}

/** Check System Permissions Response */
export interface IResponseCheckSystemPermissions
  extends ISuccessResponse<{
    /** ID of the resource checked */
    resource_id: SystemResourceID;
    /** ID of the grantee checked */
    grantee_id: GranteeID;
    /** Permissions the grantee has for the resource */
    permissions: Array<"CREATE" | "UPDATE" | "DELETE" | "VIEW" | "INVITE">;
  }> {}

/** Redeem System Permission Request */
export interface IRequestRedeemSystemPermission {
  /** ID of the placeholder permission to redeem */
  permission_id: SystemPermissionID;
  /** ID of the user to redeem the permission for */
  user_id: UserID;
}

/** Redeem System Permission Response */
export interface IResponseRedeemSystemPermission
  extends ISuccessResponse<{
    /** The redeemed permission */
    permission: SystemPermission;
  }> {}

// =========================================================================
// Teams Routes
// =========================================================================

/** Get Team Request */
export interface IRequestGetTeam {
  /** ID of the team to retrieve */
  team_id: TeamID;
}

/** Get Team Response */
export interface IResponseGetTeam extends ISuccessResponse<Team> {}

/** List Teams Request */
export interface IRequestListTeams extends IPaginationParams {}

/** List Teams Response */
export interface IResponseListTeams
  extends ISuccessResponse<IPaginatedResponse<Team>> {}

/** Create Team Request */
export interface IRequestCreateTeam {
  id?: TeamID;
  /** Name for the team */
  name: string;
  /** Public note about the team */
  public_note?: string;
  /** Private note about the team */
  private_note?: string;
  /** URL endpoint for the team */
  endpoint_url?: URLEndpoint;
  /** External identifier */
  external_id?: string;
  /** Additional data for external systems */
  external_payload?: string;
}

/** Create Team Response */
export interface IResponseCreateTeam extends ISuccessResponse<Team> {}

/** Update Team Request */
export interface IRequestUpdateTeam {
  /** ID of the team to update */
  id: TeamID;
  /** New name for the team */
  name?: string;
  /** Public note about the team */
  public_note?: string;
  /** Private note about the team */
  private_note?: string;
  /** URL endpoint for the team */
  endpoint_url?: URLEndpoint;
  /** External identifier */
  external_id?: string;
  /** Additional data for external systems */
  external_payload?: string;
}

/** Update Team Response */
export interface IResponseUpdateTeam extends ISuccessResponse<Team> {}

/** Delete Team Request */
export interface IRequestDeleteTeam {
  /** ID of the team to delete */
  id: TeamID;
}

/** Delete Team Response */
export interface IResponseDeleteTeam
  extends ISuccessResponse<{
    /** ID of the deleted team */
    id: TeamID;
    /** Whether the team was successfully deleted */
    deleted: boolean;
  }> {}

/** Validate Team Member Request */
export interface IRequestValidateTeamMember {
  /** ID of the user to check */
  user_id: UserID;
  /** ID of the team to check */
  team_id: TeamID;
}

/** Validate Team Member Response */
export interface IResponseValidateTeamMember
  extends ISuccessResponse<{
    /** Whether the user is a member of the team */
    is_member: boolean;
    /** ID of the team that was checked */
    team_id: TeamID;
    /** ID of the user that was checked */
    user_id: UserID;
  }> {}

// =========================================================================
// Team Invites Routes
// =========================================================================

/** Get Team Invite Request */
export interface IRequestGetTeamInvite {
  /** ID of the team invite to retrieve */
  invite_id: TeamInviteID;
}

/** Get Team Invite Response */
export interface IResponseGetTeamInvite extends ISuccessResponse<TeamInvite> {}

/** List Team Invites Request */
export interface IRequestListTeamInvites extends IPaginationParams {
  /** ID of the team to list invites for */
  team_id: TeamID;
}

/** List Team Invites Response */
export interface IResponseListTeamInvites
  extends ISuccessResponse<IPaginatedResponse<TeamInvite>> {}

/** Create Team Invite Request */
export interface IRequestCreateTeamInvite {
  id?: TeamInviteID;
  /** ID of the team for the invite */
  team_id: TeamID;
  /** ID of the user to invite */
  invitee_id?: UserID;
  /** Role to assign to the invited user */
  role: TeamRole;
  /** Timestamp when the invite becomes active */
  active_from?: number;
  /** Timestamp when the invite expires */
  expires_at?: number;
  /** Note about the invite */
  note?: string;
  /** External identifier */
  external_id?: string;
  /** Additional data for external systems */
  external_payload?: string;
}

/** Create Team Invite Response */
export interface IResponseCreateTeamInvite
  extends ISuccessResponse<TeamInvite> {}

/** Update Team Invite Request */
export interface IRequestUpdateTeamInvite {
  /** ID of the invite to update */
  id: TeamInviteID;
  /** New role to assign */
  role?: TeamRole;
  /** New timestamp when the invite becomes active */
  active_from?: number;
  /** New timestamp when the invite expires */
  expires_at?: number;
  /** New note about the invite */
  note?: string;
  /** External identifier */
  external_id?: string;
  /** Additional data for external systems */
  external_payload?: string;
}

/** Update Team Invite Response */
export interface IResponseUpdateTeamInvite
  extends ISuccessResponse<TeamInvite> {}

/** Delete Team Invite Request */
export interface IRequestDeleteTeamInvite {
  /** ID of the team invite to delete */
  id: TeamInviteID;
}

/** Delete Team Invite Response */
export interface IResponseDeleteTeamInvite
  extends ISuccessResponse<{
    /** ID of the deleted team invite */
    id: TeamInviteID;
    /** Whether the team invite was successfully deleted */
    deleted: boolean;
  }> {}

/** Redeem Team Invite Request */
export interface IRequestRedeemTeamInvite {
  /** ID of the team invite to redeem */
  invite_id: TeamInviteID;
  /** ID of the user to redeem the invite for */
  user_id: UserID;
}

/** Redeem Team Invite Response */
export interface IResponseRedeemTeamInvite
  extends ISuccessResponse<{
    /** The redeemed invite */
    invite: TeamInvite;
  }> {}

// =========================================================================
// Tags Routes
// =========================================================================

/** Get Tag Request */
export interface IRequestGetTag {
  /** ID or value of the tag to retrieve */
  id: TagID | string;
}

/** Get Tag Response */
export interface IResponseGetTag extends ISuccessResponse<Tag> {}

/** List Tags Request */
export interface IRequestListTags {
  /** Filters for tags */
  filters?: {
    /** Filter tags by prefix */
    prefix?: string;
  };
  /** Number of items per page */
  page_size?: number;
  /** Sort direction */
  direction?: SortDirection;
  /** Cursor for previous page */
  cursor_up?: string;
  /** Cursor for next page */
  cursor_down?: string;
}

/** List Tags Response */
export interface IResponseListTags
  extends ISuccessResponse<IPaginatedResponse<Tag>> {}

/** Create Tag Request */
export interface IRequestCreateTag {
  id?: TagID;
  /** The tag value (e.g., "Project-Alpha") */
  value: string;
  /** Description of the tag */
  description?: string;
  /** Color in hex format (e.g., #RRGGBB) */
  color?: string;
  /** External identifier */
  external_id?: string;
  /** Additional data for external systems */
  external_payload?: string;
}

/** Create Tag Response */
export interface IResponseCreateTag extends ISuccessResponse<Tag> {}

/** Update Tag Request */
export interface IRequestUpdateTag {
  /** ID of the tag to update */
  id: TagID;
  /** New value for the tag */
  value?: string;
  /** New description for the tag */
  description?: string;
  /** New color in hex format (e.g., #RRGGBB) */
  color?: string;
  /** External identifier */
  external_id?: string;
  /** Additional data for external systems */
  external_payload?: string;
}

/** Update Tag Response */
export interface IResponseUpdateTag extends ISuccessResponse<Tag> {}

/** Delete Tag Request */
export interface IRequestDeleteTag {
  /** ID of the tag to delete */
  id: TagID;
}

/** Delete Tag Response */
export interface IResponseDeleteTag
  extends ISuccessResponse<{
    /** ID of the deleted tag */
    id: TagID;
    /** Whether the tag was successfully deleted */
    deleted: boolean;
  }> {}

/** Tag Resource Request */
export interface IRequestTagResource {
  /** ID of the tag */
  tag_id: TagID;
  /** ID of the resource to tag or untag */
  resource_id: string;
  /** True to add the tag, false to remove it */
  add: boolean;
}

/** Tag Resource Response */
export interface IResponseTagResource
  extends ISuccessResponse<{
    /** Whether the operation was successful */
    success: boolean;
    /** Additional information about the operation */
    message?: string;
    /** The updated tag */
    tag?: Tag;
  }> {}

// =========================================================================
// Webhooks Routes
// =========================================================================

/** Get Webhook Request */
export interface IRequestGetWebhook {
  /** ID of the webhook to retrieve */
  webhook_id: WebhookID;
}

/** Get Webhook Response */
export interface IResponseGetWebhook extends ISuccessResponse<Webhook> {}

/** List Webhooks Request */
export interface IRequestListWebhooks extends IPaginationParams {}

/** List Webhooks Response */
export interface IResponseListWebhooks
  extends ISuccessResponse<IPaginatedResponse<Webhook>> {}

/** Create Webhook Request */
export interface IRequestCreateWebhook {
  id?: WebhookID;
  /** Alternative index for the webhook */
  alt_index: string;
  /** URL to send webhook events to */
  url: string;
  /** Event type to trigger the webhook */
  event: WebhookEventLabel;
  /** Name for the webhook */
  name?: string;
  /** Note for the webhook */
  note?: string;
  /** Signature for webhook verification */
  signature?: string;
  /** Description of the webhook */
  description?: string;
  /** Filter string for events */
  filters?: string;
  /** External identifier */
  external_id?: ExternalID;
  /** Additional data for external integrations */
  external_payload?: ExternalPayload;
}

/** Create Webhook Response */
export interface IResponseCreateWebhook extends ISuccessResponse<Webhook> {}

/** Update Webhook Request */
export interface IRequestUpdateWebhook {
  /** ID of the webhook to update */
  id: WebhookID;
  /** New URL for the webhook */
  url?: string;
  /** Name for the webhook */
  name?: string;
  /** Note for the webhook */
  note?: string;
  /** New signature for webhook verification */
  signature?: string;
  /** New description for the webhook */
  description?: string;
  /** Whether the webhook is active */
  active?: boolean;
  /** New filter string for events */
  filters?: string;
  /** External identifier */
  external_id?: ExternalID;
  /** Additional data for external integrations */
  external_payload?: ExternalPayload;
}

/** Update Webhook Response */
export interface IResponseUpdateWebhook extends ISuccessResponse<Webhook> {}

/** Delete Webhook Request */
export interface IRequestDeleteWebhook {
  /** ID of the webhook to delete */
  id: WebhookID;
}

/** Delete Webhook Response */
export interface IResponseDeleteWebhook
  extends ISuccessResponse<{
    /** ID of the deleted webhook */
    id: WebhookID;
    /** Whether the webhook was successfully deleted */
    deleted: boolean;
  }> {}

/** Superswap User Request */
export interface IRequestSuperswapUser {
  current_user_id: String;
  new_user_id: String;
}

/** Superswap User Response */
export interface IResponseSuperswapUser
  extends ISuccessResponse<{
    success: boolean;
    message: String;
  }> {}

/** Redeem Gift Card Request */
export interface IRequestRedeemGiftCard {
  giftcard_id: GiftCardID;
  owner_icp_principal: ICPPrincipalString;
  owner_name?: String;
  organization_name?: String;
}

/** Redeem Gift Card Response */
export interface IResponseRedeemGiftCard
  extends ISuccessResponse<{
    owner_id: UserID;
    drive_id: DriveID;
    endpoint_url: URLEndpoint;
    redeem_code: String;
  }> {}

/** Redeem Org Request */
export interface IRequestRedeemOrg {
  redeem_code: String;
}

/** Redeem Org Response */
export interface IResponseRedeemOrg
  extends ISuccessResponse<{
    drive_id: DriveID; // spawned drive id
    endpoint_url: URLEndpoint; // spawned drive url endpoint
    api_key: String; // admin api key for the spawned drive
    note: String; // note about the spawned drive, particularly info about the factory
    admin_login_password: String; // admin login password for the spawned drive
  }> {}
