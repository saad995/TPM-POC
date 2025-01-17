export interface IPrintPreviewRequestData {
    documentId: number;
    documentTypeCode?: string;
    documentClassificationCode?: string;
    roleCode: string;
    rights: string;
    payload?: string;
    isPreview?: boolean;
}

export interface IPrintPreviewResponseData {
    fileContentHtml: string;
}
