import Column from "Elements/Basic/GridEditView/Columns/Column";
import GridEditView from "Elements/Basic/GridEditView/GridView";
import ViewPanel from "Elements/Basic/ViewPanel/ViewPanel";
import _ from "lodash";
import React, { useEffect, useState } from "react";

interface DiseaseDetailsInterface {
    ID: number;
    Disease: string;
    Test: string;
    Date: Date;
    Result: string;
    inEdit?: string;
    isNew?: string;
}

interface Iprops {
    diseaseDetails: string;
    setJsonData?: any;
}

//TODO clean data when submitting, remove inEdit and isNewItem , convert dateback to string

function DiseaseDetailsComponent(props: Iprops) {
    const { diseaseDetails, setJsonData } = props;
    const [data, setData] = useState<Array<DiseaseDetailsInterface> | null>(null);

    useEffect(() => {
        // Filter data and covert string to date
        if (diseaseDetails) {
            try {
                let obj: DiseaseDetailsInterface[] = JSON.parse(diseaseDetails);
                obj = obj.map((d) => {
                    return { ...d, Date: new Date(d.Date) };
                });
                setData(obj);
            } catch (error) {
                
            }
        }
    }, [diseaseDetails]);

    useEffect(() => {
        // Remove Kendo Edit Grid Properties
        if (setJsonData) {
            const filterData = data?.map((d) => {
                if ("inEdit" in d) {
                    delete d.inEdit;
                }
                if ("isNew" in d) {
                    delete d.isNew;
                }

                return d;
            });
            // 
            if (filterData) {
                setJsonData(JSON.stringify(filterData));
            }
        }
        // setJsonData(JSON.stringify(data));
    }, [data]);

    return (
        <div>
            <ViewPanel
                data={{}}
                // ClassName={styles.exportCertificatePanels + " d-flex flex-column " + styles.containerInfo}
                // heading={"Disease GridView"}
                labels={[]}>
                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col px-0">
                    <GridEditView
                        // heading={resources_EN.release_Order_ConsignmentDescription}
                        heading={"Disease Details"}
                        styleClass={{ minHeight: "40vh" }}
                        data={data}
                        setData={setData}
                        dataItemKey={"ID"}
                        gridStyle="purpleGrid"
                        requiredFields={["Disease"]}
                        defaultNewItem={{ Date: new Date() }}
                        // className={"shadow-sm h-100 purpleGrid " + styles.gridNoScroller}
                        // dataItemKey={"releaseOrderId"}
                        // properties={GridColumns.ConsignmentDescription}
                        // onRowClick={enterEdit}
                        //onPageChange={handlePageChange}
                        //onSortChange={handleSortChange}
                        // sort={sort}
                        //sortable
                        // skipColumn={Config.grid.skip}
                        // size={props.size}
                    >
                        {/* data={gridData} scrollable onRowClick={enterEdit}> */}
                        {/* <Column title={"Id"} field={"ID"} minWidth={100} maxWidth={10} /> */}
                        <Column title={"Disease"} field={"Disease"} />
                        <Column title={"Test"} field={"Test"} />
                        <Column title={"Date"} field={"Date"} editor="date" format="{0:d}" />
                        <Column title={"Result"} field={"Result"} />
                    </GridEditView>
                </div>
            </ViewPanel>
        </div>
    );
}

export default React.memo(DiseaseDetailsComponent);
