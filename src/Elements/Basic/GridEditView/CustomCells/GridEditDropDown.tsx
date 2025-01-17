import * as React from "react";
import {
  DropDownList,
  DropDownListChangeEvent,
} from "@progress/kendo-react-dropdowns";
import { GridCellProps } from "@progress/kendo-react-grid";

interface CustomGridCellProps extends GridCellProps{
  dropDownData?: any;
  defaultItemIndex?: number;
}
export const GridEditDropDown = (props: CustomGridCellProps) => {

  const handleChange = (e: DropDownListChangeEvent) => {
    if (props.onChange) {
      props.onChange({
        dataIndex: 0,
        dataItem: props.dataItem,
        field: props.field,
        syntheticEvent: e.syntheticEvent,
        value: e.target.value.value,
      });
    }
  };

  const { dataItem } = props;
  const field = props.field || "";
  const dataValue = dataItem[field] === null ? "" : dataItem[field];

  return (
    <td>
      {dataItem.inEdit ? (
        <DropDownList
          // style={{ width: "100px" }}
          onChange={handleChange}
          value={props?.dropDownData.find((c:any) => c.value === dataValue)}
          data={props?.dropDownData}
          defaultValue={props?.dropDownData[props.defaultItemIndex? props.defaultItemIndex :0]}
          textField="text"
        />
      ) : (
        dataValue?.toString()
      )}
    </td>
  );
};
