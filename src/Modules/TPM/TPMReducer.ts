
import alert from "Elements/Basic/AlertDismissible/AlertDismissibleReducer";
import TabSripStateReducer from "Modules/TPM/Common/TabStripCommon/TabStrpReducer";
import WorkloadSummaryReducer from "./WorkloadSummary/WorkloadSummaryReducer";
import RegistrationGridReducer from "Modules/TPM/TPMDashboard/Registration/Grid/GridReducer";
import CreateEditTPRegistrationReducer from "Modules/TPM/TPMDashboard/Registration/CreateEditTPMRegistration/CreateEditTPRegistrationReducer";
import generalCommentsReducer from "Modules/TPM/Common/GeneralComments/GeneralCommentsReducer";
import CommonApiReducer from "Modules/TPM/Common/CommonApi/CommonApiReducer";
import UploadDocumentReducer from "Modules/TPM/Common/UploadDocuments/UploadDocumentReducer";
import updateStoreReducer from "Modules/TPM/Common/UpdateStoreObject/UpdateStoreObjectReducer";
import FormGeneratorReducer from "Elements/Custom/FormGenerator/FormGeneratorReducer";

export default {
    alert,
    CommonApiReducer,
    updateStoreReducer,
    UploadDocumentReducer,
    WorkloadSummaryReducer,
    RegistrationGridReducer,
    TabSripStateReducer,
    CreateEditTPRegistrationReducer,
    generalCommentsReducer,
    FormGeneratorReducer
};