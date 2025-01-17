import { IFieldPermissionResponse } from "Modules/Common/CommonInterfaces";
import store from "Store";

const isFieldPermitted = (fieldCode: string, defaultValue: boolean = false) => {
    let currentState = store.getState();
    let permission: IFieldPermissionResponse[] = currentState?.dashboardReducer.dashboardInfo.permission;

    if (permission?.length > 0) {
        let foundPermissionIndex = permission.findIndex((x: IFieldPermissionResponse) => x.code == fieldCode);

        if (foundPermissionIndex > -1) {
            return permission[foundPermissionIndex].isPermitted;
        }

        return defaultValue;
    }

    return defaultValue;
};

export default isFieldPermitted;
