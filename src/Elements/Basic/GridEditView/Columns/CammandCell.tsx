import React from "react";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClone, faEdit, faEye, faPrint, faTrash, faExternalLinkAlt, faPlus, faCheck, faCross, faRemoveFormat, faTimes } from "@fortawesome/free-solid-svg-icons";

import styles from "./CammandCell.module.scss";
import ImportSVG from "Lib/Helpers/CustomSVGImporter";

interface ICellProps {
    onEdit?: any;
    onView?: any;
    onDelete?: any;
    onPrint?: any;
    onClone?: any;
    onAdd?: any;
    onDiscard?: any;
    onCancel?: any;
    onUpdate?: any;
    dataItem?: any;
    dataItemKey: any;
    editField: any;
}

const CammandCell = (cellProps: ICellProps) => {
    const { onEdit, onView, onDelete, onPrint, onClone, dataItem ,dataItemKey ,onAdd , onDiscard , onCancel, onUpdate, editField} = cellProps;
    const isNewItem = dataItem.isNew;
    const inEdit = dataItem[editField];

    const onClickEdit = () => {
        onEdit(dataItem);
    };
    const onClickView = () => {
        onView(dataItem);
    };
    const onClickDelete = () => {
        swal({
            title: "Delete Alert!",
            text: "Are you sure you want to delete this Record?",
            icon: "warning",
            buttons: ["No", "Yes"],
            dangerMode: true
        }).then((willDelete: any) => {
            if (willDelete) {
                onDelete(dataItem);
            }
        });
    };
    const onClickDiscard = () => {
        onDiscard(dataItem);
    };

    const onClickUpdate = () => {
        onUpdate(dataItem);
    };


    const onClickCancel = () => {
        onCancel(dataItem);
    };

    const onClickAdd = () => {
        onAdd(dataItem);
    };

    return  inEdit ? (
        <td className="grid-column pl-4">
            <span className={"text-muted d-flex"}>
                {onEdit && isNewItem && (
                    <a
                        style={{
                            paddingLeft: "5px",
                            paddingRight: "5px",
                            cursor: "pointer",
                            fontSize: "1rem"
                        }}
                        className="mr-2"
                        onClick={onClickUpdate}>
                        <FontAwesomeIcon icon={faPlus} title={"Add"} />
                        {/* Add */}
                    </a>
                )}
                {(onAdd && !isNewItem) && (
                    <a
                        style={{
                            paddingLeft: "5px",
                            paddingRight: "5px",
                            cursor: "pointer",
                            fontSize: "1rem"
                        }}
                        className="mr-2"
                        onClick={onClickUpdate}>
                        <FontAwesomeIcon icon={faCheck} title={"Update"} />
                        {/* Update */}
                    </a>
                )}
                {onDiscard && isNewItem && (
                    <a
                        style={{
                            paddingLeft: "5px",
                            color: "red",
                            cursor: "pointer",
                            fontSize: "1rem"
                        }}
                        className="mr-2"
                        onClick={onClickDiscard}>
                        <FontAwesomeIcon icon={faTimes} title={"Discard"} />
                        {/* discard */}
                    </a>
                )}
                {onCancel && !isNewItem && (
                    <a
                        style={{
                            paddingLeft: "5px",
                            color: "red",
                            cursor: "pointer",
                            fontSize: "1rem"
                        }}
                        className="mr-2"
                        onClick={onClickCancel}>
                        <FontAwesomeIcon icon={faTimes} title={"Cancel"} />
                        {/* cancel */}
                    </a>
                )}
            </span>
        </td>
    ):   <td className="grid-column pl-4">
    <span className={"text-muted d-flex"}>
        {onEdit && (
            <a
                style={{
                    paddingLeft: "5px",
                    paddingRight: "5px",
                    cursor: "pointer",
                    fontSize: "1rem"
                }}
                className="mr-2"
                onClick={onClickEdit}>
                <FontAwesomeIcon icon={faEdit} title={"Edit"} />
                {/* Edit */}
            </a>
        )}
        {onDelete && (
            <a
                style={{
                    paddingLeft: "5px",
                    color: "red",
                    cursor: "pointer",
                    fontSize: "1rem"
                }}
                className="mr-2"
                onClick={onClickDelete}>
                <FontAwesomeIcon icon={faTrash} title={"Delete"} />
                {/* Delete */}
            </a>
        )}
    </span>
</td>;
};

export default CammandCell;
