import { GridCellProps, GridRowProps } from "@progress/kendo-react-grid";
import { IError } from "Lib/Types/SharedTypes";
import { IUserRightsFailureType } from "Modules/TPM/Common/UserRights/UserRightsInterfaces";
import {
    CHANGE_ITEMWISE_STATUS_SUCCESS,
    ITEMWISE_STATUS_REQUEST,
    ITEMWISE_STATUS_FAILURE
} from "./ConsignmentDescriptionActionTypes";
export interface IChangeItemWiseStatusRequestData {
    roleCode: string;

    initDocumentIdn: Number;
    initDocumentId: string;
    itemId: string;
    initDocumentTypeCode: string;
    documentClassificationCode?: string;
    statusId: number;
    comments: string;
    rights: string;
}
export interface CellRenderProps {
    originalProps: GridCellProps;
    td: React.ReactElement<HTMLTableCellElement>;
    enterEdit: (dataItem: any, field: string | undefined) => void;
    editField: string | undefined;
  }

  export interface RowRenderProps {
    originalProps: GridRowProps;
    tr: React.ReactElement<HTMLTableRowElement>;
    exitEdit: () => void;
    editField: string | undefined;
  }
export interface pendingItemsCountRseponseData {
    pendingItemsCount: Number;
}
export interface IChangeItemWiseStatusResponseData {
    message: string;
    code: number;
}
export interface IChangeItemWiseStatusSuccessType {
    type: typeof CHANGE_ITEMWISE_STATUS_SUCCESS;
    payload: IChangeItemWiseStatusResponseData;
}

export interface RequestType {
    type: typeof ITEMWISE_STATUS_REQUEST;
}

export interface FailureType {
    type: typeof ITEMWISE_STATUS_FAILURE;
    payload: IError;
}

export type ItemWiseActionTypes = IChangeItemWiseStatusSuccessType | RequestType | FailureType | IUserRightsFailureType;
