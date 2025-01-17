const GridColumns = {
    AgencySiteRole: [
        {
            field: "agencySiteName",
            title: "Site",
            editor: "string",
            width: "200px"
        },
        {
            field: "roleName",
            title: "Role",
            editor: "string",
            width: "200px"
        },
        {
            field: "effectiveFromDate",
            title: "Effective Date",
            editor: "string",
            width: "200px"
        },
        {
            field: "Action",
            title: "Actions",
            cell: true,
            width: "200px",
            reorderable: true,
            resizable: true
        }
    ],

    EmployeePerformanceReport: [
        {
            field: "userName",
            title: "Lab Officer",
            editor: "string"
        },
        {
            field: "pendingRequestCount",
            title: "Pending Requests",
            editor: "string"
        },
        {
            field: "completedRequest",
            title: "Completed Requests",
            editor: "string"
        }
    ],

    WorkloadSummary: [
        {
            field: "sampleId",
            title: "Sample ID",
            editor: "string"
        },

        {
            field: "testName",
            title: "Test Name",
            editor: "string"
        },
        {
            field: "documentNumber",
            title: "Request Document Number",
            editor: "string"
        },
        {
            field: "agencyName",
            title: "Department Name",
            editor: "string"
        },
        {
            field: "assignedOn",
            title: "Assign Date",
            editor: "string"
        },
        {
            field: "requestedDate",
            title: "Request Date",
            editor: "string"
        },
        {
            field: "status",
            title: "Report Status",
            editor: "string"
        }

    ],

    Certification: [
        {
            field: "name",
            title: "Name",
            editor: "string"
        },

        {
            field: "description",
            title: "Description",
            editor: "string"
        },

        {
            field: "Action",
            title: "Action",
            editor: "string",
            isAction: true
        }
    ],

    Accrediation: [
        {
            field: "name",
            title: "Name",
            editor: "string"
        },

        {
            field: "Action",
            title: "Action",
            editor: "string",
            isAction: true
        }
    ],

    LabTestPerformanceReport: [
        {
            field: "requestNumber",
            title: "Request Number",
            editor: "string"
        },
        {
            field: "sampleID",
            title: "Sample ID",
            editor: "string"
        },
        {
            field: "requestDate",
            title: "Request Date",
            editor: "string"
        },

        {
            field: "progressStatus",
            title: "Progress Status",
            editor: "string",
            action: true
        },
        {
            field: "paymentStatus",
            title: "Payment Status",
            action: true
        }
    ],

    TestFinancialReport: [
        {
            field: "agencyName",
            title: "Agency Name",
            editor: "string"
        },
        {
            field: "testName",
            title: "Test Name",
            editor: "string"
        },
        {
            field: "billAmount",
            title: "Bill Amount (PKR)",
            editor: "string"
        },
        {
            field: "feesReceived",
            title: "Received Amount (PKR)",
            editor: "string",
            action: true
        }
    ],

    UserList: [
        {
            field: "fullName",
            title: "Name",
            editor: "string"
        },
        {
            field: "userName",
            title: "Username",
            editor: "string"
        },
        {
            field: "cnic",
            title: "CNIC Number",
            editor: "string"
        },
        {
            field: "postingCities",
            title: "Posted City",
            editor: "string"
        },
        {
            field: "status",
            title: "Status",
            editor: "string"
        },
        {
            field: "Action",
            title: "Actions",
            cell: true,
            reorderable: true,
            resizable: true
        }
        // { command: { text: "Delete" }, title: "Actions", width: "140px",template: "<button class=''>My Edit</button>" }
    ],

    UserCurrentRole: [
        {
            field: "agencySiteName",
            title: "Site",
            editor: "string",
            width: "300px"
        },
        {
            field: "roleName",
            title: "Role",
            editor: "string",
            width: "300px"
        },
        {
            field: "effectiveFromDate",
            title: "Effective Date",
            editor: "Date",
            width: "300px"
        },
        {
            field: "Action",
            title: "Actions",
            cell: true,
            width: "200px",
            reorderable: true,
            resizable: true
        }
    ],

    UserRole: [
        {
            field: "agencySiteName",
            title: "Site",
            editor: "string",
            width: "300px"
        },
        {
            field: "roleName",
            title: "Role",
            editor: "string",
            width: "300px"
        },
        {
            field: "effectiveFromDate",
            title: "Effective Date",
            editor: "Date",
            width: "300px"
        }
    ],

    UserPostingHistory: [
        {
            field: "agencySiteName",
            title: "Site",
            editor: "string",
            width: "200px"
        },
        {
            field: "roleName",
            title: "Role",
            editor: "string",
            width: "200px"
        },
        {
            field: "effectiveFromDate",
            title: "Effective From",
            editor: "Date",
            width: "200px"
        },
        {
            field: "effectiveThruDate",
            title: "Effective Till",
            editor: "Date",
            width: "200px"
        }
    ],

    UserStatusHistory: [
        {
            field: "status",
            title: "Status",
            editor: "string",
            width: "200px"
        },
        {
            field: "effectiveDate",
            title: "Date",
            editor: "Date",
            width: "200px"
        },
        {
            field: "comment",
            title: "Remarks",
            width: "200px",
            editor: "string"
        }
    ],
    Role: [
        {
            field: "name",
            title: "Role",
            editor: "string",
            width: "200px"
        },
        {
            field: "Action",
            title: "Actions",
            cell: true,
            width: "200px",
            reorderable: true,
            resizable: true
        }
    ],
    RolePermission: [
        {
            field: "isPermitted",
            width: "50px",
            reorderable: true,
            resizable: true
        },
        {
            field: "name",
            title: "Privilege Name",
            editor: "string",
            width: "300px"
        }
        // ,
        // {
        //     field: "title",
        //     title: "Privilege Title",
        //     editor: "string",
        //     width: "300px"
        // }
    ],

    RoleMenu: [
        {
            field: "isPermitted",
            width: "50px",
            reorderable: true,
            resizable: true
        },
        {
            field: "description",
            title: "Menu",
            editor: "string",
            width: "300px"
        }
    ],

    RoleMenuMyProfile: [
        {
            field: "description",
            title: "Menu",
            editor: "string",
            width: "300px"
        }
    ],

    RolePermissionMyProfile: [
        {
            field: "name",
            title: "Privilege Name",
            editor: "string",
            width: "300px"
        },
        {
            field: "title",
            title: "Privilege Title",
            editor: "string",
            width: "300px"
        }
    ],

    ActivityReport: [
        {
            field: "activity",
            title: "Activity",
            editor: "string"
        },
        {
            field: "activityDate",
            title: "Activity Date",
            editor: "string"
        },
        {
            field: "activityTime",
            title: "Activity Time (24 Hours)",
            editor: "string"
        }
    ],

    TransferReport: [
        {
            field: "location",
            title: "Site",
            editor: "string"
        },
        {
            field: "role",
            title: "Role",
            editor: "string"
        },
        {
            field: "postDate",
            title: "Post On",
            editor: "string"
        },
        {
            field: "transferDate",
            title: "Revoked On",
            editor: "string"
        }
    ],

    LeaveReport: [
        {
            field: "leaveDate",
            title: "Leave Start On",
            editor: "string"
        },
        {
            field: "resumeDate",
            title: "Leave End On",
            editor: "string"
        },
        {
            field: "leaveDays",
            title: "Total Leave Days",
            editor: "string"
        }
    ],
    LoginSessionReport: [
        {
            field: "loginDate",
            title: "Login Date",
            editor: "string"
        },
        {
            field: "loginTime",
            title: "Login Time (24 Hours)",
            editor: "string"
        },
        {
            field: "logoutTime",
            title: "Logout Time (24 Hours)",
            editor: "string"
        },
        {
            field: "totalSessionTime",
            title: "Total SessionTime (Hours : Minutes)",
            editor: "string"
        }
    ],

    Workload: [
        {
            field: "documentNumber",
            title: "Document Number",
            editor: "number"
        },
        {
            field: "documentType",
            title: "Document Type",
            editor: "string"
        },
        {
            field: "createOn",
            title: "Initiated Date",
            editor: "Date",
            format: "{0:MM dd, yyyy}"
        },
        {
            field: "userRoleName",
            title: "Role",
            editor: "string"
        },
        {
            field: "documentStatus",
            title: "Status",
            editor: "string"
        },
        {
            field: "Action",
            title: "Actions",
            cell: true,
            width: "200px",
            reorderable: true,
            resizable: true
        }
    ],
    WorkloadHistory: [
        {
            field: "documentNumber",
            title: "Document Number",
            editor: "number"
        },
        {
            field: "documentType",
            title: "Document Type",
            editor: "string"
        },
        {
            field: "fullName",
            title: "Name",
            editor: "string"
        },
        {
            field: "userRole",
            title: "Role",
            editor: "string"
        },
        {
            field: "assignmentStatus",
            title: "Assignment Status",
            editor: "string"
        },
        {
            field: "initiatedDate",
            title: "Initiated Date",
            editor: "Date",
            format: "{0:MM dd, yyyy}"
        },
        {
            field: "assignedOn",
            title: "Assigned On",
            editor: "Date",
            format: "{0:MM dd, yyyy}"
        },
        {
            field: "revokedOn",
            title: "Revoked On",
            editor: "Date",
            format: "{0:MM dd, yyyy}"
        }
    ],
    UserIP: [
        {
            field: "fromIP",
            title: "From IP",
            editor: "string",
            width: "200px"
        },
        {
            field: "toIP",
            title: "To IP",
            editor: "string",
            width: "200px"
        },
        {
            field: "Action",
            title: "Actions",
            cell: true,
            width: "200px",
            reorderable: true,
            resizable: true
        }
    ],

    DocumentHistoryReport: [
        {
            field: "documentNumber",
            title: "Document Number",
            editor: "number",
            action: true
        },
        {
            field: "certificateNumber",
            title: "Certificate Number",
            editor: "text"
        },
        {
            field: "documentType",
            title: "Document Type",
            editor: "string"
        },
        {
            field: "userName",
            title: "Username",
            editor: "string"
        },
        {
            field: "personName",
            title: "Name",
            editor: "string"
        },
        {
            field: "userRoleName",
            title: "Role",
            editor: "string"
        },
        {
            field: "documentStatus",
            title: "Document Status",
            editor: "string"
        },
        {
            field: "createOn",
            title: "Initiated On",
            editor: "Date",
            format: "{0:MM dd, yyyy}"
        },
        {
            field: "assignmentStartOn",
            title: "Assigned On",
            editor: "Date",
            format: "{0:MM dd, yyyy}"
        }
    ],

    InternalUsersReport: [
        {
            field: "userName",
            title: "Username",
            editor: "string"
        },
        {
            field: "personName",
            title: "Full Name",
            editor: "string"
        },
        {
            field: "cnic",
            title: "CNIC",
            editor: "string"
        },
        {
            field: "createOn",
            title: "Created Date",
            editor: "Date",
            format: "{0:MM dd, yyyy}"
        },
        {
            field: "status",
            title: "Status",
            editor: "string"
        }
    ],

    UserRolesReport: [
        {
            field: "userRoleName",
            title: "Role Title",
            editor: "string"
        },
        {
            field: "userRoleCount",
            title: "Total Assigned Roles",
            editor: "number"
        }
    ],

    DepartmentWorkloadReport: [
        {
            field: "city",
            title: "City",
            editor: "string"
        },
        {
            field: "agencySite",
            title: "OGA Site",
            editor: "string"
        },
        {
            field: "documentCount",
            title: "Total Documents",
            editor: "number"
        }
    ],

    TrackDocument: [
        {
            field: "sd",
            title: "SD Number",
            editor: "string"
        },
        {
            field: "gd",
            title: "GD Number",
            editor: "string"
        },
        {
            field: "gdStatus",
            title: "GD Status",
            editor: "string"
        }
    ],
    TrackDocumentDetail: [
        {
            field: "requestDocumentNumber",
            title: "Document Number",
            editor: "string"
        },
        {
            field: "agencyName",
            title: "Agency",
            editor: "string"
        },
        {
            field: "agencySiteName",
            title: "OGA Site",
            editor: "string"
        },
        {
            field: "role",
            title: "Role",
            editor: "string"
        },
        {
            field: "name",
            title: "Name",
            editor: "string"
        },
        {
            field: "currentDocumentStatus",
            title: "Status",
            editor: "string"
        }
    ],
    ViewActivityLog: [
        {
            field: "module",
            title: "Module",
            editor: "string"
        },
        {
            field: "activityName",
            title: "Activity Name",
            editor: "string"
        },
        {
            field: "name",
            title: "User",
            editor: "string"
        },
        {
            field: "userName",
            title: "Username",
            editor: "string"
        },
        {
            field: "role",
            title: "Role",
            editor: "string"
        },
        {
            field: "formattedDate",
            title: "Action Date",
            editor: "date"
        },
        {
            field: "age",
            title: "Age",
            editor: "string",
            footerCell: true
        }
    ],

    TestSummaryLabIncharge: [
        {
            field: "sampleID",
            title: "Sample ID",
            reorderable: true,
            resizable: true
        },
        {
            field: "agency",
            title: "Department",
            reorderable: true,
            resizable: true
        },
        {
            field: "requestedDate",
            title: "Request Date",
            reorderable: true,
            resizable: true
        },
        {
            field: "hsCode",
            title: "HS Code - Product Code",
            reorderable: true,
            resizable: true
        },
        {
            field: "feesReceived",
            title: "Total Test Fee (PKR)",
            reorderable: true,
            resizable: true
        },
        {
            field: "paymentStatusString",
            title: "Payment Status",
            reorderable: true,
            isBillPaid: true,
            resizable: true
        },
        {
            field: "sampleStatusString",
            title: "Sample Status",
            editor: "true",
            reorderable: true,
            resizable: true,
            isSampleReceived: true
        },
        {
            field: "testProgress",
            title: "Progress",
            reorderable: true,
            resizable: true,
            isTestProgress: true
        },
        {
            field: "Action",
            title: "Actions",
            cell: true,
            reorderable: true,
            resizable: true,
            isAction: true
        }
        // { command: { text: "Delete" }, title: "Actions", width: "140px",template: "<button class=''>My Edit</button>" }
    ],
    TestSummaryLabOfficer: [
        {
            field: "sampleID",
            title: "Sample ID",
            reorderable: true,
            resizable: true
        },
        {
            field: "testName",
            title: "Test Name",
            reorderable: true,
            resizable: true
        },
        {
            field: "labTestRequestID",
            title: "Request Number",
            reorderable: true,
            resizable: true
        },
        {
            field: "agency",
            title: "Department",
            reorderable: true,
            resizable: true
        },
        {
            field: "requestedDate",
            title: "Request Date",
            reorderable: true,
            resizable: true
        },
        {
            field: "sampleStatusString",
            title: "Sample Status",
            editor: "true",
            reorderable: true,
            resizable: true,
            isSampleReceived: true
        },

        {
            field: "assignmentDate",
            title: "Assignment Date",
            reorderable: true,
            resizable: true
        },
        {
            field: "Action",
            title: "Actions",
            cell: true,
            reorderable: true,
            resizable: true,
            isAction: true
        }
        // { command: { text: "Delete" }, title: "Actions", width: "140px",template: "<button class=''>My Edit</button>" }
    ],
    PendingTreatmentRequests: [
        {
            field: "requestDocumentNumber",
            title: "Request Document Number",
        },
        {
            field: "tradeType",
            title: "Trade Type",
        },
        {
            field: "sdDocumentNumber",
            title: "SD Number",
            icon: true
        },
        {
            field: "treatmentProvider",
            title: "Treatment Provider",
            icon: false
        },
        {
            field: "createdByRoleCode",
            title: "Initiator",
        },
        {
            field: "createdOn",
            title: "Requested on",
            icon: true
        },
        {
            field: "Actions",
            title: "Actions",
            cell: true,
            isAction: true
        }
    ],
    TpPendingTreatmentRequests: [
        {
            field: "requestDocumentNumber",
            title: "Request Document Number",
        },
        {
            field: "tradeType",
            title: "Trader Type",
        },
        {
            field: "tradeName",
            title: "Trader Name",
        },
        {
            field: "createdOn",
            title: "Requested on",
            icon: true
        },
        {
            field: "Actions",
            title: "Actions",
            cell: true,
            isAction: true
        }
    ],
    TpUnderProcessTreatmentRequests: [
        {
            field: "requestDocumentNumber",
            title: "Request Document Number",
        },
        {
            field: "tradeType",
            title: "Trader Type",
        },
        {
            field: "tradeName",
            title: "Trader Name",
        },
        {
            field: "createdOn",
            title: "Requested Accepted on",
            icon: true
        },
        {
            field: "Actions",
            title: "Actions",
            cell: true,
            isAction: true
        }
    ],
    ENPendingTreatmentRequests: [
        {
            field: "documentNumber",
            title: "Treatment Request Number",
        },
        {
            field: "tradeType",
            title: "Trade Type",
        },
        {
            field: "sdDocumentNumber",
            title: "SD Number",
            icon: true
        },
        {
            field: "treatmentProvider",
            title: "Treatment Provider",
            icon: false
        },
        {
            field: "createdByRoleCode",
            title: "Initiator",
        },
        {
            field: "createdOn",
            title: "Requested on",
            icon: true
        },
        {
            field: "Actions",
            title: "Actions",
            cell: true,
            isAction: true
        }
    ],
    TpRescindedTreatmentCertificate: [
        {
            field: "requestDocumentNumber",
            title: "Treatment Certificate Number",
        },
        {
            field: "traderType",
            title: "Trader Type",
        },
        {
            field: "trader",
            title: "Trader Name",
        },
        {
            field: "dateOfTreatment",
            title: "Issued On",
            icon: true
        },
        {
            field: "createdOn",
            title: "Regenerated On",
            icon: true
        },
        {
            field: "Actions",
            title: "Actions",
            cell: true,
            isAction: true
        }
    ],
    TpIssueTreatmentRequests: [
        {
            field: "documentNumber",
            title: "Treatment Certificate Number",
        },
        {
            field: "tradeType",
            title: "Trade Type",
        },
        {
            field: "trader",
            title: "Trader Name",
        },
        {
            field: "dateOfTreatment",
            title: "IssuedOn",
            icon: true
        },
        {
            field: "Actions",
            title: "Actions",
            cell: true,
            isAction: true
        }
    ],
    TreatmentUnderProcess: [
        {
            field: "requestDocumentNumber",
            title: "Request Document Number",
        },
        {
            field: "tradeType",
            title: "Trade Type",
        },
        {
            field: "sdDocumentNumber",
            title: "SD Number",
            icon: true
        },
        {
            field: "treatmentProvider",
            title: "Treatment Provider",
            icon: false
        },
        {
            field: "createdByRoleCode",
            title: "Initiator",
        },
        {
            field: "createdOn",
            title: "Requested on",
            icon: true
        },
        {
            field: "Actions",
            title: "Actions",
            cell: true,
            isAction: true
        }
    ],
    IssuedTreatmentCertificates: [
        {
            field: "documentNumber",
            title: "Treatment Certificate Number",
        },
        {
            field: "tradeType",
            title: "Trade Type",
        },
        {
            field: "sdDocumentNumber",
            title: "SD Number",
            icon: true
        },
        {
            field: "treatmentProvider",
            title: "Treatment Provider",
            icon: false
        },
        {
            field: "createdByRoleCode",
            title: "Initiator",
        },
        {
            field: "createdOn",
            title: "Issue Date",
            icon: true
        },
        {
            field: "Actions",
            title: "Actions",
            cell: true,
            isAction: true
        }
    ],
    RescindedTreatmentCertificates: [
        {
            field: "requestDocumentNumber",
            title: "Request Document Number",
        },
        {
            field: "tradeType",
            title: "Trade Type",
        },
        {
            field: "sdDocumentNumber",
            title: "SD Number",
            icon: true
        },
        {
            field: "treatmentProvider",
            title: "Treatment Provider",
        },
        {
            field: "createdByRoleCode",
            title: "Initiator",
        },
        {
            field: "createdOn",
            title: "Requested on",
            icon: true
        },
        {
            field: "Actions",
            title: "Actions",
            cell: true,
            isAction: true
        }
    ],
    initateRequestFormData: [
        {
            field: "hsCodePlusProductCode",
            title: "HS Code + Product Code"
        },
        {
            field: "declaredDescription",
            title: "Declared Description"
        },
        {
            field: "customContainerNumber",
            title: "Container Number"
        },
        {
            field: "quantity",
            title: "Quantity"
        },
        {
            field: "uomCode",
            title: "UOM"
        },
        {
            field: "Actions",
            title: "Actions",
            cell: true,
            isAction: true
        }
    ],
    treatmentHistoryData: [
        {
            field: "treatmentProvider",
            title: "Treatment Provider",
            width: 300
        },
        {
            field: "rejectionReason",
            title: "Rejection Reason"
        },
        {
            field: "rejectedOn",
            title: "Rejection On",
            width: 200
        },
    ]

};

export default GridColumns;
