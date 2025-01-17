import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Form, Field, FieldRenderProps } from '@progress/kendo-react-form';
import { Input } from '@progress/kendo-react-inputs';

import { guid } from '@progress/kendo-react-common';
import { UserRole } from "Modules/Common/Constants/Types/UserRole";
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import { GridCellProps } from '@progress/kendo-react-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { colors, consignmentModeType, treatmentRequestsStatus } from 'Modules/Common/CommonUtility';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
// import { sampleProducts } from './sample-products';
import Style from "../../../../../../Elements/Basic/ViewPanel/ViewPanel.module.scss";


const FORM_DATA_INDEX = 'formDataIndex';
const DATA_ITEM_KEY = 'commodityId';

const requiredValidator = (value: string) => {
  let regex = /^[a-zA-Z0-9]{1,11}$/;
  if (value?.length == 0) {
    return "";
  }
  if ((value?.length < 11) && (value?.length != 0)) {
    return "Invalid input. Only 11-digit numbers are allowed.";
  }
  if (!regex.test(value)) {
    return "Invalid input: special characters, spaces are not allowed."
  }
  if (value) {
    return ''
  }
}

const TextInputWithValidation = (fieldRenderProps: FieldRenderProps) => {
  const { validationMessage, visited, ...others } = fieldRenderProps;
  return (
    <div>
      <Input {...others} />
      {visited && validationMessage && <div role="alert" className="k-form-error k-text-start">{validationMessage}</div>}
    </div>
  );
};

const FormSubmitContext = React.createContext<(event: React.SyntheticEvent<any, Event>) => void>(() => undefined);
const GridEditContext = React.createContext<{
  onRowAction: (options: { rowIndex: number; operation: 'save' | 'remove' | 'add'; dataItem?: any }) => void;
  setEditIndex: (rowIndex: number | undefined) => void;
  editIndex: number | any;
}>({} as any);

const GridInlineFormRow = (props: { children: any; dataItem: any }) => {
  const { onRowAction, editIndex } = React.useContext(GridEditContext);
  const isInEdit = props.dataItem[FORM_DATA_INDEX] === editIndex;

  const onSubmit = React.useCallback((e) => {
    onRowAction({ rowIndex: editIndex!, operation: 'save', dataItem: e });
  }, [onRowAction, editIndex]);

  if (isInEdit) {
    return (<Form
      key={JSON.stringify(props.dataItem)}
      initialValues={props.dataItem}
      onSubmit={onSubmit}
      render={(formRenderProps) => {
        return (<FormSubmitContext.Provider value={formRenderProps.onSubmit}>{props.children}</FormSubmitContext.Provider>);
      }}
    />);
  }

  return props.children;
};

const NameCell = (props: any) => {
  const { editIndex } = React.useContext(GridEditContext);
  const isInEdit = props.dataItem[FORM_DATA_INDEX] === editIndex;
  // props?.data?.treatmentCertificate?.consignmentModeID
  return (
    <td>
      {isInEdit ? <Field maxlength={11} component={TextInputWithValidation} name={`${props.field}`} validator={requiredValidator} /> : props.dataItem[props.field || ''] || 'N/A' }
    </td>
  );
};

const CommandCell = (props: any) => {
  const onSubmit = React.useContext(FormSubmitContext);
  const { onRowAction, setEditIndex, editIndex } = React.useContext(GridEditContext);
  
  const rowIndex = props.dataItem[FORM_DATA_INDEX];
  const isInEdit = rowIndex === editIndex;

  const onRemoveClick = React.useCallback(
    (e) => {
      e.preventDefault();
      onRowAction({ rowIndex, operation: 'remove' });
    },
    [rowIndex, onRowAction]
  );

  const onSaveClick = React.useCallback(
    (e) => {
      e.preventDefault();
      onSubmit(e);
      const getDataSet: any = props?.dataState;
      if(getDataSet[editIndex].containerNumber == props?.dataItem?.containerNumber) { 
        setEditIndex(undefined);
      }
    },
    [onSubmit]
  );

  const onEditClick = React.useCallback(
    (e) => {
      e.preventDefault();
      setEditIndex(rowIndex);
    },
    [rowIndex, setEditIndex]
  );

  const onCancelClick = React.useCallback(
    (e) => {
      e.preventDefault();
      setEditIndex(undefined);
    },
    [setEditIndex]
  );

  return isInEdit ? (
    <td className="k-command-cell text-center">
      <FontAwesomeIcon onClick={onSaveClick} className="iconClass" color={colors.editActionButton} icon={faSave} />
    </td>
  ) : (
    <td className="k-command-cell text-center">
      <FontAwesomeIcon onClick={onEditClick} className="iconClass" color={colors.editActionButton} icon={faEdit} />
    </td>
  );
};

const rowRender = (row: any, props: any) => {
  return (<GridInlineFormRow dataItem={props.dataItem}>{row}</GridInlineFormRow>);
};

const ConsignmentDescription = (props: any) => {
  // Form data index is used as an alternative to ID for rows after data operations
  // treatmentRequestData
  const [dataState, setDataState] = React.useState<any>([]);
  const [editIndex, setEditIndex] = React.useState<number | undefined>(undefined);
  const  { setSingleSaveContainerNumber, treatmentRequestData } = props;
  React.useEffect(() => {
    let data = props?.data?.map((dataItem: any, idx: any) => ({ ...dataItem, [FORM_DATA_INDEX]: idx }));
    console.log('data: ', data);
    setDataState(data);
  }, [props.data])
  const onRowAction = React.useCallback(
    (options: { rowIndex: number; operation: 'save' | 'remove' | 'add'; dataItem?: any }) => {
      const newDataState = [...dataState];
      switch (options.operation) {
        case 'remove':
          newDataState.splice(options.rowIndex, 1);
          break;
        case 'save':
          let index = dataState.findIndex((product: any) => product.id === options.dataItem.id)
          newDataState[index] = options.dataItem;
          setSingleSaveContainerNumber(newDataState[index]);
          setEditIndex(undefined);
          break;
        case 'add':
          newDataState.unshift({ ProductName: '', [FORM_DATA_INDEX]: options.rowIndex, [DATA_ITEM_KEY]: guid() })
          setEditIndex(options.rowIndex);
          break;
        default:
      }
      setDataState(newDataState);
      const converted = newDataState.map((item: any) => ({
        id: parseInt(item.id),
        containerNumber: item.containerNumber
      }));
      props.setSaveCommodityContainerNumbers(converted);
    },
    [dataState]
  );

  const onAddClick = React.useCallback(() => {
    onRowAction({ rowIndex: dataState.length, operation: 'add' });
  }, [onRowAction, dataState]);

  return (
    <div className={`custom-grid border rounded ${Style.viewPanel}`}>
      <div
        className={
          "px-3 py-2 border-bottom font-semibold bg-light rounded-top " + Style.viewPanelHeading
        }>
        {'Commodity Information'}
      </div>
      <GridEditContext.Provider value={{ onRowAction, editIndex, setEditIndex }}>
        <Grid data={dataState} rowRender={rowRender}>
          <GridColumn field="hsCode" title="HS Code + Product Code" width={200} cell={(props: any) => {
                                    return (
                                        <td>
                                            {props?.dataItem?.hsCodeExt != null ? props?.dataItem?.hsCodeExt : 'N/A'}
                                        </td>
                                    )
                                }} />
          <GridColumn field="declaredDescription" title="Declared Description" />
          <GridColumn width={150} field="quantity" title="Quantity" />
          <GridColumn width={100} field="uomCode" title="UOM" />
          <GridColumn width={180} field="containerNumber" cell={(props:any)=><NameCell data={treatmentRequestData} {...props} />} title="Container Number" />
          {props.isRescind &&
            <GridColumn width={150} title="Action" cell={(props: any)=> <CommandCell dataState={dataState} {...props} />} />}
          {props.roleCode == UserRole.TreatmentProvider && props?.treatmentRequestStatusID == treatmentRequestsStatus.ACCEPTED &&
            <GridColumn width={150} title="Action" cell={(props: any)=> <CommandCell dataState={dataState} {...props} />} />}

        </Grid>
      </GridEditContext.Provider>
    </div>
  );
};

export default ConsignmentDescription;

