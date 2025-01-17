export interface IPrintRequestData {
    documentId: number;
    documentTypeCode?:string;
    documentClassificationCode?:string;
    roleCode: string;
    rights: string;
    payload?:string;
}

export interface IPrintResponseData {
    fileContent: any;
    fileName:string;
    fileContentType:string;
    isAttachment:boolean;
    attachmentIds:string;
}
