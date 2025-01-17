import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { MyCommandCell } from "Elements/Basic/GridEditView/CommandCell";
import GridView from 'Elements/Basic/GridView/GridView';
import ViewPanel from 'Elements/Basic/ViewPanel/ViewPanel'
import GridColumns from 'Modules/TPM/Constants/GridColumns';
import { TreatmentCertificationCode } from 'Modules/TPM/Constants/Interfaces';
import React, { useState } from 'react'
import './InitiateTreatmentRequestTableView.scss';

function InitiateTreatmentRequestTableView(props: any) {
    const { data, onHandleDelete } = props;
    return (
        <Grid
            data={data}
        >
            {
                GridColumns.initateRequestFormData.map((column: any) => (
                    !column.isAction ? <GridColumn field={column.field} title={column.title} /> : <GridColumn
                        // className="text-center"
                        field="Action"
                        cell={(props) => <MyCommandCell
                            {...props}
                            isDelete={true}
                            delete={onHandleDelete}
                            customClassName='text-center'
                            edit={() => console.log('delete')}
                        />
                        }
                    />
                ))
            }
        </Grid>
    )
}

export default React.memo(InitiateTreatmentRequestTableView);
