const GridColumns = {
ListWorker: [
    {
        field: "isSelected",
        width: "50px",
        reorderable: true,
        resizable: true
    },
    {
        field: "id",
        title: "ID",
        editor: "string",
        width: "50px"
    },
    {
        field: "sourceID",
        title: "Source",
        editor: "string",
        width: "150px"
    },
    {
        field: "destinationID",
        title: "Destination",
        editor: "string",
        width: "150px"
    },
    {
        field: "methodID",
        title: "Method ID",
        editor: "string",
        width: "150px"
    },
    {
        field: "createdOn",
        title: "Created On",
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
]
};

export default GridColumns;