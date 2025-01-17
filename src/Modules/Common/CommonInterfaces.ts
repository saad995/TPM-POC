export interface IFieldPermissionResponse {
    id: number;
    code: string;
    name: string;
    title: string;
    fieldId: number;
    permissionTypeID: number;
    permissionType: string;
    isPermitted: boolean;
}

export interface IFormPermissionResponse {
    code: string;
}
