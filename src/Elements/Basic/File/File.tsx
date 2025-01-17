import { faFileExcel, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Kendo UI
import { Field } from "@progress/kendo-react-form";
import DailogComponent from "Elements/Basic/Dailog/DailogComponent";
import { deleteDocumentAction, DownloadDocumentAction } from "Elements/Basic/File/FileAction";
// Types
import { IFile, IFileDownloadRequest } from "Elements/Basic/File/FileTypes";
import { FormUpload } from "Elements/Basic/FormComponent/FormComponent";
import ImportSVG from "Lib/Helpers/CustomSVGImporter";
import _ from "lodash";
import ApiURL from "Modules/Common/Constants/ApiURLs";
import Methods from "Modules/Common/Constants/MethodIDs";
import { useEffect, useState } from "react";
// React Bootstrap
import { Button, Col, Container, Row, RowProps } from "react-bootstrap";
// Hooks
import { useDispatch, useSelector } from "react-redux";
import { SRLWrapper } from "simple-react-lightbox";
import { RootStore } from "Store";
//SCSS
import styles from "./File.module.scss";
import { resources_EN } from "Modules/TPM/Constants/Resources_EN";


interface IProps {
    onDelete?: any;
    onFileUpload?: any;
    isPreview?: boolean;
    extensionAllowed?: string[];
    hint?: string;
    labelClass?: string;
    label?: string;
    onAdd?: any;
    batch?: boolean;
    restrictions?: any;
    disabled?: boolean;
    previewFiles?: IFile[];
    thumbnailRows?: RowProps;
}

function getRowSizeProps(rowConfig: RowProps | undefined) {
    return {
        xs: rowConfig ? rowConfig.xs : '1',
        sm: rowConfig ? rowConfig.sm : '2',
        md: rowConfig ? rowConfig.md : '3',
        lg: rowConfig ? rowConfig.lg : '4'
    }
}

const FileUploader = (props: IProps) => {
    const {
        onDelete,
        onFileUpload,
        isPreview,
        labelClass,
        hint,
        label,
        onAdd,
        batch,
        restrictions,
        disabled,
        previewFiles,
        thumbnailRows
    } = props;

    // Hooks
    const dispatch = useDispatch();
    const [identification, setIdentification] = useState("");
    const [isVisible, setVisibleDialog] = useState(false);
    const [isConfirm, setConfirmation] = useState(false);
    const [message, setMessage] = useState("");

    const newFiles: IFile[] = useSelector((state: RootStore) => state.fileReducer.newFiles);

    const oldFiles: IFile[] = useSelector((state: RootStore) => state.fileReducer.oldFiles);

    // Variables
    const uploadedFiles: IFile[] = !_.isNil(previewFiles) ? previewFiles : [...newFiles, ...oldFiles];

    const handleDeleteFile = (identification?: string) => {
        if (identification) {
            setMessage("Are you sure you want to delete this file?");
            setIdentification(identification);
            setVisibleDialog(true);
        }
    };

    const getFileURL = (fileId: string) => {
        if (fileId) {
            const url: string = `${ApiURL.FSS_READ}/${Methods.READ_FILE}?fileId=${fileId}`;
            return url;
        }
    };

    const getFile = async (fileId: string, fileName: string) => {
        if (fileId) {
            const downloadData: IFileDownloadRequest = {
                id: `${fileId}`,
                fileName: fileName
            };
            dispatch(DownloadDocumentAction(downloadData));
        }
    };

    useEffect(() => {
        if (isConfirm) {
            dispatch(deleteDocumentAction(identification));
            setConfirmation(false);
            onDelete(identification);
        }
    }, [isConfirm]);

    return (
        <>
            <Container fluid>
                <DailogComponent
                    id="dialog-cancel"
                    confirm={setConfirmation}
                    isVisible={isVisible}
                    closeDailog={setVisibleDialog}
                    message={message}
                />

                <fieldset>
                    <Row>
                        <Col xs="12">
                            <Row>
                                <Col>
                                    <Field
                                        id={"documents"}
                                        name={"documents"}
                                        label={label ?? "Select File"}
                                        hint={resources_EN.file_hint}
                                        labelClass={labelClass}
                                        component={FormUpload}
                                        restrictions={
                                            restrictions ?? {
                                                allowedExtensions: [".jpeg", ".jpg", ".png", ".pdf"],
                                                maxFileSize: resources_EN.file_size
                                            }
                                        }
                                        batch={batch ?? false}
                                        onAdd={onAdd}
                                        disabled={disabled}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        {isPreview ? (
                            <Col>
                                {uploadedFiles?.length > 0 ? (
                                    <>
                                        <div className="mt-3" style={{ width: "100%" }}>
                                            <SRLWrapper>
                                                <Col className="p-0">
                                                    <div className="bg-secondary p-4 rounded shadown-sm">
                                                        <Row {...getRowSizeProps(thumbnailRows)}>
                                                            {uploadedFiles?.map((document: IFile, index: number) => {
                                                                return (
                                                                    <Col>
                                                                        {document.documentName.includes("pdf") ? (
                                                                            <div
                                                                                className={`${styles.imgThumbnail} mt-2 rounded`}>
                                                                                <span className="close-icon p-1">
                                                                                    <a
                                                                                        className={`k-icon k-i-close`}
                                                                                        title={"Delete"}
                                                                                        onClick={(e) => {
                                                                                            handleDeleteFile(
                                                                                                document.fileNestFileIds
                                                                                            );
                                                                                        }}></a>
                                                                                </span>
                                                                                <Button
                                                                                    onClick={() =>
                                                                                        getFile(
                                                                                            document.fileNestFileIds,
                                                                                            document.documentName
                                                                                        )
                                                                                    }
                                                                                    style={{
                                                                                        maxWidth: "100%",
                                                                                        height: "150px"
                                                                                    }}>
                                                                                    <FontAwesomeIcon
                                                                                        icon={faFilePdf}
                                                                                        title={document.docTypeName}
                                                                                        size={"8x"}
                                                                                    />
                                                                                </Button>
                                                                                <span className="description-container p-2">
                                                                                    <p className="description">
                                                                                        {document.docTypeName}
                                                                                    </p>
                                                                                </span>
                                                                            </div>
                                                                        ) : document.documentName.includes("xlsx") ? (
                                                                            <div
                                                                                className={`${styles.imgThumbnail} mt-2 rounded`}>
                                                                                <span className="close-icon p-1">
                                                                                    <a
                                                                                        className={`k-icon k-i-close`}
                                                                                        title={"Delete"}
                                                                                        onClick={(e) => {
                                                                                            handleDeleteFile(
                                                                                                document.fileNestFileIds
                                                                                            );
                                                                                        }}></a>
                                                                                </span>
                                                                                <Button
                                                                                    onClick={() =>
                                                                                        getFile(
                                                                                            document.fileNestFileIds,
                                                                                            document.documentName
                                                                                        )
                                                                                    }
                                                                                    style={{
                                                                                        maxWidth: "100%",
                                                                                        height: "150px"
                                                                                    }}>
                                                                                    <FontAwesomeIcon
                                                                                        icon={faFileExcel}
                                                                                        title={document.docTypeName}
                                                                                        size={"8x"}
                                                                                    />
                                                                                </Button>
                                                                                <span className="description-container p-2">
                                                                                    <p className="description">
                                                                                        {document.documentName}
                                                                                    </p>
                                                                                </span>
                                                                            </div>
                                                                        ) : (
                                                                            <div
                                                                                className={`${styles.imgThumbnail} mt-2 rounded`}>
                                                                                <span className="close-icon p-1">
                                                                                    <a
                                                                                        className={`k-icon k-i-close`}
                                                                                        title={"Delete"}
                                                                                        onClick={(e) => {
                                                                                            handleDeleteFile(
                                                                                                document.fileNestFileIds
                                                                                            );
                                                                                        }}></a>
                                                                                </span>
                                                                                <a
                                                                                    href={getFileURL(
                                                                                        document.fileNestFileIds
                                                                                    )}
                                                                                    className="element_with_overlay rounded">
                                                                                    <img
                                                                                        className="image rounded"
                                                                                        src={getFileURL(
                                                                                            document.fileNestFileIds
                                                                                        )}
                                                                                        alt={document.docTypeName}
                                                                                    />
                                                                                </a>

                                                                                <span className="description-container rounded-bottom p-2">
                                                                                    <p className="description">
                                                                                        {document.docTypeName}
                                                                                    </p>
                                                                                </span>
                                                                            </div>
                                                                        )}
                                                                    </Col>
                                                                );
                                                            })}
                                                        </Row>
                                                    </div>
                                                </Col>
                                            </SRLWrapper>
                                        </div>
                                    </>
                                ) : (
                                    <div className="mt-3" style={{ width: "100%" }}>
                                        <SRLWrapper>
                                            <Col className="p-0">
                                                <div className="bg-secondary p-5 rounded shadown-sm">
                                                    <p className="text-muted p-5 text-center">
                                                        <ImportSVG
                                                            color="#6c757d"
                                                            size={16}
                                                            name="info-circle-outline"
                                                        />
                                                        <br />
                                                        {"No documents uploaded yet"}
                                                    </p>
                                                </div>

                                                <Row></Row>
                                            </Col>
                                        </SRLWrapper>
                                    </div>
                                )}
                            </Col>
                        ) : null}
                    </Row>
                </fieldset>
            </Container>
        </>
    );
};
export default FileUploader;
