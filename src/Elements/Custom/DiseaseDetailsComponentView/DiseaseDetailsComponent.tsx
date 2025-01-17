import Column from "Elements/Basic/GridView/Columns/Column";
import GridEditView from "Elements/Basic/GridEditView/GridView";
import GridView from "Elements/Basic/GridView/GridView";
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
    console.log("diseaseDetails",diseaseDetails,setJsonData)
    
    const [data, setData] = useState<Array<DiseaseDetailsInterface> | null>(diseaseDetails!=null?JSON.parse(diseaseDetails).map((d:any) => {
        return { ...d, Date: new Date(d.Date) };
    }):[]);

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

   
    return (
        <div>
            <ViewPanel
                data={{}}
                labels={[]}>
                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col px-0">
                    <GridView
                        heading={"Disease Details"}
                        styleClass={{ minHeight: "10vh" }}
                        data={data}
                        dataItemKey={"ID"}
                        gridStyle="purpleGrid"
                       
                    >
                        <Column title={"Disease"} field={"Disease"}  minWidth={100} maxWidth={25}/>
                        <Column title={"Test"} field={"Test"} minWidth={100} maxWidth={25} />
                        <Column title={"Date"} field={"Date"} editor="date" format="{0:d}" minWidth={100} maxWidth={20} />
                        <Column title={"Result"} field={"Result"}  minWidth={100} maxWidth={25}/>
                    </GridView>
                </div>
            </ViewPanel>
        </div>
    );
}

export default React.memo(DiseaseDetailsComponent);
