import { combineReducers } from "redux";

//Elements Reducer
import alert from "Elements/Basic/AlertDismissible/AlertDismissibleReducer";
import datePanelReducer from "Controls/DatePanel/DatePanelReducer";
//Third Party component reducers
import { reducer as toastrReducer } from "react-redux-toastr";

//Component Reducers
import CommonReducer from "Modules/Common/CommonReducer";
import fileReducer from "Elements/Basic/File/FileReducer";
import dashboardReducer from "Layouts/AppLayout/AppLayoutReducer";
import loginReducer from "Modules/Common/Login/LoginReducer";
import workflowReducer from "Modules/Common/Workflow/WorkflowReducer";
import TPMReducer  from "Modules/TPM/TPMReducer";
import InitiateTreatmentRequestReducer  from "Modules/TPM/TreatmentCertificate/InitiateTreatmentRequest/InitiateTreatmentRequestReducer";
import TreatmentCertificatesReducer  from "Modules/TPM/TreatmentCertificate/TreatmentCertificatesReducer";
import PendingTreatmentRequestListReducer  from "Modules/TPM/TreatmentCertificate/PendingTreatmentRequestList/PendingTreatmentRequestListReducer";
import TreatmentUnderProcessReducer  from "Modules/TPM/TreatmentCertificate/TreatmentUnderProcess/TreatmentUnderProcessReducer";
import CallTreatmentHistoryReducer  from "Modules/TPM/Common/CallTreatmentHistory/CallTreatmentHistoryReducer";
import TPMForm22HistoryReducer  from "Modules/TPM/Common/Form-22-TreatmentProviderHistory/Form-22-TreatmentProviderHistoryReducer";
import IndependentViewReducer  from "Modules/TPM/Common/IndependentViews/TreatmentCertificate/Reducer";
import GenerateNonComplianceReducer  from "Modules/TPM/GenerateNonCompliance/GenerateNonComplianceReducer";

const reducers = {
    datePanelReducer,
    toastr: toastrReducer,
    fileReducer,
    workflowReducer,
    IndependentViewReducer,
    TPMForm22HistoryReducer,
    CallTreatmentHistoryReducer,
    InitiateTreatmentRequestReducer,
    TreatmentUnderProcessReducer,
    PendingTreatmentRequestListReducer,
    TreatmentCertificatesReducer,
    GenerateNonComplianceReducer,
    dashboardReducer,
    loginReducer,
    ...TPMReducer,
    ...CommonReducer,
};

// export const rootReducer = combineReducers({
//     ...reducers
// });

const appReducer = combineReducers({
    ...reducers

});
interface Action {
    type: any;
    payload?: any;
}


export const rootReducer = (state: any, action: Action) => {
    
    //clear store/redux for logout to initially undefined form
    if (action.type === "USER_LOGOUT") {
       state = undefined;
    }

    return appReducer(state, action);

};



export type AppState = ReturnType<typeof rootReducer>;
