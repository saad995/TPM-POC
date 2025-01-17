

export interface WorkloadSummaryResponse {
    userID: number;
    name: string;
    profilePictureID: string;
    sampleID: number;
    testName: string;
    labTestRequestID: number;
    assignedOn: string;
    agency: string;
    consignmentDate: string;
    assignedTests: number;
    inProgressTests: number;
    completedTests: number;
    samplesAwaited: number;
    paymentsAwaited: number;
    workloadAssignmentList : WorkloadAssignmentList[];
}

export interface WorkloadAssignmentList {
    testName: string;
    agencyName: string;
    sampleId: string;
    documentNumber: string;
    labTestRequestDetailID:number;
    requestedDate: string;
    assignedOn: string;
    status: string;
}


export interface IGetAllLabOfficersResponse {
    id: number;
    userRoleId: number;
    name: string;
}

export interface IUpdateProfilePictureRequest {
    userId: number;
    profilePictureId: string;
}
export interface IUserDetailRequest {
    UserId: number;
}

export interface IUserDetailResponse {
    id: number;
    userName: string;
    personName: string;
    CNIC: string;
    email: string;
    phone: string;
    mobile: string;
    cityId: number;
    city: string;
    mailingAddress: string;
    physicalLocation: boolean;
    profilePictureId: string;
    statusCode: string;
    status: string;
}