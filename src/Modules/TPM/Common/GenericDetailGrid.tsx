import GridView from "Elements/Basic/GridView/GridView";
import { useSelector } from "react-redux";
import { RootStore } from "Store";
import { resources_EN } from "Modules/TPM/Constants/Resources/Resources_EN";
import Column from "Elements/Basic/GridView/Columns/Column";
import { Role } from "Lib/Types/SharedTypes";
import { AgeCustomCell } from "Modules/TPM/Constants/Helpers/AgeCustomCell";
import { Button } from "@progress/kendo-react-buttons";
import ImportSVG from "Lib/Helpers/CustomSVGImporter";
import { useState } from "react";

const GenericDetailGrid = (props: any) => {
    const { searchableColumnsProps,detailWrapperFunction, listData, columns, dataItem} = props;
    const {registeredTreatmentTypes} = dataItem;
    let data:any = registeredTreatmentTypes;

    const userRole = useSelector((state: RootStore) =>
        state.dashboardReducer.currentUserRole != undefined
            ? state.dashboardReducer.currentUserRole.Code
            : state.dashboardReducer.dashboardInfo.currentRole
    );
    let searchableColumns = [];

    if (searchableColumnsProps) {
        searchableColumns = searchableColumnsProps;
    };

    function myFunc(total:any, num:any){
        let _total = total?.maxWidth ? total?.maxWidth : total;
        let _num = num?.maxWidth;
        return _total + _num;

    }

    let width:any = columns?.reduce(myFunc);

    if (props == null || typeof props == "undefined") {
        return null;
    } else {
        if (listData?.length > 0) {
            let providerData:any = listData.find((x: any) => x?.id == dataItem?.id)
            let detailItemList = []

            if(providerData){
                detailItemList = providerData.registeredTreatmentTypes.map((item:any, index:number)=>{
                   // let treatmentProviderId = providerData['id'];
                    return {...item, sno: index + 1}
                });
            };

            if(detailItemList.length>0){
                let widthInPercent = String(width) + '%';
                return (
                    <GridView data={detailItemList} style={{width: widthInPercent}}>
                        {columns.map((item: any, index: number) => {
                            return (
                                <Column
                                   key={index}
                                    {...item}
                                    cell={
                                        item.cell ? (event:any)=> {
                                            return detailWrapperFunction({...event, providerData})
                                        } : null
                                    }
                                />
                            );
                        })}
                    </GridView>
                );
            }else{
                return <div className="text-center text-mutted">No detail found</div>
            }
        }
        return (
            <div style={{ height: "50px", width: "100%" }}>
                <div style={{ position: "absolute", width: "100%" }}>
                    <div className="k-loading-image" />
                </div>
            </div>
        );

        // if(data && data?.length > 0) {
        //     return (
        //         <GridView
        //             // heading={props?.headerTitle}
        //             // skipColumn={0}
        //             // takeColumn={15}
        //             data={data?.length > 0 ? data : []}
        //             // gridPanel={props?.gridPanel}
        //             // onRowClick={props?.OnRowClick}
        //             // isSearchEnabled={true}
        //             // searchableColumns={searchableColumns}
        //             // pageable={true}
        //             // reorderable={true}
        //             // resizable={true}
        //             // sortable={true}
        //             // style={{ height: "70vh" }}
        //             // expandField="expanded"
        //             // onExpandChange={props?.onExpandChange}
        //             // detail={props?.detail}
                    
        //             >
        //             <Column
        //                 title={resources_EN.TPM_Grid_Detail_ColumnName_Treatment_Type_Title}
        //                 field={resources_EN.TPM_Grid_Detail_ColumnName_Treatment_Type_Field}
        //                 minWidth={25}
        //                 maxWidth={25}
        //                 sort={true}
        //                 reorderable={true}
        //                 resizable={true}
        //             />
    
        //                 {/* {columns && Object.keys(columns).map((columnKey: any) => {
        //                 const { field, title, minWidth, maxWidth } = columns[columnKey];
        //                 return (
        //                     <Column
        //                         title={title}
        //                         field={field}
        //                         minWidth={minWidth}
        //                         maxWidth={maxWidth}
        //                         cell={
        //                             title == "Action" && userRole !== Role.Officer && userRole !== Role.IPOfficer
        //                                 ? wrapperFunction
        //                                 : title == "Age" && userRole !== Role.Trader && AgeCustomCell
        //                         }
        //                         sort={true}
        //                         reorderable={true}
        //                         resizable={true}
        //                     />
        //                 );
        //             })} */}
                    
        //         </GridView>
        //     );
        // } else {
        //     return <div className="text-center text-mutted">No detail found</div>
        // }
        return <div className="text-center text-mutted">No detail found</div>

    }
};

export default GenericDetailGrid;
