

export interface IRequestOptions {
    url:string,
    methodId: string,
    data?: any,
    pagination?:any,
    signature?:string,
    contentType?:string
}

export interface IHeaderTypes {
    'Content-Type': string,
    'token': string
}

export interface IPaginationTypes {
    offset: string,
    Size: string,
    SortColumn: string,
    SortOrder: string
}

export interface IFileRequestOptions {
    url: string;
    data: any;
}
export interface IHeaderTypes {
    "Content-Type": string;
    token: string;
}

export interface IFileRequestOptions {
    url: string;
    data: any;
}

export interface IBodyTypes {
    methodId: string;
    signature: string;
    data: any; //dynamic modeling required
    pagination: IPaginationTypes;
}
