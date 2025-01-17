const GridColumns = {

    TraderBusinessList: [
        {
            field: "tradeTypeName",
            title: "Trade Type",
            editor: "string",
            width: -10,
        },
        {
            field: "userSubTypeName",
            title: "User Sub Type",
            editor: "string",
            width: -10,
        },
        {
            field: "sdTypeName",
            title: "SD Type",
            editor: "string",
            width: -10,
        },
        {
            field: "businessName",
            title: "Business Name",
            editor: "string",
            width: "200px",
        },
        {
            field: "businessAddressName",
            title: "Business Address",
            editor: "string",
            width: 100,
        },
        {
            field: "Action",
            title: "Actions",
            cell: true,
            width: -120,
            reorderable: true,
            resizable: true
        }
    ],

    CustomAgentList: [
        {
            field: "caTraderName",
            title: "Trade",
            editor: "string",
            width: "200px",
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
    
    ChildUserList: [
        {
            field: "userName",
            title: "Username",
            editor: "string",
            width: "200px",
        },
        {
            field: "fullName",
            title: "Name",
            editor: "string",
            width: "200px",
        },
        
        {
            field: "cnic",
            title: "CNIC Number",
            editor: "string",
            width: "200px",
        },
        {
            field: "email",
            title: "Email",
            editor: "string",
            width: "200px",
        },
        {
            field: "status",
            title: "Status",
            editor: "string",
            width: "200px",
        },
        {
            field: "Action",
            title: "Actions",
            isAction: true,
            width: "",
            reorderable: true,
            resizable: true
        },
        {
            field: "ActivateDeactivate",
            title: "Activate / Deactivate",
            isActivateDeactivate: true,
            width: "",
            reorderable: true,
            resizable: true
        },
    ],

    BankAccountForRebate: [
        {
            field: "BankName",
            title: "Bank",
            isActivateDeactivate: true,
            reorderable: true,
            resizable: true
        },
        {
            field: "IBAN",
            title: "IBAN Number",
            isActivateDeactivate: true,
            reorderable: true,
            resizable: true
        },
        {
            field: "AccountNumber",
            title: "Account No",
            isActivateDeactivate: true,
            reorderable: true,
            resizable: true
        },
        {
            field: "Active",
            title: "Status",
            isActivateDeactivate: true,
            width: "300vw",
            reorderable: true,
            resizable: true
        },{
            field: "ActionCell",
            title: "Action",
            isActivateDeactivate: true,
            cell: true,
            width: "150vw",
            reorderable: true,
            resizable: true
        }
    ],
    
    UpdateProfileHistory: [
        {
            field: "BillDocumentNumber",
            title: "Payment Slip ID",
            isActivateDeactivate: true,
            reorderable: true,
            resizable: true
        },
        {
            field: "Detail",
            title: "Detail",
            isActivateDeactivate: true,
            reorderable: true,
            resizable: true
        },
        {
            field: "Status",
            title: "Status",
            isActivateDeactivate: true,
            reorderable: true,
            resizable: true
        },
        {
            field: "Date",
            title: "Date Time",
            isActivateDeactivate: true,
            reorderable: true,
            resizable: true
        },
    ]
}

export default GridColumns;