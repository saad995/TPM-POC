const GridColumns = {
    // LMS GridColumns
    // LabTest: [
    //     {
    //         title: "ID",
    //         field: "Id",
    //         className: "grid-column",
    //         headerClassName: "grid-column",
    //         minWidth: "200px"
    //     },
    //     {
    //         title: "Test Name",
    //         field: "testName",
    //         className: "grid-column",
    //         headerClassName: "grid-column",
    //         minWidth: "200px"
    //     },
    //     {
    //         title: "Add Price",
    //         field: "fees",
    //         className: "grid-column",
    //         headerClassName: "grid-column",
    //         minWidth: "300px"
    //     },
    //     {
    //         title: "Active",
    //         field: "isActive",
    //         className: "grid-column",
    //         headerClassName: "grid-column",
    //         minWidth: "300px"
    //     },
    //     {
    //         field: "ActionCell",
    //         title: "Action",
    //         cell: true,
    //         className: "grid-column",
    //         headerClassName: "grid-column",
    //         minWidth: "200px"
    //     }
    // ],

    LabTest: [
        {
            title: "Test Name",
            field: "testName",
            editable: false
        },
        {
            title: "Test Fee (PKR)",
            field: "fees",
            editable: true,
            editor: "numeric"
        },
        {
            title: "Active",
            field: "isActive",
            editable: true,
            editor: "boolean",
            isActive: true
        },
        {
            title: "Action",
            isSave: true,
            editable: false
        }
    ]
};

export default GridColumns;
