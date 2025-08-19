import { DriveID, FileConflictResolutionEnum, UserID } from "./primitives";

export interface IFrameEphemeralConfig {
  org_entropy?: string;
  profile_entropy?: string;
  org_name?: string;
  profile_name?: string;
}

export interface IFrameInjectedConfig {
  host: string;
  drive_id: DriveID;
  org_name: string;
  user_id: UserID;
  profile_name: string;
  api_key_value: string;
  redirect_to?: string;
}

export interface IFrameCommand {
  type: IFrameCommandType;
  data: IFrameCommandData;
  tracer?: string;
}

export interface IFrameCommandResult extends IFrameCommand {
  data: any;
  success: boolean;
  error?: string;
}

export enum IFrameCommandType {
  INIT = "OFFICEX_INIT",
  ABOUT = "OFFICEX_ABOUT",
  AUTH_TOKEN = "OFFICEX_AUTH_TOKEN",
  NAVIGATE = "OFFICEX_NAVIGATE",
  DIRECTORY_ACTION = "OFFICEX_DIRECTORY_ACTION",
  HEARTBEAT = "OFFICEX_HEARTBEAT",
}

export type IFrameCommandData =
  | IFrameCommandReq_CreateFile
  | IFrameCommandReq_CreateFolder
  | IFrameCommandReq_Navigate
  | {};

// IFrameCommandType.DIRECTORY_ACTION
export interface IFrameCommandReq_CreateFile {
  action: "CREATE_FILE";
  payload: {
    name: string;
    file_size?: number;
    expires_at?: number;
    raw_url?: string;
    base64?: string;
    parent_folder_uuid?: string;
  };
}

// IFrameCommandType.DIRECTORY_ACTION
export interface IFrameCommandReq_CreateFolder {
  action: "CREATE_FOLDER";
  payload: {
    name: string;
    labels?: string[];
    expires_at?: number;
    file_conflict_resolution?: FileConflictResolutionEnum;
    has_sovereign_permissions?: boolean;
    shortcut_to?: string;
    external_id?: string;
    external_payload?: any;
    parent_folder_uuid?: string;
  };
}

// IFrameCommandType.NAVIGATE
export interface IFrameCommandReq_Navigate {
  route: string; // should be after drive prefix, such as /settings not /org/current/settings
}

// IFrameCommandType.ABOUT
export interface IFrameCommandRes_About {
  org_name: string;
  drive_id: DriveID;
  user_id: UserID;
  profile_name: string;
  host?: string;
  frontend_domain?: string;
  frontend_url?: string;
  current_url?: string;
  tracer?: string;
}

// IFrameCommandType.AUTH_TOKEN
export interface IFrameCommandRes_AuthToken {
  host?: string;
  drive_id: DriveID;
  user_id: UserID;
  auth_token: string;
  tracer?: string;
}
