import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { SRLWrapper } from "simple-react-lightbox";
import moment from "moment";

//kendo
import { Checkbox, TextArea } from "@progress/kendo-react-inputs";
import { Label } from "@progress/kendo-react-labels";
import { Field, FormElement, Form } from "@progress/kendo-react-form";

import { Window } from "@progress/kendo-react-dialogs";
import { Hint } from "@progress/kendo-react-labels";

//bootstrap
import { Col, Container, Row, Button } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";

//fontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faPaperclip, faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faFilePdf, faLightbulb } from "@fortawesome/free-solid-svg-icons";

import styles from "./UploadDocuments.module.scss";

//component
import AlertDismissible from "Elements/Basic/AlertDismissible/AlertDismissible";
import {
    FormComboBox,
    FormInput,
    FormNumericTextBox,
    FormSwitch,
    FormUpload
} from "Elements/Basic/FormComponent/FormComponent";
import { IMessage } from "Elements/Basic/AlertDismissible/AlertDismissibleInterfaces";
import DailogComponent from "Elements/Basic/Dailog/DailogComponent";
import { clearAlert, clearAlertModal, errorAlert } from "Elements/Basic/AlertDismissible/AlertDismissibleActions";
import { deleteDocumentAction, DownloadDocumentAction, uploadDocumentAction, clearReducerState as clearUploadedFilesReducer, deleteFileFromTPMAction } from "Elements/Basic/File/FileAction";
import { IFile, IFileDownloadRequest } from "Elements/Basic/File/FileTypes";
import { Action, AttachedDocumentFormat, DocumentInfo } from "Modules/TPM/Constants/Interfaces";
import { resources_EN } from "Modules/TPM/Constants/Resources/Resources_EN";
import Methods from "Modules/TPM/Constants/Methods";
import { IAttachment, IDocumentType, IGetDocTypeByDocGroupCodeRequest } from "./UploadDocumentsInterfaces";
import ApiURL from "Modules/TPM/Constants/ApiURLs";
import Config from "Config";
import { RootStore } from "Store";
import { getDocTypeByDocGroupCodeAction } from "./UploadDocumentsAction";
import validation from "Modules/TPM/Constants/validation";
import { Error } from "@progress/kendo-react-labels";
import SimpleReactLightbox from "simple-react-lightbox";
import _ from "lodash";
import { fetchGridDataFunc } from "Modules/Common/Helpers/DateHelper";

interface IProps {
    title?: string;
    onClose?: any;
    ownerDoumentId?: string;
    documentTypeCode?: string;
    data?: any;
    agencyId: number;
    documentGroupCode: string;
    showOtherDocumentComp?: boolean;
    filesAttachedByOfficer?: any;
    showError?: boolean;
    setIsAllMandatoryFilesUploaded?: any;
    setUploadedDocuments?: any;
    otherProps?:any;
}

const UploadDocuments = (props: IProps) => {
    const dispatch = useDispatch();
    const { agencyId, documentGroupCode, setIsAllMandatoryFilesUploaded, setUploadedDocuments, showOtherDocumentComp = false, showError = false } = props;
   
    const defaultDocumentType: any = {
        code: "",
        name: ""
    };

    const uploadedFiles: IFile[] = useSelector((state: RootStore) => state.fileReducer.newFiles);
    const documentTypesStore: any = useSelector((state: RootStore) => state.UploadDocumentReducer.documentTypes);
    const isAlertVisible = useSelector((state: RootStore) => state.alert.visible) || false;
    const alertMessage = useSelector((state: RootStore) => state.alert.description) || "";

    const otherDocumentTypeCode: string = DocumentInfo.OTHER_DOCUMENT_TYPE_CODE;

    const [message, setMessage] = useState("");
    const [identification, setIdentification] = useState("");
    const [fileName, setFileName] = useState("");
    const [type, setType] = useState("");
    const [isVisible, setVisibleDialog] = useState(false);
    const [documentType, setDocumentType] = useState(defaultDocumentType);
    const [documentTypes, setDocumentTypes] = useState([] as IDocumentType[]);
    const [isOtherDocumentsChecked, setIsOtherDocumentsChecked] = useState(false);
    const [otherDocumentTxtField, setotherDocumentsTxtField] = useState("");
    const [documentTypeId, setDocumentTypeId] = useState(0);
    const [isConfirm, setConfirmation] = useState(false);
    const [localStorageData, setLocalStorageData] = useState<any>();

    //Get and set localStorage data
    useEffect(() => {
        const gridData = fetchGridDataFunc();
        let obj = { ...localStorageData, ...gridData };
        setLocalStorageData({ ...obj });
    }, []);

    // Functions
    const handleFileUpload = (event: any) => {
        dispatch(clearAlert({ code: "", description: "" }));
        const { validationErrors, extension, name, size } = event.affectedFiles[0];
        if (size < Config.minimumFileSize) {
            const message: IMessage = {
                code: "500",
                description: "File size is too small."
            };
            dispatch(errorAlert(message));
            return;
        }
        if (!documentType.code) {
            const message: IMessage = {
                code: "500",
                description: "Please select Document Type"
            };
            dispatch(errorAlert(message));
            return;
        }

        if (!validationErrors) {
            const userFile: IFile = {
                documentExtension: extension.replace(".", ""),
                file: event.affectedFiles[0].getRawFile(),
                documentName: name,
                documentSize: size,
                docTypeCode: documentType.code,
                docTypeName: documentType.name,
                fileNestFileId: 0,
                fileNestFileIds: ""
            };
            setFileName(name.substring(0, name.indexOf(".")));
            dispatch(uploadDocumentAction(userFile));
            dispatch(
                clearAlertModal({
                    code: "",
                    description: ""
                })
            );
            setDocumentType(defaultDocumentType);
            return;
        }

        if (validationErrors[0] === "invalidFileExtension") {
            const message: IMessage = {
                code: "500",
                description: "Please upload file with valid extension like .jpeg, .jpg, .pdf & .png"
            };
            dispatch(errorAlert(message));
            return;
        }

        if (validationErrors[0] === "invalidMaxFileSize") {
            const message: IMessage = {
                code: "500",
                description: resources_EN.file_size_validations
            };
            dispatch(errorAlert(message));
            return;
        }
    };
    const handleDeleteFile = (identification: string) => {
        if (identification) {
            setMessage(resources_EN.delete_file_message);
            setIdentification(identification);
            setType(Action.Delete);
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
    const handleDocumentTypeChange = (event: any) => {
        if (event?.target?.value) {
            setDocumentType(event.target.value);
        }
        else{
            setDocumentType(defaultDocumentType);
        }
    };
    const handleOtherDocumentChange = (event: any) => {
        if (event.value.length <= validation.hint70.maxlength) {
            setotherDocumentsTxtField(event.value as string);
        }
    };

    const handleCheckboxChange = (event: any) => {
        const currentValue = event.target.checked == true ? true : false;
        setIsOtherDocumentsChecked(currentValue);
    };

    const AddOtherDocument = () => {
        const name = otherDocumentTxtField;
        if (name) {
            const document = {
                code: otherDocumentTypeCode,
                name: name,
                id: documentTypes.length + 1
            };

            const sameItem = documentTypes.find((doc) => doc.name.toLowerCase() === name.toLowerCase());

            if (sameItem)
                dispatch(
                    errorAlert({
                        code: "500",
                        description: "Document already listed"
                    })
                );
            else {
                setDocumentTypeId(documentTypes.length);
                setDocumentTypes([...documentTypes, document]);
                setDocumentType(document);
                setotherDocumentsTxtField("");
                dispatch(
                    clearAlertModal({
                        code: "",
                        description: ""
                    })
                );
            }
        }
    };
    useEffect(() => {
        if(!_.isEmpty(documentGroupCode)){
            const documentsReq: IGetDocTypeByDocGroupCodeRequest = {
                agencyId: agencyId,
                documentGroupCode: documentGroupCode
            };
            dispatch(getDocTypeByDocGroupCodeAction(documentsReq));
        }
    }, []);
    useEffect(() => {
        if (documentTypesStore && documentTypesStore?.length > 0) {
            setDocumentTypes(
                documentTypesStore.map((val: any, index: number) => {
                    return {
                        id: index,
                        code: val.code,
                        //name: val.name
                        name: val.isMandatory ? "M - " + val.name  : "O - " + val.name,

                    };
                })
            );
        }
    }, [documentTypesStore]);


const isFormValid = () => {
        let isAllMandatoryFilesUploaded:boolean = false;
        // if(uploadedFiles.length >= 1){
        //      allFilesUploaded = true;
        // }

        const filterMandatoryFiles = documentTypesStore.filter((doc:any)=>doc.isMandatory);

        for (let i = 0; i < filterMandatoryFiles.length; i++) {
                const file = uploadedFiles?.find(
                    (x) => x.docTypeCode?.toLowerCase() === documentTypesStore[i].code?.toLowerCase()
                );

                if (file == undefined) {
                    isAllMandatoryFilesUploaded = false;
                    break;
                }
            
        }
         return isAllMandatoryFilesUploaded;
    };

    useEffect(() => {
        if (uploadedFiles?.length > 0) {
            const officerAttachments: IAttachment[] = [];

            uploadedFiles.map((file: IFile) => {
                const documentUploaded: IDocumentType[] = documentTypes.filter(
                    (x) => x.name.toLowerCase() === file.docTypeName.toLowerCase()
                );
                if (documentUploaded.length > 0) {
                    const doc = documentUploaded[0];
                    const attachment: IAttachment = {
                        attachementId: doc.id,
                        attachedDocumentTypeCode: doc.code,
                        documentTitle: doc.name,
                        fileNestFileId: file.fileNestFileIds
                    };

                    officerAttachments.push(attachment);
                }
            });
            props.filesAttachedByOfficer(officerAttachments);

            //New work
            const attachmentsReq:any = uploadedFiles
                .map((item: any) => {
                    const { docTypeCode, fileNestFileId, documentName, docTypeName } = item;
                    const documentUploaded: IDocumentType | undefined = documentTypes.find(
                        (x) => x.name.toLowerCase() === docTypeName.toLowerCase()
                    );
                    if (documentUploaded) {
                        return {
                            ownerDocumentTypeCode: localStorageData?.initDocumentTypeCode,
                            ownerDocumentID: localStorageData?.initDocumentID,
                            attachedObjectFormatID: AttachedDocumentFormat.SCANNED_DOCUMENT,
                            attachedDocumentTypeCode: docTypeCode,
                            attachedDocumentID: fileNestFileId,
                            title: docTypeName,
                            action: Action.Insert,
                            attachmentID: 0
                        };
                    }
                    return null;
                })
                .filter((val) => !!val);

            props?.hasOwnProperty("setIsAllMandatoryFilesUploaded") ? setIsAllMandatoryFilesUploaded(isFormValid()) : null;
            props?.hasOwnProperty("setUploadedDocuments") ? setUploadedDocuments(attachmentsReq) : null;
        } else if (uploadedFiles?.length == 0) {
            props.filesAttachedByOfficer([]);
            props?.hasOwnProperty("setUploadedDocuments") ? setUploadedDocuments([]) : null;
        }
    }, [uploadedFiles]);
    useEffect(() => {
        if (isConfirm) {
            if (type === Action.Delete) {
                dispatch(deleteDocumentAction(identification,(res:any)=>{
                    setVisibleDialog(false);
                    setType('');
                    if(props?.otherProps && props?.otherProps?.isTreatmentTypeDocument){
                        console.log('data', props?.otherProps);
                        if(props?.otherProps?.data){
                            const {treatmentTypeRegistrationId} = props?.otherProps?.data;
                            let req = {
                                treatmentTypeRegistrationId: treatmentTypeRegistrationId,
                                fileIdS: identification
                            }
                            dispatch(deleteFileFromTPMAction(req))
                        }

                    }
                    if(res){
                        //error handling
                    }
                }));
                
            }
            setConfirmation(false);
        }
    }, [isConfirm]);

    //Clear state
    useEffect(() => {
        return ()=>{
                        dispatch(clearUploadedFilesReducer())
        }
    },[]);
    return (
        <>
            <DailogComponent
                id="dialog-cancel"
                btnName1="Cancel"
                btnName2="Ok"
                confirm={setConfirmation}
                isVisible={isVisible}
                closeDailog={setVisibleDialog}
                message={message}
            />
            <Col
                style={{
                    borderBottom: "1px dashed #dee2e6"
                }}
                className="pb-3">
                <Field
                    id={"documentType"}
                    name={"documentType"}
                    component={FormComboBox}
                    className={`${styles.documentType} mt-2 rounded`}
                    data={documentTypes}
                    textField="name"
                    dataItemKey="id"
                    onChange={handleDocumentTypeChange}
                    placeholder={"Select Document Type"}
                    value={documentType}
                    label={"Document Type"}
                />
            </Col>
            {showOtherDocumentComp && (
                <Col xs="12">
                    <Row className="pt-2">
                        <Col className="d-flex">
                            <Checkbox className="mr-1 d-inline-block" onClick={handleCheckboxChange} />
                            <Label className={`${styles.bold} d-inline-block`}>Other Documents</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mt-2 d-flex">
                            <Field
                                name={"documentName"}
                                placeholder={"Enter Document Name"}
                                disabled={!isOtherDocumentsChecked}
                                component={FormInput}
                                value={otherDocumentTxtField}
                                onChange={handleOtherDocumentChange}
                                wrapperStyle={{
                                    display: "inline-block",
                                    width: "100%",
                                    marginRight: "0.25rem",
                                    marginTop: "0"
                                }}
                                className="d-inline-block "
                            />

                            <Button
                                variant="outline-primary"
                                onClick={AddOtherDocument}
                                disabled={!isOtherDocumentsChecked || otherDocumentTxtField == ""}
                                style={{ whiteSpace: "nowrap" }}
                                className="d-inline-block  font-semibold">
                                Add other document
                            </Button>
                        </Col>
                    </Row>
                    {showError ? (
                        <Row>
                            {" "}
                            <Col>{isAlertVisible && <Error>{alertMessage}</Error>}</Col>
                        </Row>
                    ) : (
                        <></>
                    )}
                </Col>
            )}
            <Col
                // style={{
                //     borderBottom: "1px dashed #dee2e6"
                // }}
                className="pb-3">
                <Field
                    id={"documents"}
                    name={"documents"}
                    label={"Select File"}
                    hint={resources_EN.file_size_hint}
                    component={FormUpload}
                    restrictions={{
                        allowedExtensions: [".jpeg", ".jpg", ".png", ".pdf"],
                        maxFileSize: resources_EN.file_size
                    }}
                    batch={false}
                    onAdd={handleFileUpload}
                    // disabled={loading}
                />
            </Col>
            <Row className="mx-0">
                <Col>
                    {uploadedFiles?.length > 0 ? (
                        <>
                            {" "}
                            <Container
                                className="rounded px-0 pb-3"
                                style={{
                                    background: "white",
                                    boxShadow: "0px 4px 12px #EBF0FA"
                                }}
                                fluid>
                                <div
                                    style={{
                                        borderBottom: "1px solid #dee2e6"
                                    }}
                                    className="mt-3 py-3 px-md-3">
                                    <p className="base-lg font-semibold">Documents Preview</p>
                                </div>
                                <div
                                    className="mt-3 px-3"
                                    style={{
                                        width: "50%"
                                    }}>
                                    <SimpleReactLightbox>
                                        <SRLWrapper>
                                            <Col className="p-0">
                                                <div>
                                                    <Row xs="1" sm="2" md="3">
                                                        {uploadedFiles?.map((document: IFile, index: any) => {
                                                            return (
                                                                <Col key={index}>
                                                                    {document.documentName.includes("pdf") ? (
                                                                        <div
                                                                            className={`${styles.imgThumbnail} mt-2 rounded`}>
                                                                            <span className="close-icon p-1">
                                                                                <a
                                                                                    className={`k-icon k-i-close`}
                                                                                    title={"Delete"}
                                                                                    onClick={() => {
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
                                                                                    width: "100%",
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
                                                                    ) : (
                                                                        <div
                                                                            className={`${styles.imgThumbnail} mt-2 rounded`}>
                                                                            <span className="close-icon p-1">
                                                                                <a
                                                                                    className={`k-icon k-i-close`}
                                                                                    title={"Delete"}
                                                                                    onClick={() => {
                                                                                        handleDeleteFile(
                                                                                            document.fileNestFileIds
                                                                                        );
                                                                                    }}></a>
                                                                            </span>
                                                                            <a
                                                                                href={getFileURL(
                                                                                    document.fileNestFileIds
                                                                                )}
                                                                                className="element_with_overlay">
                                                                                <img
                                                                                    className="image"
                                                                                    src={getFileURL(
                                                                                        document.fileNestFileIds
                                                                                    )}
                                                                                    alt={document.docTypeName}
                                                                                />
                                                                            </a>
                                                                            <span className="description-container p-2">
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
                                    </SimpleReactLightbox>
                                </div>
                            </Container>{" "}
                        </>
                    ) : null}
                </Col>
            </Row>
        </>
    );
};

export default UploadDocuments;
