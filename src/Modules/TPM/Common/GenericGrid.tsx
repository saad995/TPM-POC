import GridView from "Elements/Basic/GridView/GridView";
import { useSelector } from "react-redux";
import { RootStore } from "Store";
import { resources_EN } from "Modules/TPM/Constants/Resources/Resources_EN";
import Column from "Elements/Basic/GridView/Columns/Column";
import { Role } from "Lib/Types/SharedTypes";
import { AgeCustomCell } from "Modules/TPM/Constants/Helpers/AgeCustomCell";

const GenericIPGrid = (props: any) => {
  //  console.log("props", props);
    const {searchableColumnsProps} = props;
    const userRole = useSelector((state: RootStore) =>
        state.dashboardReducer.currentUserRole != undefined
            ? state.dashboardReducer.currentUserRole.Code
            : state.dashboardReducer.dashboardInfo.currentRole
    );
let searchableColumns = [];

if(searchableColumnsProps){
    searchableColumns = searchableColumnsProps;
};

    if(props == null || typeof(props) == 'undefined'){
        return null;
    }else{
        const {columns, wrapperFunction} = props;
        return (
            <GridView
                heading={props?.headerTitle}
                skipColumn={0}
                takeColumn={15}
                data={props?.data ? props?.data : []}
                gridPanel={props?.gridPanel}
                onRowClick={props?.OnRowClick}
                isSearchEnabled={true}
                searchableColumns={searchableColumns}
                pageable={true}
                reorderable={true}
                resizable={true}
                sortable={true}
                style={{ height: "70vh" }}
                expandField="expanded"
                onExpandChange={props?.onExpandChange}
                detail={props?.detail}
                >
    
                {columns && Object.keys(columns).map((columnKey:any,index:number)=>{
                const {field, title, minWidth, maxWidth, cell } = columns[columnKey];
                    return (
                        <Column
                        key={index}
                        title={title}
                        field={field}
                        minWidth={minWidth}
                        maxWidth={maxWidth}
                       // cell={(title == "Action" && userRole !== Role.Officer && userRole !== Role.IPOfficer) ? wrapperFunction : title == "Age" && userRole !== Role.Trader && AgeCustomCell }
                       cell={cell ? wrapperFunction : null} 
                       sort={true}
                        reorderable={true}
                        resizable={true}
                        filterable={true}
                    />
                    )
                })}
            </GridView>
        );
    }

};

export default GenericIPGrid;