//Import Dispatch from redux
import { Dispatch } from "redux";

//Import action types
import {
    DASHBOARD_REQUEST,
    DASHBOARD_FAILURE,
    DASHBOARD_CLEAR_STATE,
    DASHBOARD_SEPARATE_MENUS_SUCCESS,
    GET_DASHBOARD_INFO_SUCCESS,
    GET_UNREAD_USER_MESSAGES_SUCCESS,
    GET_UNREAD_USER_ALERTS_SUCCESS,
    UPDATE_USER_ROLE,
    DASHBOARD_FILTER_MENUS_SUCCESS,
    DASHBOARD_SEARCH_MENUS_SUCCESS,
    PAGE_TITLE,
    WEBOC_SESSION,
    GET_LATEST_MESSAGES_SUCCESS
} from "./AppLayoutActionTypes";

//Import Data Types For Action
import service from "./AppLayoutServices";
import { IError } from "Elements/Types/SharedTypes";
import {
    FailureType,
    IClearStateType,
    IDashboardMenu,
    IFilterMenusSuccessType,
    IGetDashboardInfoResponseData,
    IGetDashboardInfoSuccessType,
    IGetUnreadUserAlertsRequestData,
    IGetUnreadUserAlertsResponseData,
    IGetUnreadUserAlertsSuccessType,
    IGetUnreadUserMessagesRequestData,
    IGetUnreadUserMessagesResponseData,
    IGetUnreadUserMessagesSuccessType,
    IGetWebocNavigationEncryptedTokenRequestData,
    IGetWebocNavigationEncryptedTokenResponseData,
    IGetWebocSessionSuccessType,
    IGetWelcomeMessageSuccessType,
    IPageTitleType,
    ISearchMenusSuccessType,
    ISwitchUserRoleRequestData,
    ISeparateMenusSuccessType,
    IUpdateUserRole,
    IUserAlert,
    IUserMessage,
    IUserRole,
    MenuPosition,
    RequestType,
    IGetLatestMessagesRequestData,
    IGetLatestMessagesResponseData,
    IGetLatestMessagesSuccessType,
} from "./AppLayoutInterfaces";
import { toastr } from "react-redux-toastr";
import Auth from "Lib/Net/Auth";

/************************** Actions Creators************************/

export const setPageTitleAction = (currentPageTitle: string) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(setPageTitle(currentPageTitle));
    } catch (e:any) {
        dispatch(failure(e));
    }
};

const getLatestMessagesSuccess = (response: IGetLatestMessagesResponseData): IGetLatestMessagesSuccessType => {
    return {
        type: GET_LATEST_MESSAGES_SUCCESS,
        payload: response
    };
};
// Switch User Role Action
export const switchUserRoleAction = (req: ISwitchUserRoleRequestData, nextRole: IUserRole) => async (
    dispatch: Dispatch<any>
) => {
    try {
        dispatch(request());
        let response: boolean = await service.switchUserRole(req);
        if (response) {
            dispatch(updateRole(nextRole));
            dispatch(getDashboardInfoAction(() => dispatch(getWebocSessionAction())));
        }
    } catch (e:any) {
        //dispatch(errorAlert(e));
        dispatch(failure(e));
    }
};

export const getLatestMessagesAction = (req: IGetLatestMessagesRequestData) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(request());
        let response: IGetLatestMessagesResponseData = await service.getLatestMessages(req);
        dispatch(getLatestMessagesSuccess(response));
    } catch (e: any) {
        dispatch(failure(e));
    }
};


export const filterMenusAction = (dashboardInfo: IGetDashboardInfoResponseData) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(filterMenusSuccess(dashboardInfo));
    } catch (e:any) {
        dispatch(failure(e));
    }
};

///////////////////

export const pinMenuAction = (menuId: number) => async (dispatch: Dispatch<any>) => {
    try {
        let response: any = await service.pinMenu(menuId);
        if (response.data) {
            toastr.success("Success", response.message.description);
            dispatch(getDashboardInfoAction(() => 0));
        } else {
            toastr.info("Information", response.message.description);
        }
    } catch (e:any) {
        dispatch(failure(e));
    }
};
export const unPinMenuAction = (menuId: number) => async (dispatch: Dispatch<any>) => {
    try {
        let response: any = await service.unPinMenu(menuId);
        if (response.data) {
            toastr.success("Success", response.message.description);
            dispatch(getDashboardInfoAction(() => 0));
        } else {
            toastr.info("Information", response.message.description);
        }
    } catch (e:any) {
        dispatch(failure(e));
    }
};

///////////////////

export const searchMenuAction = (query: string) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(searchMenuSuccess(query));
    } catch (e:any) {
        dispatch(failure(e));
    }
};


// Get Dashboard Info Action
export const getDashboardInfoAction = (callback?: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(request());
        let response: IGetDashboardInfoResponseData = await service.getUserDashboardInfo();
        Auth.setLoggedInUserRoleID(response.loggedInUserRoleId);
        Auth.setWebocUserRoleID(response!.encryptedWebocUserRoleId!);
        const separatedMenus: IDashboardMenu = getSeparatedMenus(response);
        console.log("dashboard info ",separatedMenus)
        dispatch(separateMenusSuccess(separatedMenus));
        if (callback) callback();
        return dispatch(getDashboardInfoSuccess(response));
    } catch (e:any) {
        dispatch(failure(e));
    }
};

// getWebocSessionAction
export const getWebocSessionAction = () => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(request());

        const req: IGetWebocNavigationEncryptedTokenRequestData = {
            menuId: 1,
            isReducedMode: true
        };
        let response: IGetWebocNavigationEncryptedTokenResponseData = await service.getWebocNavigationEncryptedToken(
            req
        );

        Auth.setWebocSessionId(response.webocSessionId);
        Auth.setWebocBaseUrl(response.webocBaseUrl);

        dispatch(getWebocSessionSuccess(response));
    } catch (e:any) {
        //dispatch(errorAlert(e));
        dispatch(failure(e));
    }
};

// getWebocSessionSuccess
const getWebocSessionSuccess = (
    response: IGetWebocNavigationEncryptedTokenResponseData
): IGetWebocSessionSuccessType => {
    return {
        type: WEBOC_SESSION,
        payload: response
    };
};

// Get Dashboard Info Action
export const getTopUnreadMessagesAction = (req: IGetUnreadUserMessagesRequestData) => async (
    dispatch: Dispatch<any>
) => {
    try {
        dispatch(request());
        let response: IGetUnreadUserMessagesResponseData = await service.getTopUnreadMessages(req);
        dispatch(getUnreadUserMessagesSuccess(response.messages));
    } catch (e:any) {
        //dispatch(errorAlert(e));
        dispatch(failure(e));
    }
};

// Get Dashboard Info Action
export const getTopUnreadAlertsAction = (req: IGetUnreadUserAlertsRequestData) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(request());
        let response: IGetUnreadUserAlertsResponseData = await service.getTopUnreadAlerts(req);
        dispatch(getUnreadUserAlertsSuccess(response.alerts));
    } catch (e:any) {
        //dispatch(errorAlert(e));
        dispatch(failure(e));
    }
};

// Helper Method
const getSeparatedMenus = (response: IGetDashboardInfoResponseData): IDashboardMenu => {
    const dashboardMenu: IDashboardMenu = {
        sideMenu: response.menus?.filter((x) => x.MenuPosition === MenuPosition.Left).sort((x) => x.SortOrder) ?? [],
        menu: response.menus?.filter((x) => x.MenuPosition === MenuPosition.Center).sort((x) => x.SortOrder) ?? []
    };
    return dashboardMenu;
};

/************************** Actions ************************/

// Request Action
const request = (): RequestType => {
    return {
        type: DASHBOARD_REQUEST
    };
};

const setPageTitle = (newTitle: string): IPageTitleType => {
    return {
        type: PAGE_TITLE,
        payload: newTitle
    };
};

// Failure Action
const failure = (error: IError): FailureType => {
    return {
        type: DASHBOARD_FAILURE,
        payload: error
    };
};

// Switch User Role Success Action
const separateMenusSuccess = (response: IDashboardMenu): ISeparateMenusSuccessType => {
    return {
        type: DASHBOARD_SEPARATE_MENUS_SUCCESS,
        payload: response
    };
};

// Filter menus Action
const filterMenusSuccess = (response: IGetDashboardInfoResponseData): IFilterMenusSuccessType => {
    return {
        type: DASHBOARD_FILTER_MENUS_SUCCESS,
        payload: response
    };
};

const searchMenuSuccess = (response: string): ISearchMenusSuccessType => {
    return {
        type: DASHBOARD_SEARCH_MENUS_SUCCESS,
        payload: response
    };
};


// Get Dashboard Info Success Action
const getDashboardInfoSuccess = (response: IGetDashboardInfoResponseData): IGetDashboardInfoSuccessType => {
    return {
        type: GET_DASHBOARD_INFO_SUCCESS,
        payload: response
    };
};

// Update Role Action
const updateRole = (response: IUserRole): IUpdateUserRole => {
    return {
        type: UPDATE_USER_ROLE,
        payload: response
    };
};

// Get Unread User Messages Success Action
const getUnreadUserMessagesSuccess = (response: IUserMessage[] | null): IGetUnreadUserMessagesSuccessType => {
    return {
        type: GET_UNREAD_USER_MESSAGES_SUCCESS,
        payload: response
    };
};

// Get Unread User Alerts Success Action
const getUnreadUserAlertsSuccess = (response: IUserAlert[] | null): IGetUnreadUserAlertsSuccessType => {
    return {
        type: GET_UNREAD_USER_ALERTS_SUCCESS,
        payload: response
    };
};

// Clear State Action
export const clearReducerState = (): IClearStateType => {
    return {
        type: DASHBOARD_CLEAR_STATE
    };
};

export default {
    clearReducerState
};
