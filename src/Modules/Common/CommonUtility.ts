import GridColumns from "Modules/TPM/Constants/GridColumns";
import { UserRole } from "./Constants/Types/UserRole";
import { randomNumberGenerator } from "Lib/Helpers/RandomNumberGenerator";

export const getTimeAgoMessage = (hours: number): string => {
  // TODO: remove this method and use moment.js .fromNow() method instead
  // https://stackoverflow.com/questions/53017772/moment-js-parse-date-time-ago
  let status: string = "";

  if (hours) {
    const days = Math.floor(hours / 24);
    if (hours === 0) status = "Less than an hour";
    else if (hours === 1) status = "1 hour";
    else if (hours > 1 && hours < 24) status = `${hours} hour(s)`;
    else if (hours > 23) {
      if (days === 1) status = "1 day";
      else if (days > 1) status = `${days} day(s)`;
    }
  }

  if (hours <= 0) {
    status = "Less than an hour";
  }

  return status;
};

export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text)
    .then(() => {

    })
    .catch((error) => {
      console.error('Error copying text to clipboard:', error);
    });
}

export const tradeTypeOptions = [
  { text: "Import", id: 1 },
  { text: "Export", id: 2 }
]

export const TradeTypes = {
  IMPORT: 1,
  EXPORT: 2
}

export const treatmentTypes = {
  FUMIGATION: 7
};

export const treatmentSubTypes = {
  METHYL: 1
};

export const conductedType = {
  CHAMBER:3,
  SHEET_CONTAINER:2,
  SHEETED_STACK:5,
}

export const consignmentModeType = {
  CONTAINERIZED: 7
}

export function checkEmptyContainer(arrayOfObjects:any) {
  for (const obj of arrayOfObjects) {
    if (obj.containerNumber === "" || obj.containerNumber == null) {
      return true;
    }
  }
  return false;
}
export const treatmentProviderOptions = []

export const treatmentRequestsStatus = {
  PENDING: 1,
  UNDERPROCESS: 2,
  ACCEPTED: 2,
  REJECTED: 3,
  ASSIGNED:4,
  RESSIGNED: 5,
  CERTIFICATEISSUED: 6,
  CERTIFICATEENDORSED: 7,
  CERTIFICATETAGGED: 8,
  CANCELLED: 9,
  ACKNOWLEDGEMENTREQUIRED: 10,
  TREATMENTREQUESTED: 11,
}

export function getTreatmentStatusName(statusCode: any) {
  switch (statusCode) {
    case 1:
      return "Pending";
    case 2:
      return "Accepted By Treatment Provider";
    case 3:
      return "Rejected By Treatment Provider";
    case 4:
      return "Treatment Certificate Issued";
    case 5:
      return "Treatment Provider Ressigned";
    case 6:
      return "Treatment Certificate Issued"
    case 7:
      return "Certificate Endorsed";
    case 8:
      return "Certificate Tagged";
    case 9:
      return "Cancelled"
    case 10:
      return "Acknowledgement Required"
    case 11:
      return "Treatment Requested";


    default:
      return "Invalid Status";
  }
}

export function getCustomTreatmentStatusName(statusCode: any, roleCode: any) {
  if (statusCode == treatmentRequestsStatus.RESSIGNED && roleCode == UserRole.TreatmentProvider) {
    return "Pending"
  };
  if (statusCode == treatmentRequestsStatus.RESSIGNED && roleCode == UserRole.Trader) {
    return "Ressigned"
  };
  return "Invalid Status"
}

export function conditionalModalHeading(roleCode: string, status: number, isSystemPayment?: boolean, isReassign?: boolean) {
  if (isReassign) {
    return "Reassign Treatment Provider"
  }
  if (roleCode == UserRole.Trader && status == treatmentRequestsStatus?.PENDING) {
    return "Reason For Cancellation";
  }
  if (roleCode == UserRole.TreatmentProvider && status == treatmentRequestsStatus?.PENDING) {
    return "Reason For Rejection";
  }

  if (isSystemPayment) {
    return "Specify Treatment Charges"
  }

  return "Reason";
}

export const getRoleBaseListing = (role: any, status?: number) => {
  if (role == UserRole.Trader) {
    return GridColumns.PendingTreatmentRequests;
  }
  if (role == UserRole.TreatmentProvider && status == treatmentRequestsStatus?.UNDERPROCESS) {
    return GridColumns.TpUnderProcessTreatmentRequests;
  }
  if (role == UserRole.TreatmentProvider && status == treatmentRequestsStatus?.ACCEPTED) {
    return GridColumns.TpIssueTreatmentRequests;
  }
  if (role == UserRole.TreatmentProvider && status == treatmentRequestsStatus?.REJECTED) {
    return GridColumns.TpRescindedTreatmentCertificate;
  }
  if (role == UserRole.TreatmentProvider && status == treatmentRequestsStatus?.PENDING) {
    return GridColumns.TpPendingTreatmentRequests;
  }
}

export const dateConstant = { EXCLUDED: "0001-01-01T00:00:00" };
export const temperatureData = [{ name: "Celsius", id: 1 }, { name: "Fahrenheit", id: 2 }, { name: "Kelvin", id: 3 }];
export const defaultTemperatureData = { name: "Celsius", id: 1 };
export const defaultAgency = { code: "DPP", id: 2, name: "Department of Plant Protection" };
export const durationData = [{ name: "Hours", id: 1 }, { name: "Minutes", id: 2 }, { name: "Days", id: 3 }];
export const defaultTimeData = [{ name: "Hours", id: 1 }]
export const defaultCountry = { name: "Pakistan", code: "PK" }

function getTabNameOfPendingStatusByUserRole(roleCode: string) {
  if (roleCode == UserRole.Trader || roleCode == UserRole.TreatmentProvider || roleCode === UserRole.CustomAgent) {
    return "Pending Treatment Requests";
  } else if (roleCode == UserRole.InspectionOfficer) {
    return "Pending Endorsements";
  } else {
    return ''
  }
}
function getTabNameOfTreatmentRequestStatusByUserRole(roleCode: string) {
  if (roleCode == UserRole.Trader || roleCode === UserRole.CustomAgent) {
    return "Treatment Requested By Officer";
  } else {
    return ''
  }
}
function getTabNameOfUnprocessedStatusByUserRole(roleCode: string) {
  if (roleCode == UserRole.InspectionOfficer) {
    return "Endorsed Treatment Certificates";
  } else if (roleCode == UserRole.Trader || roleCode == UserRole.TreatmentProvider || roleCode === UserRole.CustomAgent) {
    return "Treatment Under Process";
  } else {
    return ""
  }
}
function getTabNameOfRejectedStatusByUserRole(roleCode: string) {
  if (roleCode == UserRole.Trader || roleCode == UserRole.CustomAgent) {
    return "Rejected Treatment Requests";
  } else if (roleCode == UserRole.TreatmentProvider) {
    return "Rescinded Treatment Requests";
  } else {
    return ''
  }
}
export function roleBasedTabName(roleCode: string, status: number) {
  if (status == treatmentRequestsStatus?.PENDING) {
    return getTabNameOfPendingStatusByUserRole(roleCode)
  } else if (status == treatmentRequestsStatus?.TREATMENTREQUESTED) {
    return getTabNameOfTreatmentRequestStatusByUserRole(roleCode)
  } else if (status == treatmentRequestsStatus?.UNDERPROCESS) {
    return getTabNameOfUnprocessedStatusByUserRole(roleCode)
  } else if (status == treatmentRequestsStatus?.REJECTED) {
    return getTabNameOfRejectedStatusByUserRole(roleCode)
  }
};
export const form22Status = {DRAFT:"Draft",ISSUED:"Issued", ACKNOWLEDGED:"Acknowledged", REVOKED:"Revoked"};

function getGridColOfPendingStatusByUserRole (roleCode: string) {
  if (roleCode == UserRole.InspectionOfficer) {
    return GridColumns.ENPendingTreatmentRequests
  } else if (roleCode == UserRole.Trader || roleCode == UserRole.CustomAgent) {
    return GridColumns.PendingTreatmentRequests
  } else if (roleCode == UserRole.TreatmentProvider) {
    return GridColumns.TpPendingTreatmentRequests;
  } else {
    return []
  }
}
function getGridColOfUnprocessedStatusByUserRole (roleCode: string) {
  if (roleCode == UserRole.InspectionOfficer) {
    return GridColumns.ENPendingTreatmentRequests
  } else if (roleCode == UserRole.Trader || roleCode == UserRole.CustomAgent) {
    return GridColumns.TreatmentUnderProcess;
  } else if (roleCode == UserRole.TreatmentProvider) {
    return GridColumns.TpUnderProcessTreatmentRequests;
  } else {
    return []
  }
}
function getGridColOfAcceptedStatusByUserRole (roleCode: string) {
  if (roleCode == UserRole.Trader || roleCode == UserRole.CustomAgent) {
    return GridColumns.IssuedTreatmentCertificates;
  } else if (roleCode == UserRole.TreatmentProvider) {
    return GridColumns.TpIssueTreatmentRequests;
  }
}
function getGridColOfRejectedStatusByUserRole (roleCode: string) {
  if (roleCode == UserRole.Trader || roleCode == UserRole.CustomAgent) {
    return GridColumns.RescindedTreatmentCertificates;
  } else if (roleCode == UserRole.TreatmentProvider) {
    return GridColumns.TpRescindedTreatmentCertificate;
  }
}

export function roleBasedGrid(roleCode: string, status: number) {
  if (status == treatmentRequestsStatus?.PENDING) {
    getGridColOfPendingStatusByUserRole(roleCode)
  } else if (status == treatmentRequestsStatus?.UNDERPROCESS) {
    getGridColOfUnprocessedStatusByUserRole(roleCode)
  } else if (status == treatmentRequestsStatus?.ACCEPTED) {
    getGridColOfAcceptedStatusByUserRole(roleCode)
  } else if (status == treatmentRequestsStatus?.REJECTED) {
    getGridColOfRejectedStatusByUserRole(roleCode)
  }
}

// * demo data for testing
export const demoProductHSCODEData = []

export const listOfTradersPendingRequest = []

export const getSingleRecordTraderData = {}

export const colors = {
  editActionButton: "#007B4B"
}

export const formTextLimit = {
  CANCELLATION: 1000,
  REJECTION: 500
}

export function generateUniqueId() {
  const timestamp = Date.now();
  const randomPart = randomNumberGenerator() // add some randomeness
  return `${timestamp}-${randomPart}`;
}

export const workflowButtonsStyling = {
  APPROVED_BUTTON : "ViewIPApproveButtonStyle",
  REJECTED_BUTTON : "ViewIPRejectButtonStyle"
}

export const fumigationConformValue = {
  YES: "Yes",
  NO: "No"
}

export const paymentModeConst = {
  ONLINE : "Online",
  OFFLINE: "Offline"
}

export const Form22DocumentTypeCode = {FORM22CERTIFICATE:"FC",NONGENERATECOMPLIANCE:"NCN"}
