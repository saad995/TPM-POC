export interface IAmendment {
    initDocumentID: number;
    documentClassificationCode: string;
    initDocumentTypeCode: string;
    initDocumentIDs: string;
}

export interface IRenewal {
    initDocumentID: number;
    documentClassificationCode: string;
    initDocumentTypeCode: string;
    initDocumentIDs: string;
}

export type IIsAmendment = boolean | false;

export interface IGridFuncProps {
    initDocumentID: number;
    agencyId: number;
    action: number;
    initDocumentTypeCode: string;
    documentClassificationCode: string;
    currentRecordId: number;
    uploadPremisesExcelFIle: any;
    sdID?: string | null;
    amendment?: IAmendment;
    isAmendment?: IIsAmendment;
    agencyBusinessRegistrationEncryptedId?:string | null;
}