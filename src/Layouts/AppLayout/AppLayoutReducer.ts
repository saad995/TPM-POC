import {
    DASHBOARD_CLEAR_STATE,
    DASHBOARD_FAILURE,
    DASHBOARD_FILTER_MENUS_SUCCESS,
    DASHBOARD_REQUEST,
    DASHBOARD_SEARCH_MENUS_SUCCESS,
    DASHBOARD_SEPARATE_MENUS_SUCCESS,
    GET_DASHBOARD_INFO_SUCCESS,
    GET_UNREAD_USER_ALERTS_SUCCESS,
    GET_UNREAD_USER_MESSAGES_SUCCESS,
    PAGE_TITLE,
    REMOVE_NOTIFICATION_TYPE,
    ADD_NOTIFICATION_ACTION,
    UPDATE_USER_ROLE,
    WEBOC_SESSION,
    GET_LATEST_MESSAGES_SUCCESS
} from "./AppLayoutActionTypes";
import {
    DashboardReducerTypes,
    IDashboardMenu,
    IGetDashboardInfoResponseData,
    IUserAlert,
    IUserMessage,
    IUserRole,
    IGetWebocNavigationEncryptedTokenResponseData,
    IMessage
} from "./AppLayoutInterfaces";

//default state type
interface IDashboardState {
    loading: boolean;
    pageTitle: string;

    webocSessionData: IGetWebocNavigationEncryptedTokenResponseData;
    dashboardMenu: IDashboardMenu;
    unreadMessages: IUserMessage[] | null;
    unreadAlerts: IUserAlert[] | null;
    dashboardInfo: IGetDashboardInfoResponseData;
    currentUserRole: IUserRole;
    welcomeMessage: string;
    menuSearchQuery: string;
    latestMessages: IMessage[];
    count: number;
}

const dashboardMenu: IDashboardMenu = {
    sideMenu: [],
    menu: []
};

const dashboardInfo: IGetDashboardInfoResponseData = {
    userName: "",
    companyName: "",
    unreadAlertCount: 0,
    unreadMessageCount: 0,
    currentRole: "",
    currentRoleName: "Not set",
    roles: [],
    menus: [],
    dashboardBanner: "",
    tokenBalance: 0,
    subscriptionType: "",
    loggedInUserRoleId: "",
    agencyId: 0,
    permission: [],
    formPermission: [],
    isUnavailable: false,
    parentCollectorateCode: "",
    childUserRoleIds: []
};

// Default state
const defaultState: IDashboardState = {
    loading: false,
    pageTitle: "... Loading",
    webocSessionData: {
        webocBaseUrl: "",
        webocLoginUrl: "",
        webocPostLoginUrl: "",
        webocSessionId: ""
    },
    dashboardMenu: dashboardMenu,
    unreadMessages: [],
    unreadAlerts: [],
    dashboardInfo: dashboardInfo,
    currentUserRole: { Code: "", Name: "", UserRoleId: 0 },
    welcomeMessage: "",
    menuSearchQuery: "",
    latestMessages: [],
    count: 0
};

// Dashboard Reducer for all the action in Dashboard
const LayoutReducer = (state: IDashboardState = defaultState, action: DashboardReducerTypes): IDashboardState => {
    switch (action.type) {
        case DASHBOARD_REQUEST:
            return {
                ...state,
                loading: true
            };
        case DASHBOARD_FAILURE:
            return {
                ...state,
                loading: false
            };
        case DASHBOARD_SEPARATE_MENUS_SUCCESS:
            console.log("dashboardMenu===========================>>>>",action.payload)
            return {
                ...state,
                dashboardMenu: action.payload,
                loading: false
            };
        case DASHBOARD_FILTER_MENUS_SUCCESS:
            return {
                ...state,
                dashboardInfo: action.payload,
                loading: false
            };
        case DASHBOARD_SEARCH_MENUS_SUCCESS:
            return {
                ...state,
                menuSearchQuery: action.payload
            };
        case GET_LATEST_MESSAGES_SUCCESS:
        return {
            ...state,
            latestMessages: action.payload.messages,
            count: action.payload.count,
            loading: false
        };
        case GET_DASHBOARD_INFO_SUCCESS:
            console.log("dashboardInfo===>>",action.payload,action.payload.roles.filter((x) => x.Code === action.payload.currentRole)[0])
            return {
                ...state,
                dashboardInfo: action.payload,
                currentUserRole: action.payload.roles.filter((x) => x.Code === action.payload.currentRole)[0],
                loading: false
            };
        case GET_UNREAD_USER_MESSAGES_SUCCESS:
            return {
                ...state,
                unreadMessages: action.payload,
                loading: false
            };
        case GET_UNREAD_USER_ALERTS_SUCCESS:
            return {
                ...state,
                unreadAlerts: action.payload,
                loading: false
            };
        case UPDATE_USER_ROLE:
            return {
                ...state,
                currentUserRole: action.payload
            };
        case WEBOC_SESSION:
            return {
                ...state,
                webocSessionData: action.payload
            };
        case PAGE_TITLE:
            return {
                ...state,
                pageTitle: action.payload
            };
        case WEBOC_SESSION:
            return {
                ...state,
                webocSessionData: action.payload
            };
        case DASHBOARD_CLEAR_STATE:
            return {
                ...defaultState
            };
        default:
            return state;
    }
};

export default LayoutReducer;
