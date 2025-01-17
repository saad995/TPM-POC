import React from "react";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClone, faEdit, faEye, faPrint, faTrash, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

import styles from "./CammandCell.module.scss";
import ImportSVG from "Lib/Helpers/CustomSVGImporter";

interface ICellProps {
    onEdit?: any;
    onView?: any;
    onDelete?: any;
    onPrint?: any;
    onClone?: any;
    dataItem?: any;
}

const CammandCell = (cellProps: ICellProps) => {
    const { onEdit, onView, onDelete, onPrint, onClone, dataItem } = cellProps;
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
    const onClickPrint = () => {
        onPrint(dataItem);
    };

    const onClickClone = () => {
        onClone(dataItem);
    };

    return (
        <td className="grid-column pl-4">
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
                    </a>
                )}
                {onView && (
                    <a
                        style={{
                            paddingRight: "5px",
                            cursor: "pointer",
                            fontSize: "1rem"
                        }}
                        className="mr-2"
                        onClick={onClickView}>
                        {/* <FontAwesomeIcon icon={faExternalLinkAlt} title={"View"} /> */}
                        <ImportSVG name="view" color="#009a5e" size={14} />
                    </a>
                )}
                {onClone && (
                    <a
                        style={{
                            paddingRight: "5px",
                            paddingLeft: "5px",
                            cursor: "pointer",
                            fontSize: "1rem"
                        }}
                        className="mr-2"
                        onClick={onClickClone}>
                        <FontAwesomeIcon icon={faClone} title={"Clone"} />
                    </a>
                )}
                {onPrint && (
                    <a
                        style={{
                            paddingRight: "5px",
                            paddingLeft: "5px",
                            cursor: "pointer",
                            fontSize: "1rem"
                        }}
                        className="mr-2"
                        onClick={onClickPrint}>
                        <FontAwesomeIcon icon={faPrint} title={"Print"} />
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
                    </a>
                )}
            </span>
        </td>
    );
};

export default CammandCell;
