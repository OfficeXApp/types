// src/types/routes.ts

import { DirectoryAction, DirectoryActionResponseBody } from "./actions";
import {
  ApiKey,
  ContactFE,
  Disk,
  Drive,
  Label,
  Group,
  GroupInvite,
  Webhook,
  FolderRecordFE,
  FileRecordFE,
  FilePathBreadcrumb,
  SearchResult,
  SearchCategoryEnum,
  SearchSortByEnum,
  FactoryApiKey,
  GiftcardSpawnOrg,
  GiftcardRefuel,
  ExternalIDsDriveResponseData,
  PurchaseFE,
} from "./core";
import {
  DirectoryPermissionFE,
  PurchaseStatus,
  PermissionMetadata,
  SystemPermissionFE,
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
  GiftcardSpawnOrgID,
  GranteeID,
  ICPPrincipalString,
  SortDirection,
  SystemPermissionID,
  LabelID,
  GroupID,
  GroupInviteID,
  GroupRole,
  HostURL,
  UserID,
  WebhookEventLabel,
  WebhookID,
  InboxNotifID,
  ApiKeyValue,
  GiftcardRefuelID,
  SystemPermissionType,
  DirectoryPermissionType,
  PurchaseID,
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
  cursor?: string;
}

/** Common paginated response */
export interface IPaginatedResponse<T> {
  items: T[];
  page_size: number;
  total: number;
  cursor?: string;
  direction?: SortDirection;
}

// =========================================================================
// Purchases Routes
// =========================================================================

/** Request body for listing Purchases. */
export interface IRequestListPurchases extends IPaginationParams {}

/** Response data for listing Purchases. */
export interface IResponseListPurchases
  extends ISuccessResponse<IPaginatedResponse<PurchaseFE>> {}

/** Request body for getting a Purchase. */
export interface IRequestGetPurchase {
  id: PurchaseID;
}

/** Response data for getting a Purchase. */
export type IResponseGetPurchase = ISuccessResponse<PurchaseFE>;

/** Request body for creating a new Purchase. */
export interface IRequestCreatePurchase {
  id?: PurchaseID;
  template_id?: string;
  title: string;
  vendor_name?: string;
  vendor_id?: UserID;
  about_url?: string;
  status?: PurchaseStatus;
  description?: string;
  billing_url?: string;
  support_url?: string;
  delivery_url?: string;
  verification_url?: string;
  auth_installation_url?: string;
  subtitle?: string;
  pricing?: string;
  vendor_notes?: string;
  notes?: string;
  related_resources?: string[];
  tracer?: string;
  labels?: string[];
  external_id?: string;
  external_payload?: string;
  next_delivery_date?: number;
}

/** Response data for creating a Purchase. */
export type IResponseCreatePurchase = ISuccessResponse<PurchaseFE>;

/** Request body for updating an existing Purchase. */
export interface IRequestUpdatePurchase {
  id: PurchaseID;
  template_id?: string;
  title?: string;
  vendor_name?: string;
  vendor_id?: UserID;
  about_url?: string;
  status?: PurchaseStatus;
  description?: string;
  billing_url?: string;
  support_url?: string;
  delivery_url?: string;
  verification_url?: string;
  subtitle?: string;
  pricing?: string;
  vendor_notes?: string;
  related_resources?: string[];
  tracer?: string;
  labels?: string[];
  external_id?: string;
  external_payload?: string;
  next_delivery_date?: number;
}

/** Response data for updating a Purchase. */
export type IResponseUpdatePurchase = ISuccessResponse<PurchaseFE>;

/** Request body for deleting a Purchase. */
export interface IRequestDeletePurchase {
  id: PurchaseID;
}

/** Response data after deleting a Purchase. */
export type IResponseDeletePurchase = ISuccessResponse<{
  id: PurchaseID;
  deleted: boolean;
}>;

// =========================================================================
// Directory Routes
// =========================================================================

/** List Directory Request */
export interface IRequestListDirectory {
  /** ID of the folder to list contents from */
  folder_id?: string; // omit folder_id and path but include disk_id to get disk root shortcuts (aka shared with me)
  /** Path to the folder to list contents from */
  path?: string;
  /** disk id if just getting shortcuts */
  disk_id?: string;
  /** Filter string for directory contents */
  filters?: string;
  /** Number of items per page */
  page_size?: number;
  /** Sort direction */
  direction?: SortDirection;
  /** Cursor for pagination */
  cursor?: string;
}

/** List Directory Response */
export interface IResponseListDirectory
  extends ISuccessResponse<{
    folders: FolderRecordFE[];
    files: FileRecordFE[];
    total_files: number;
    total_folders: number;
    cursor?: string;
    breadcrumbs: FilePathBreadcrumb[];
  }> {}

/** Directory Action Request */
export interface IRequestDirectoryAction {
  actions: DirectoryAction[];
}

/** Directory Action Response */
export type IResponseDirectoryAction =
  ISuccessResponse<DirectoryActionResponseBody>;

/** Get File Asset (uses 302 redirect) Request */
export interface IRequestGetFileAsset {
  /** File ID with file extension */
  file_id_with_extension: string;
}

// Note: IResponseGetFileAsset typically implies a direct file download/redirect, not a JSON response.
// If you expect a JSON response for metadata, you'd define it here.
// For now, it's commented out as it's a redirect.
// export type IResponseGetFileAsset = ISuccessResponse<Blob>;

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
  begins_at?: number;
  /** Timestamp when the key expires, -1 for never expires */
  expires_at?: number;
  /** External identifier */
  external_id?: string;
  /** Additional data for external systems */
  external_payload?: string;
  private_note?: string;
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
  begins_at?: number;
  expires_at?: number;
  /** Whether to revoke the API key */
  is_revoked?: boolean;
  /** External identifier */
  external_id?: string;
  /** Additional data for external systems */
  external_payload?: string;
  private_note?: string;
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
  /** ID of the contact to create */
  id?: UserID;
  /** Nickname for the contact */
  name: string;
  /** Avatar URL for the contact */
  avatar?: string;
  /** Notifications URL for the contact */
  notifications_url?: string;
  /** Email address for the contact */
  email?: string;
  /** Secret entropy for the contact */
  secret_entropy?: string;
  /** Seed phrase for the contact */
  seed_phrase?: string;
  /** Determines if a placeholder user id */
  from_placeholder_user_id?: UserID;
  /** EVM public address */
  evm_public_address?: string;
  /** Public note about the contact */
  public_note?: string;
  /** Private note about the contact */
  private_note?: string;
  /** Determines if placeholder */
  is_placeholder?: boolean;
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
  name?: string;
  avatar?: string;
  /** New email for the contact */
  email?: string;
  /** New notifications URL for the contact */
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
  redeem_code: string;
  note?: string;
}
/** Redeem Contact Response */
export interface IResponseRedeemContact
  extends ISuccessResponse<{
    contact: ContactFE;
    api_key: ApiKeyValue;
  }> {}

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
  endpoint?: string;
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
  endpoint?: string;
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
  host_url?: HostURL;
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
  /** URL endpoint for the drive */
  host_url?: HostURL;
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
    timestamp_ms: number;
    /** Number of diffs that were applied */
    diffs_applied: number;
    /** ID of the checkpoint diff */
    checkpoint_diff_id?: string;
    /** Final state checksum after replay */
    final_checksum: string;
  }> {}

/** Search Drive Request Body */
export interface IRequestSearchDrive {
  /** Search query string */
  query: string;
  /** Categories to search in */
  categories?: SearchCategoryEnum[];
  /** Number of items per page (1-1000) */
  page_size?: number;
  /** Pagination cursor */
  cursor?: string;
  /** Field to sort results by */
  sort_by?: SearchSortByEnum;
  /** Sort direction */
  direction?: SortDirection;
}

/** Search Drive Response */
export interface IResponseSearchDrive
  extends ISuccessResponse<{
    /** Search result items */
    items: SearchResult[];
    /** Number of items per page */
    page_size: number;
    /** Total number of items */
    total: number;
    /** Current sort direction */
    direction: SortDirection;
    /** Cursor for pagination */
    cursor?: string;
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

/** External IDs Drive Request Body */
export interface IRequestExternalIDsDrive {
  /**
   * A list of external IDs to resolve.
   * Note: The backend validation requires each external ID to be 256 characters or less.
   */
  external_ids: ExternalID[];
}

/** API response for resolving external IDs. */
export type IResponseExternalIDsDrive =
  ISuccessResponse<ExternalIDsDriveResponseData>;

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
  extends ISuccessResponse<DirectoryPermissionFE> {}

/** List Directory Permissions Request */
export interface IRequestListDirectoryPermissions {
  /** Filters for system permissions */
  filters: {
    /** Filter by resource IDs */
    resource_id: DirectoryResourceID;
  };
  /** Number of items per page */
  page_size?: number;
  /** Sort direction */
  direction?: SortDirection;
  /** Cursor for pagination */
  cursor?: string;
}

/** List Directory Permissions Response */
export interface IResponseListDirectoryPermissions
  extends ISuccessResponse<{
    /** Directory permissions matching the request */
    items: DirectoryPermissionFE[];
    /** Number of items per page */
    page_size: number;
    /** Total number of matching permissions */
    total: number;
    /** Cursor for pagination */
    cursor?: string;
  }> {}

/** Create Directory Permission Request */
export interface IRequestCreateDirectoryPermission {
  id?: DirectoryPermissionID;
  /** ID of the resource to grant permission for */
  resource_id: DirectoryResourceID;
  /** ID of the user/group to grant permission to */
  granted_to?: GranteeID;
  /** Types of permissions to grant */
  permission_types: DirectoryPermissionType[];
  /** When the permission becomes active */
  begin_date_ms?: number;
  /** When the permission expires */
  expiry_date_ms?: number;
  /** Whether permission applies to sub-resources */
  inheritable: boolean;
  /** Note about the permission */
  note?: string;
  /** Additional metadata for the permission */
  metadata?: PermissionMetadata;

  /** External identifier */
  external_id?: string;
  /** Additional data for external systems */
  external_payload?: string;
}

/** Create Directory Permission Response */
export interface IResponseCreateDirectoryPermission
  extends ISuccessResponse<{ permission: DirectoryPermissionFE }> {}

/** Update Directory Permission Request */
export interface IRequestUpdateDirectoryPermission {
  /** ID of the permission to update */
  id: DirectoryPermissionID;
  /** Types of permissions to grant */
  permission_types?: DirectoryPermissionType[];
  /** When the permission becomes active */
  begin_date_ms?: number;
  /** When the permission expires */
  expiry_date_ms?: number;
  /** Whether permission applies to sub-resources */
  inheritable?: boolean;
  /** Note about the permission */
  note?: string;
  /** Additional metadata for the permission */
  metadata?: PermissionMetadata;
  /** External identifier */
  external_id?: string;
  /** Additional data for external systems */
  external_payload?: string;
}

/** Update Directory Permission Response */
export interface IResponseUpdateDirectoryPermission
  extends ISuccessResponse<{ permission: DirectoryPermissionFE }> {}

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
  /** ID of the user/group to check permissions for */
  grantee_id: GranteeID;
}

/** Check Directory Permissions Response */
export interface IResponseCheckDirectoryPermissions
  extends ISuccessResponse<{
    /** ID of the resource checked (as string) */
    resource_id: string;
    /** ID of the grantee checked (as string) */
    grantee_id: string;
    /** Permissions the grantee has for the resource */
    permissions: DirectoryPermissionType[];
  }> {}

/** Redeem Directory Permission Request */
export interface IRequestRedeemDirectoryPermission {
  /** ID of the placeholder permission to redeem */
  permission_id: DirectoryPermissionID;
  /** ID of the user to redeem the permission for */
  user_id: UserID;
  redeem_code: string;
  note?: string;
}

/** Redeem Directory Permission Response */
export interface IResponseRedeemDirectoryPermission
  extends ISuccessResponse<{
    /** The redeemed permission */
    permission: DirectoryPermissionFE;
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
  extends ISuccessResponse<SystemPermissionFE> {}

/** List System Permissions Request */
export interface IRequestListSystemPermissions {
  /** Filters for system permissions */
  filters?: {
    /** Filter by resource IDs */
    resource_ids?: string[];
    /** Filter by grantee IDs */
    grantee_ids?: GranteeID[];
    /** Filter by labels */
    labels?: string[];
  };
  /** Number of items per page */
  page_size?: number;
  /** Sort direction */
  direction?: SortDirection;
  /** Cursor for pagination */
  cursor?: string;
}

/** List System Permissions Response */
export interface IResponseListSystemPermissions
  extends ISuccessResponse<{
    /** System permissions matching the request */
    items: SystemPermissionFE[];
    /** Number of items per page */
    page_size: number;
    /** Total number of matching permissions */
    total: number;
    /** Cursor for pagination */
    cursor?: string;
  }> {}

/** Create System Permission Request */
export interface IRequestCreateSystemPermission {
  id?: SystemPermissionID;
  /** ID of the resource to grant permission for */
  resource_id: string;
  /** ID of the user/group to grant permission to */
  granted_to?: string;
  /** Types of permissions to grant */
  permission_types: SystemPermissionType[];
  /** When the permission becomes active */
  begin_date_ms?: number;
  /** When the permission expires */
  expiry_date_ms?: number;
  /** Note about the permission */
  note?: string;
  /** Additional metadata for the permission */
  metadata?: PermissionMetadata;
  /** External identifier */
  external_id?: string;
  /** Additional data for external systems */
  external_payload?: string;
}

/** Create System Permission Response */
export interface IResponseCreateSystemPermission
  extends ISuccessResponse<{ permission: SystemPermissionFE }> {}

/** Update System Permission Request */
export interface IRequestUpdateSystemPermission {
  /** ID of the permission to update */
  id: SystemPermissionID;
  /** ID of the resource to grant permission for */
  resource_id?: string;
  /** ID of the user/group to grant permission to */
  granted_to?: string;
  /** Types of permissions to grant */
  permission_types?: SystemPermissionType[];
  /** When the permission becomes active */
  begin_date_ms?: number;
  /** When the permission expires */
  expiry_date_ms?: number;
  /** Note about the permission */
  note?: string;
  /** Additional metadata for the permission */
  metadata?: PermissionMetadata;
  /** External identifier */
  external_id?: string;
  /** Additional data for external systems */
  external_payload?: string;
}

/** Update System Permission Response */
export interface IResponseUpdateSystemPermission
  extends ISuccessResponse<{ permission: SystemPermissionFE }> {}

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
  resource_id: string;
  /** ID of the user/group to check permissions for */
  grantee_id: string;
}

/** Check System Permissions Response */
export interface IResponseCheckSystemPermissions
  extends ISuccessResponse<{
    /** ID of the resource checked (as string) */
    resource_id: string;
    /** ID of the grantee checked (as string) */
    grantee_id: string;
    /** Permissions the grantee has for the resource */
    permissions: SystemPermissionType[];
  }> {}

/** Redeem System Permission Request */
export interface IRequestRedeemSystemPermission {
  /** ID of the placeholder permission to redeem */
  permission_id: SystemPermissionID;
  /** ID of the user to redeem the permission for */
  user_id: UserID;
  redeem_code: string;
  note?: string;
}

/** Redeem System Permission Response */
export interface IResponseRedeemSystemPermission
  extends ISuccessResponse<{
    /** The redeemed permission */
    permission: SystemPermissionFE;
  }> {}

// =========================================================================
// Groups Routes
// =========================================================================

/** Get Group Request */
export interface IRequestGetGroup {
  /** ID of the group to retrieve */
  group_id: GroupID;
}

/** Get Group Response */
export interface IResponseGetGroup extends ISuccessResponse<Group> {}

/** List Groups Request */
export interface IRequestListGroups extends IPaginationParams {}

/** List Groups Response */
export interface IResponseListGroups
  extends ISuccessResponse<IPaginatedResponse<Group>> {}

/** Create Group Request */
export interface IRequestCreateGroup {
  id?: GroupID;
  /** Name for the group */
  name: string;
  /** Avatar for the group */
  avatar?: string;
  /** Public note about the group */
  public_note?: string;
  /** Private note about the group */
  private_note?: string;
  /** URL endpoint for the group */
  host_url?: HostURL;
  /** External identifier */
  external_id?: string;
  /** Additional data for external systems */
  external_payload?: string;
}

/** Create Group Response */
export interface IResponseCreateGroup extends ISuccessResponse<Group> {}

/** Update Group Request */
export interface IRequestUpdateGroup {
  /** ID of the group to update */
  id: GroupID;
  /** New name for the group */
  name?: string;
  /** New avatar for the group */
  avatar?: string;
  /** Public note about the group */
  public_note?: string;
  /** Private note about the group */
  private_note?: string;
  /** URL endpoint for the group */
  host_url?: HostURL;
  /** External identifier */
  external_id?: string;
  /** Additional data for external systems */
  external_payload?: string;
}

/** Update Group Response */
export interface IResponseUpdateGroup extends ISuccessResponse<Group> {}

/** Delete Group Request */
export interface IRequestDeleteGroup {
  /** ID of the group to delete */
  id: GroupID;
}

/** Delete Group Response */
export interface IResponseDeleteGroup
  extends ISuccessResponse<{
    /** ID of the deleted group */
    id: GroupID;
    /** Whether the group was successfully deleted */
    deleted: boolean;
  }> {}

/** Validate Group Member Request */
export interface IRequestValidateGroupMember {
  /** ID of the user to check */
  user_id: UserID;
  /** ID of the group to check */
  group_id: GroupID;
}

/** Validate Group Member Response */
export interface IResponseValidateGroupMember
  extends ISuccessResponse<{
    /** Whether the user is a member of the group */
    is_member: boolean;
    /** ID of the group that was checked */
    group_id: GroupID;
    /** ID of the user that was checked */
    user_id: UserID;
  }> {}

// =========================================================================
// Group Invites Routes
// =========================================================================

/** Get Group Invite Request */
export interface IRequestGetGroupInvite {
  /** ID of the group invite to retrieve */
  invite_id: GroupInviteID;
}

/** Get Group Invite Response */
export interface IResponseGetGroupInvite
  extends ISuccessResponse<GroupInvite> {}

/** List Group Invites Request */
export interface IRequestListGroupInvites extends IPaginationParams {
  /** ID of the group to list invites for */
  group_id: GroupID;
}

/** List Group Invites Response */
export interface IResponseListGroupInvites
  extends ISuccessResponse<IPaginatedResponse<GroupInvite>> {}

/** Create Group Invite Request */
export interface IRequestCreateGroupInvite {
  id?: GroupInviteID;
  /** ID of the group for the invite */
  group_id: GroupID;
  /** ID of the user to invite */
  invitee_id?: UserID;
  /** Role to assign to the invited user */
  role?: GroupRole;
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

/** Create Group Invite Response */
export interface IResponseCreateGroupInvite
  extends ISuccessResponse<GroupInvite> {}

/** Update Group Invite Request */
export interface IRequestUpdateGroupInvite {
  /** ID of the invite to update */
  id: GroupInviteID;
  /** New role to assign */
  role?: GroupRole;
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

/** Update Group Invite Response */
export interface IResponseUpdateGroupInvite
  extends ISuccessResponse<GroupInvite> {}

/** Delete Group Invite Request */
export interface IRequestDeleteGroupInvite {
  /** ID of the group invite to delete */
  id: GroupInviteID;
}

/** Delete Group Invite Response */
export interface IResponseDeleteGroupInvite
  extends ISuccessResponse<{
    /** ID of the deleted group invite */
    id: GroupInviteID;
    /** Whether the group invite was successfully deleted */
    deleted: boolean;
  }> {}

/** Redeem Group Invite Request */
export interface IRequestRedeemGroupInvite {
  /** ID of the group invite to redeem */
  invite_id: GroupInviteID;
  redeem_code: string;
  note?: string;
}

/** Redeem Group Invite Response */
export interface IResponseRedeemGroupInvite
  extends ISuccessResponse<{
    /** The redeemed invite */
    invite: GroupInvite;
  }> {}

// =========================================================================
// Labels Routes
// =========================================================================

/** Get Label Request */
export interface IRequestGetLabel {
  /** ID or value of the label to retrieve */
  id: LabelID | string;
}

/** Get Label Response */
export interface IResponseGetLabel extends ISuccessResponse<Label> {}

/** List Labels Request */
export interface IRequestListLabels {
  /** Filters for labels */
  filters?: {
    /** Filter labels by prefix */
    prefix?: string;
  };
  /** Number of items per page */
  page_size?: number;
  /** Sort direction */
  direction?: SortDirection;
  /** Cursor for previous page */
  cursor?: string;
}

/** List Labels Response */
export interface IResponseListLabels
  extends ISuccessResponse<IPaginatedResponse<Label>> {}

/** Create Label Request */
export interface IRequestCreateLabel {
  id?: LabelID;
  /** The label value (e.g., "Project-Alpha") */
  value: string;
  /** Description of the label */
  description?: string;
  /** Color in hex format (e.g., #RRGGBB) */
  color?: string;
  /** External identifier */
  external_id?: string;
  /** Additional data for external systems */
  external_payload?: string;
  public_note?: string;
  private_note?: string;
}

/** Create Label Response */
export interface IResponseCreateLabel extends ISuccessResponse<Label> {}

/** Update Label Request */
export interface IRequestUpdateLabel {
  /** ID of the label to update */
  id: LabelID;
  /** New value for the label */
  value?: string;
  /** New description for the label */
  description?: string;
  /** New color in hex format (e.g., #RRGGBB) */
  color?: string;
  /** External identifier */
  external_id?: string;
  /** Additional data for external systems */
  external_payload?: string;
  public_note?: string;
  private_note?: string;
}

/** Update Label Response */
export interface IResponseUpdateLabel extends ISuccessResponse<Label> {}

/** Delete Label Request */
export interface IRequestDeleteLabel {
  /** ID of the label to delete */
  id: LabelID;
}

/** Delete Label Response */
export interface IResponseDeleteLabel
  extends ISuccessResponse<{
    /** ID of the deleted label */
    id: LabelID;
    /** Whether the label was successfully deleted */
    deleted: boolean;
  }> {}

/** Label Resource Request */
export interface IRequestLabelResource {
  /** ID of the label */
  label_id: LabelID;
  /** ID of the resource to label or unlabel */
  resource_id: string;
  /** True to add the label, false to remove it */
  add: boolean;
}

/** Label Resource Response */
export interface IResponseLabelResource
  extends ISuccessResponse<{
    /** Whether the operation was successful */
    success: boolean;
    /** Additional information about the operation */
    message?: string;
    /** The updated label */
    label?: Label;
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
  /** Webhook active */
  active?: boolean;
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
  current_user_id: string;
  new_user_id: string;
}

/** Superswap User Response */
export interface IResponseSuperswapUser
  extends ISuccessResponse<{
    success: boolean;
    message: string;
  }> {}

/** Redeem Gift Card Spawn Org Request */
export interface IRequestRedeemGiftcardSpawnOrg {
  giftcard_id: GiftcardSpawnOrgID;
  owner_user_id: UserID;
  owner_name?: string;
  organization_name?: string;
}

/** Redeem Gift Card Spawn Org Response */
export interface IResponseRedeemGiftcardSpawnOrg
  extends ISuccessResponse<{
    owner_id: UserID;
    drive_id: DriveID;
    host_url: HostURL;
    redeem_code: string;
    disk_auth_json?: string;
  }> {}

/** Redeem Org Request */
export interface IRequestRedeemOrg {
  redeem_code: string;
}

/** Redeem Org Response */
export interface IResponseRedeemOrg
  extends ISuccessResponse<{
    drive_id: DriveID; // spawned drive id
    host_url: HostURL; // spawned drive url endpoint
    api_key: string; // admin api key for the spawned drive
    note: string; // note about the spawned drive, particularly info about the factory
    admin_login_password: string;
    auto_login_url: string;
  }> {}

/** Redeem Gift Card Refuel Request */
export interface IRequestRedeemGiftcardRefuel {
  giftcard_id: string;
  icp_principal: string;
}

/** Redeem Gift Card Refuel Response */
export interface IResponseRedeemGiftcardRefuel
  extends ISuccessResponse<{
    giftcard_id: GiftcardRefuelID;
    icp_principal: string;
    redeem_code: string;
    timestamp_ms: number;
  }> {}

/** Inbox Org Request */
export interface IRequestInboxOrg {
  drive_id: DriveID;
  topic: string;
  payload: any;
}

/** Inbox Org Response */
export interface IResponseInboxOrg
  extends ISuccessResponse<{
    inbox_notif_id: InboxNotifID;
    drive_id: DriveID;
    timestamp_ms: number;
    note: string;
  }> {}

/** Who Am I Response */
export interface IResponseWhoAmI
  extends ISuccessResponse<{
    driveID: DriveID;
    drive_nickname: string;
    evm_public_address: string;
    icp_principal: ICPPrincipalString;
    is_owner: boolean;
    nickname: string;
    userID: UserID;
  }> {}

// =========================================================================
// Factory Routes
// =========================================================================

/** Factory Create API Key Request Body */
export interface IRequestFactoryCreateApiKey {
  name: string;
  user_id?: string;
  expires_at?: number;
  external_id?: string;
  external_payload?: string;
}

/** Factory Update API Key Request Body */
export interface IRequestFactoryUpdateApiKey {
  id: string;
  name?: string;
  expires_at?: number;
  is_revoked?: boolean;
  external_id?: string;
  external_payload?: string;
}

/** Factory Delete API Key Request Body */
export interface IRequestFactoryDeleteApiKey {
  id: string;
}

/** Factory Deleted API Key Data */
export interface IFactoryDeletedApiKeyData {
  id: string;
  deleted: boolean;
}

/** Factory State Snapshot */
export interface IFactoryStateSnapshot {
  // System info
  canister_id: string;
  version: string;
  owner_id: UserID;
  host_url: string;

  // API keys state
  apikeys_by_value: Record<string, string>;
  apikeys_by_id: Record<string, FactoryApiKey>;
  users_apikeys: Record<string, string[]>;
  apikeys_history: string[];

  // GiftcardSpawnOrg state
  deployments_by_giftcard_id: Record<string, IFactorySpawnHistoryRecord>;
  historical_giftcards: string[];
  drive_to_giftcard_hashtable: Record<string, string>;
  user_to_giftcards_hashtable: Record<string, string[]>;
  giftcard_by_id: Record<string, GiftcardSpawnOrg>;

  // Timestamp
  timestamp_ms: number;
}

/** Factory Snapshot Response */
export interface IResponseFactorySnapshot
  extends ISuccessResponse<IFactoryStateSnapshot> {}

/** List Giftcard Refuels Request Body */
export interface IRequestListGiftcardRefuels extends IPaginationParams {}

/** Create Giftcard Refuel Request Body */
export interface IRequestCreateGiftcardRefuel {
  action: "CREATE";
  usd_revenue_cents: number;
  note: string;
  gas_cycles_included: number;
  external_id: string;
}

/** Update Giftcard Refuel Request Body */
export interface IRequestUpdateGiftcardRefuel {
  action: "UPDATE";
  id: GiftcardRefuelID;
  note?: string;
  usd_revenue_cents?: number;
  gas_cycles_included?: number;
  external_id?: string;
}

/** Delete Giftcard Refuel Request Body */
export interface IRequestDeleteGiftcardRefuel {
  id: string;
}

/** Deleted Giftcard Refuel Data */
export interface IDeletedGiftcardRefuelData {
  id: string;
  deleted: boolean;
}

/** Redeem Giftcard Refuel Data */
export interface IRedeemGiftcardRefuelData {
  giftcard_id: GiftcardRefuelID;
  icp_principal: string;
}

/** Redeem Giftcard Refuel Result */
export interface IRedeemGiftcardRefuelResult {
  giftcard_id: GiftcardRefuelID;
  icp_principal: string;
  redeem_code: string;
  timestamp_ms: number;
}

/** Factory Refuel History Record */
export interface IFactoryRefuelHistoryRecord {
  id: string;
  note: string;
  giftcard_id: GiftcardRefuelID;
  gas_cycles_included: number;
  timestamp_ms: number;
  icp_principal: string; // Corresponds to ICPPrincipalString(PublicKeyICP)
}

// Factory Responses
/** List Giftcard Refuels Response Data */
export interface IResponseListGiftcardRefuelsData {
  items: GiftcardRefuel[];
  page_size: number;
  total: number;
  direction: SortDirection;
  cursor: string | null;
}

export type IResponseCreateGiftcardRefuel = ISuccessResponse<GiftcardRefuel>;
export type IResponseUpdateGiftcardRefuel = ISuccessResponse<GiftcardRefuel>;
export type IResponseDeleteGiftcardRefuel =
  ISuccessResponse<IDeletedGiftcardRefuelData>;
export type IResponseGetGiftcardRefuel = ISuccessResponse<GiftcardRefuel>;
export type IResponseListGiftcardRefuels =
  ISuccessResponse<IResponseListGiftcardRefuelsData>;
export type IResponseRedeemGiftcardRefuelResult =
  ISuccessResponse<IRedeemGiftcardRefuelResult>;

// --- GiftcardSpawnOrg Types ---
/** List Giftcard Spawn Orgs Request Body */
export interface IRequestListGiftcardSpawnOrgs extends IPaginationParams {}

/** List Giftcard Spawn Orgs Response Data */
export interface IResponseListGiftcardSpawnOrgsData {
  items: GiftcardSpawnOrg[];
  page_size: number;
  total: number;
  direction: SortDirection;
  cursor: string | null;
}

/** Create Giftcard Spawn Org Request Body */
export interface IRequestCreateGiftcardSpawnOrg {
  usd_revenue_cents: number;
  note: string;
  gas_cycles_included: number;
  external_id: string;
  disk_auth_json?: string;
}

/** Update Giftcard Spawn Org Request Body */
export interface IRequestUpdateGiftcardSpawnOrg {
  id: GiftcardSpawnOrgID;
  note?: string;
  usd_revenue_cents?: number;
  gas_cycles_included?: number;
  external_id?: string;
  disk_auth_json?: string;
}

/** Delete Giftcard Spawn Org Request Body */
export interface IRequestDeleteGiftcardSpawnOrg {
  id: GiftcardSpawnOrgID;
}

/** Deleted Giftcard Spawn Org Data */
export interface IDeletedGiftcardSpawnOrgData {
  id: GiftcardSpawnOrgID;
  deleted: boolean;
}

/** Redeem Giftcard Spawn Org Data */
export interface IRedeemGiftcardSpawnOrgData {
  giftcard_id: GiftcardSpawnOrgID;
  owner_icp_principal: string;
  owner_name?: string;
  organization_name?: string;
}

/** Redeem Giftcard Spawn Org Result */
export interface IRedeemGiftcardSpawnOrgResult {
  owner_id: UserID;
  drive_id: DriveID;
  host: string;
  redeem_code: string;
  disk_auth_json?: string;
}

/** Factory Spawn History Record */
export interface IFactorySpawnHistoryRecord {
  id: string;
  owner_id: UserID;
  drive_id: DriveID;
  host: string;
  version: string;
  note: string;
  giftcard_id: GiftcardSpawnOrgID;
  gas_cycles_included: number;
  timestamp_ms: number;
}

/** Spawn Init Args */
export interface IRequestSpawnInitArgs {
  owner: string;
  title?: string;
  owner_name?: string;
  note?: string;
  spawn_redeem_code?: string;
}

// Responses
export type IResponseCreateGiftcardSpawnOrg =
  ISuccessResponse<GiftcardSpawnOrg>;
export type IResponseUpdateGiftcardSpawnOrg =
  ISuccessResponse<GiftcardSpawnOrg>;
export type IResponseDeleteGiftcardSpawnOrg =
  ISuccessResponse<IDeletedGiftcardSpawnOrgData>;
export type IResponseGetGiftcardSpawnOrg = ISuccessResponse<GiftcardSpawnOrg>;
export type IResponseListGiftcardSpawnOrgs =
  ISuccessResponse<IResponseListGiftcardSpawnOrgsData>;
export type IResponseRedeemGiftcardSpawnOrgResult =
  ISuccessResponse<IRedeemGiftcardSpawnOrgResult>;

/** About Drive Response Data */
export interface IAboutDriveResponseData {
  gas_cycles: string;
  organization_name: string;
  organization_id: DriveID;
  owner: UserID;
  host: string;
  canister_id: string;
  daily_idle_cycle_burn_rate: string;
  controllers: string[];
  version: string;
}

export type IResponseAboutDrive = ISuccessResponse<IAboutDriveResponseData>;

export interface RedeemDiskGiftCard_BTOA {
  name: string;
  disk_type: string;
  public_note: string;
  auth_json: string;
  endpoint: string;
}

export interface fileRawUrl_BTOA {
  note: string;
  original: FileRecordFE;
}

export interface RedeemDirectoryPermission_BTOA {
  resource_id: DirectoryResourceID;
  permission_id: DirectoryPermissionID;
  redeem_code: string;
  redirect_url: string;
  resource_name: string;
  org_name: string;
  permissions: DirectoryPermissionType[];
  daterange: { begins_at: number; expires_at: number };
}

export interface AutoLogin_BTOA {
  org_name: string;
  org_id: DriveID;
  org_host: string;
  profile_id: UserID;
  profile_name: string;
  profile_api_key: ApiKeyValue;
  profile_seed_phrase?: string;
}

export interface SelfCustodySuperswapLogin_BTOA extends IRequestRedeemContact {
  type: "SelfCustodySuperswapLogin_BTOA";
  org_name: string;
  profile_name: string;
  redirect_url?: string;
}

export interface OrgOwnedContactApiKeyLogin_BTOA {
  type: "OrgOwnedContactApiKeyLogin_BTOA";
  api_key: string;
  org_name: string;
  profile_name: string;
  profile_id: UserID;
  redirect_url?: string;
  daterange: { begins_at: number; expires_at: number };
}

export interface SovereignStrangerLogin_BTOA {
  type: "SovereignStrangerLogin_BTOA";
  org_name: string;
  profile_name: string;
  profile_id: UserID;
  redirect_url?: string;
  api_key?: string;
}

export interface RedeemGroupInvite_BTOA {
  invite_id: GroupInviteID;
  redeem_code: string;
  redirect_url: string;
  group_name: string;
  role: GroupRole;
  org_name: string;
  daterange: { begins_at: number; expires_at: number };
}

export interface IRequestShortLink {
  slug?: string;
  original_url?: string;
}

export type IResponseShortLink = ISuccessResponse<{
  slug: string;
  original_url: string;
  shortlink_url: string;
}>;

export type IRequestGenerateCryptoIdentity = {
  secret_entropy?: string;
  seed_phrase?: string;
};

export type IResponseGenerateCryptoIdentity = ISuccessResponse<{
  user_id: UserID;
  icp_principal: string;
  evm_public_key: string;
  evm_private_key: string;
  origin: {
    secret_entropy?: string;
    seed_phrase?: string;
  };
}>;

// the user_id must be a contact first
export type IRequestAutoLoginLink = {
  user_id: UserID;
  profile_api_key: ApiKeyValue;
};

export type IResponseAutoLoginLink = ISuccessResponse<{
  user_id: UserID;
  auto_login_link: string;
  full_login_instructions: string;
}>;
