import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
    DASHBOARD_REQUEST,
    DASHBOARD_FAILURE,
    DASHBOARD_CLEAR_STATE,
    DASHBOARD_SEPARATE_MENUS_SUCCESS,
    GET_DASHBOARD_INFO_SUCCESS,
    GET_UNREAD_USER_MESSAGES_SUCCESS,
    GET_UNREAD_USER_ALERTS_SUCCESS,
    UPDATE_USER_ROLE,
    GET_WELCOME_MESSAGE_SUCCESS,
    DASHBOARD_FILTER_MENUS_SUCCESS,
    DASHBOARD_SEARCH_MENUS_SUCCESS,
    PAGE_TITLE,
    WEBOC_SESSION,
    GET_LATEST_MESSAGES_SUCCESS
} from "./AppLayoutActionTypes";
import { IError } from "Elements/Types/SharedTypes";
import { IFieldPermissionResponse, IFormPermissionResponse } from "Modules/Common/CommonInterfaces";
import { BASIC_INFO_FAILURE, BASIC_INFO_REQUEST, SET_IS_LOADING } from "Modules/TPM/TreatmentCertificate/InitiateTreatmentRequest/InitiateTreatmentRequestActionTypes";

export interface ISwitchUserRoleRequestData {
    // userName: string;
    roleCode: string;
}

export interface IGetLatestMessagesSuccessType {
    type: typeof GET_LATEST_MESSAGES_SUCCESS;
    payload: IGetLatestMessagesResponseData;
}

export interface IGetLatestMessagesResponseData {
    messages: IMessage[];
    count: number;
}

export interface IGetLatestMessagesRequestData {
    roleCode: string;
    inboxFolderId: number;
    childUserRoleIds: string[];
}

export interface IGetWebocNavigationEncryptedTokenRequestData {
    menuId: number;
    isReducedMode: boolean;
}

export interface IGetWebocNavigationEncryptedTokenResponseData {
    webocBaseUrl: string;
    webocLoginUrl: string;
    webocSessionId: string;
    webocPostLoginUrl: string;
}

export interface IGetDashboardInfoResponseData {
    userName: string;
    unreadMessageCount: number;
    unreadAlertCount: number;
    companyName: string;
    currentRole: string;
    currentRoleName: string;
    roles: IUserRole[];
    menus: IUserMenu[];
    dashboardBanner: string;
    tokenBalance: number;
    subscriptionType: string;
    webocUserRoleId?: number;
    agencyId?: number;
    loggedInUserRoleId: string;
    encryptedWebocUserRoleId?: string;
    userRoleId?: string;
    permission: IFieldPermissionResponse[];
    formPermission: IFormPermissionResponse[];
    isUnavailable: boolean;
    parentCollectorateCode: string;
    childUserRoleIds:[]
}

export interface IGetUnreadUserMessagesRequestData {
    userName: string;
}

export interface IGetUnreadUserMessagesResponseData {
    userName: string;
    messages: IUserMessage[] | null;
}

export interface IGetUnreadUserAlertsRequestData {
    userName: string;
}

export interface IGetUnreadUserAlertsResponseData {
    userName: string;
    alerts: IUserAlert[] | null;
}

export interface IUserMenu {
    ID: number;
    DisplayText: string;
    DisplayTextShort: string;
    MenuPosition: MenuPosition;
    CssClass: IconProp;
    Url: string;
    ParentMenuID: number | null;
    SortOrder: number;
    UniqueId: string;
    Weboc_Left_Menu_ID?: number;
    Weboc_Navigation_Control_Type_ID?: number;

    SubMenus?: IUserMenu[];

    DisplayInTree: boolean;
    PinnedByUser: boolean;
    IsAlreadyPinned: boolean;
    RequiredVerificationFlag?: number;
}



export interface IUserMessage {
    Id: number;
    Subject: string;
    SenderName: string;
    SenderEmail: string;
    Body: string;
    SendDate: Date;
    ReceivedDate: Date;
    Status: number;
}

export interface IUserAlert {
    Id: number;
    Subject: string;
    Body: string;
    SendDate: Date;
    ReceivedDate: Date;
    Status: number;
}

export interface IUserRole {
    Code: string;
    Name: string;
    UserRoleId?: Number;
}

export interface IDashboardMenu {
    sideMenu: IUserMenu[];
    menu: IUserMenu[];
}



export interface IMessage {
    traderInboxId: number;
    date: number;
    time: number;
    inboxMessageStatusID: number;
    docType: string;
    subject: string;
    age?: string;
}

export interface RequestType {
    type: typeof DASHBOARD_REQUEST;
}
export interface BasicRequestType {
    type: typeof BASIC_INFO_REQUEST;
}
export interface BasicLoadingRequestType {
    type: typeof SET_IS_LOADING;
}

export interface BasicFailureType {
    type: typeof BASIC_INFO_FAILURE;
    payload: IError;
}
export interface FailureType {
    type: typeof DASHBOARD_FAILURE;
    payload: IError;
}

export interface ISeparateMenusSuccessType {
    type: typeof DASHBOARD_SEPARATE_MENUS_SUCCESS;
    payload: IDashboardMenu;
}

export interface IFilterMenusSuccessType {
    type: typeof DASHBOARD_FILTER_MENUS_SUCCESS;
    payload: IGetDashboardInfoResponseData;
}

export interface ISearchMenusSuccessType {
    type: typeof DASHBOARD_SEARCH_MENUS_SUCCESS;
    payload: string;
}

export interface IGetWelcomeMessageSuccessType {
    type: typeof GET_WELCOME_MESSAGE_SUCCESS;
    payload: string;
}

export interface IPageTitleType {
    type: typeof PAGE_TITLE;
    payload: string;
}


export interface IGetDashboardInfoSuccessType {
    type: typeof GET_DASHBOARD_INFO_SUCCESS;
    payload: IGetDashboardInfoResponseData;
}

export interface IGetWebocSessionSuccessType {
    type: typeof WEBOC_SESSION;
    payload: IGetWebocNavigationEncryptedTokenResponseData;
}

export interface IGetUnreadUserMessagesSuccessType {
    type: typeof GET_UNREAD_USER_MESSAGES_SUCCESS;
    payload: IUserMessage[] | null;
}

export interface IGetUnreadUserAlertsSuccessType {
    type: typeof GET_UNREAD_USER_ALERTS_SUCCESS;
    payload: IUserAlert[] | null;
}

export interface IClearStateType {
    type: typeof DASHBOARD_CLEAR_STATE;
}

export interface IUpdateUserRole {
    type: typeof UPDATE_USER_ROLE;
    payload: IUserRole;
}

export enum MenuPosition {
    Left = "L",
    Right = "R",
    Center = "C",
    Bottom = "B",
    Header = "H"
}
export interface ITokenExpiry {
    exp: number;
    nsf: number;
}

export interface ITokenExpiry {
    exp: number;
    nsf: number;
}

export type DashboardReducerTypes =
    | RequestType
    | FailureType
    | ISeparateMenusSuccessType
    | IFilterMenusSuccessType
    | ISearchMenusSuccessType
    | IGetDashboardInfoSuccessType
    | IGetWebocSessionSuccessType
    | IGetWelcomeMessageSuccessType
    | IPageTitleType
    | IGetUnreadUserMessagesSuccessType
    | IGetUnreadUserAlertsSuccessType
    | IUpdateUserRole
    | IGetLatestMessagesSuccessType
    | IClearStateType;

export type AppActions = DashboardReducerTypes;
