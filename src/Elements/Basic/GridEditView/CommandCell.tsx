import { faEdit, faFileDownload, faFilePdf, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field } from "@progress/kendo-react-form";
import inputFieldWithEdit from "Elements/Custom/InputTextComponent/InputTextComponent";
import * as React from "react";
import TextField from "../TextField/TextField";
import { Input } from "@progress/kendo-react-inputs";
import { colors } from "Modules/Common/CommonUtility";
import './CommandCell.scss';
// Comment: MyCommandCell this function is re-useable for edit,delete. 
export const MyCommandCell = (props: any) => {
  const { dataItem , isDelete, isPdfDownload } = props;
  console.log('checking: ',dataItem)
  const inEdit = dataItem[props.editField];
  const isNewItem = dataItem.isNew;
  // console.log('jun dataItem key22',props.dataItem[props.dataItemKey])
  return inEdit ? (<> 
    <td className="d-flex justify-content-around align-items-center">
      <Input
        name="username"
        style={{
          height: 20,
        }}
        defaultValue={dataItem.containerNumber}
      />
        <FontAwesomeIcon onClick={() => props.update(dataItem)} className="iconClass" icon={faSave} title={"Save"} />
    </td>
      </>
  ) : isDelete ? (
    <td className={`${props.customClassName}`}>
        <FontAwesomeIcon onClick={() => props.delete(dataItem)} className="iconClass text-danger" icon={faTrash} title={"Delete"} />
    </td>
  ) : isPdfDownload ? (
    <td className={`${props.customClassName}`}>
        <FontAwesomeIcon onClick={() => props.download(dataItem)} color={colors.editActionButton} className="iconClass text-success" icon={faFilePdf} title={"download"} />
    </td>
  ) : (
    <td className={`${props.customClassName}`}>
      <p>{dataItem.containerNumber}</p>
        <FontAwesomeIcon onClick={() => props.edit(dataItem)} className="iconClass" color={colors.editActionButton} icon={faEdit} />
    </td>
  );
};
