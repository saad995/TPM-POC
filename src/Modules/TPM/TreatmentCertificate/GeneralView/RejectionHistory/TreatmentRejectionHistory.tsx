import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { MyCommandCell } from "Elements/Basic/GridEditView/CommandCell";
import GridView from 'Elements/Basic/GridView/GridView';
import ViewPanel from 'Elements/Basic/ViewPanel/ViewPanel'
import GridColumns from 'Modules/TPM/Constants/GridColumns';
import { TreatmentCertificationCode } from 'Modules/TPM/Constants/Interfaces';
import React, { useState } from 'react'
// import './InitiateTreatmentRequestTableView.scss';
import Style from "../../../../../Elements/Basic/ViewPanel/ViewPanel.module.scss";


function TreatmentRejectionHistory(props: any) {
    const { data } = props;
    return (
        <div className={`custom-grid border rounded ${Style.viewPanel}`}>
      <div
        className={
          "px-3 py-2 border-bottom font-semibold bg-light rounded-top " + Style.viewPanelHeading
        }>
        { props?.heading}
      </div>
        <GridView
            data={data}
            style={{ height: "30vh" }}
        >
            {
                GridColumns.treatmentHistoryData.map((column: any) => (
                    <GridColumn width={column?.width} field={column.field} title={column.title} />
                ))
            }
        </GridView>
        </div>
    )
}

export default React.memo(TreatmentRejectionHistory);
