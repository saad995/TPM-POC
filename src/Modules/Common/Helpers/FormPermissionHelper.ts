import { IFormPermissionResponse } from "../CommonInterfaces";
import store from "Store";

const isFormPermitted = (formCode: string, defaultValue: boolean = false) => {
    let currentState = store.getState();
    let formPermission: IFormPermissionResponse[] = currentState?.dashboardReducer.dashboardInfo.formPermission;

    if (formPermission?.length > 0) {
        let foundPermissionIndex = formPermission.findIndex((x: IFormPermissionResponse) => x.code == formCode);

        if (foundPermissionIndex > -1) {
            return true;
        }

        return defaultValue;
    }

    return defaultValue;
};

export default isFormPermitted;
