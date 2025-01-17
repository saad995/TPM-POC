export interface keyValue {
    label: string;
    value: number;
}

export interface IPagination {
    offset: number;
    Size: number;
    SortColumn: string;
    SortOrder: string;
}

export interface IError {
    error: string;
    status: number;
}

export interface IErrorType {
    code: string;
    description: string;
}

export enum Role {
    Trader = "TR",
    Universal = "UN",
    CustomAgent = "CA",
    DeputyDirector = "DD",
    Officer = "OF",
    InspectionOfficer = "IO",
    LevelOneSupport = "LS1",
    LevelTwoSupport = "LS2",
    ECDeputyDirector = "EDD",
    ECOfficer = "EOF",
    ECInspectionOfficer = "EIO",
    RODeputyDirector = "RDD",
    ROOfficer = "ROF",
    ROInspectionOfficer = "RIO",
    IPDeputyDirector = "IDD",
    IPOfficer = "IOF",
    MISOfficer = "MO",
    TreatmentProvider = "TP",
    OGAAdmin = "OAA"
}
