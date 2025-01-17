import React, { memo, useEffect, useState } from "react";
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
import { deleteDocumentAction, DownloadDocumentAction, uploadDocumentAction, clearReducerState as clearUploadedFilesReducer, deleteFileFromTPMAction, uploadDocumentV2Action, uploadFileV2Success, deleteFileV2Success, uploadSubTypeFile } from "Elements/Basic/File/FileAction";
import { IFile, IFileDownloadRequest } from "Elements/Basic/File/FileTypes";
import { Action, AttachedDocumentFormat, DocumentInfo } from "Modules/TPM/Constants/Interfaces";
import { resources_EN } from "Modules/TPM/Constants/Resources/Resources_EN";
import Methods from "Modules/TPM/Constants/Methods";
import { IAttachment, IDocumentType, IGetDocTypeByDocGroupCodeRequest, IMultipleDocumentType } from "./UploadDocumentsInterfaces";
import ApiURL from "Modules/TPM/Constants/ApiURLs";
import Config from "Config";
import { RootStore } from "Store";
import { getDocTypeByDocGroupCodeActionV2 } from "./UploadDocumentsAction";
import validation from "Modules/TPM/Constants/validation";
import { Error } from "@progress/kendo-react-labels";
import SimpleReactLightbox from "simple-react-lightbox";
import _ from "lodash";
import { fetchGridDataFunc } from "Modules/Common/Helpers/DateHelper";
import fileService from "Elements/Basic/File/FileService";
import Paths from "Modules/TPM/Constants/Paths";
import fileReducer from "Elements/Basic/File/FileReducer";
import { createEditTreatmentOnBoardDataAction } from "Elements/Custom/FormGenerator/FormGeneratorAction";
import { subTypeDocumentCode, treatmentTypeProperties, } from "Modules/TPM/TPMDashboard/Registration/CreateEditTPMRegistration/CreateEditTPMRegistrationInterfaces";
import { TreatmentPurpose } from "Modules/TPM/TPMDashboard/Registration/Renewal/RenewalTreatmentTypeInterfaces";

interface IProps {
    title?: string;
    onClose?: any;
    ownerDoumentId?: string;
    documentTypeCode?: string;
    data?: any;
    agencyId: number;
    documentGroupCode: string;
    showOtherDocumentComp?: boolean;
    showError?: boolean;
    otherProps?:any;
    disabled?: boolean;
    treatmentType?:any;
    formState?:any;
    fumigationSubType?:boolean;
    isHideFileDeleteBtn?:boolean;
}

const UploadDocumentsTPM = (props: IProps) => {
    const dispatch = useDispatch();

    const {
        agencyId,
        documentGroupCode,
        showOtherDocumentComp = false,
        showError = false,
        disabled,
        otherProps,
        treatmentType,
        formState,
        fumigationSubType,
        isHideFileDeleteBtn
    } = props;

    const defaultDocumentType: any = {
        code: "",
        name: ""
    };

    // const uploadedFiles: IFile[] = useSelector((state: RootStore) => state.fileReducer.newFiles);
    //const documentTypesStore: any = useSelector((state: RootStore) => state.UploadDocumentReducer.documentTypes);
    const multipledocumentTypesStore: any = useSelector(
        (state: RootStore) => state.UploadDocumentReducer.multipledocumentTypes
    );
    const multipleFilesUploadedStore: any = useSelector((state: RootStore) => state.fileReducer.multipleFilesUploaded);
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
    const [isFileDeleted,setIsFileDeleted] = useState(false);
    const [dummyFileUploadData,setDummyFileUploadData] = useState<any>({});
   
   
    let documentTypesStore: any =
        documentGroupCode && multipledocumentTypesStore && Object.keys(multipledocumentTypesStore)?.length > 0
            ? multipledocumentTypesStore[documentGroupCode]?.documentTypes
            : ([] as any);
    let uploadedFiles: any[] =
        multipleFilesUploadedStore && Object.keys(multipleFilesUploadedStore)?.length > 0
            ? multipleFilesUploadedStore[documentGroupCode]
            : ([] as any[]);
    const createEditTreatmentOnBoardData = useSelector(
        (state: RootStore) => state.FormGeneratorReducer.createEditTreatmentOnBoardData
    );

    // const [uploadedFiles, setUploadedFiles] = useState<any>([] as any)

    // useEffect(() =>{
    //     if(multipleFilesUploadedStore && Object.keys(multipleFilesUploadedStore)?.length>0){
    //         let uploadedFiles:IFile[] = multipleFilesUploadedStore && Object.keys(multipleFilesUploadedStore)?.length>0 ? multipleFilesUploadedStore[documentGroupCode]: [] as IFile[];
    //         setUploadedFiles(uploadedFiles);

    //     }

    // },[multipleFilesUploadedStore])

    //Get and set localStorage data
    useEffect(() => {
        const gridData = fetchGridDataFunc();
        let obj = { ...localStorageData, ...gridData };
        setLocalStorageData({ ...obj });
    }, []);

    useEffect(() => {
        if(dummyFileUploadData && Object.keys(dummyFileUploadData).length > 0)
        {
            console.log(dummyFileUploadData,"DummyFileUploadData");
            dispatch(uploadSubTypeFile({
                ...multipleFilesUploadedStore,
                [dummyFileUploadData.documentTypeCode]:dummyFileUploadData.data,
            }))
        }
    },[dummyFileUploadData])
 

    /* File Details */
    const getDetails = async (attachmentId: any, name: any,attachmentGroupCode:string="") => {
        let _documentGroupCode = attachmentGroupCode !== "" ? attachmentGroupCode : documentGroupCode
        let file = await fileService.getFilesDetail(attachmentId);
        const filesData = file.map((val: any, index: any) => {
            return {
                ...val,
                fileNestFileIds: attachmentId[index],
                documentName: val.fileName,
                docTypeName: name[index]
            };
        });
        setDummyFileUploadData((prevState:any) => ({
            ...prevState,
            documentTypeCode:_documentGroupCode,
            data:filesData
        }));
        // dispatch(uploadSubTypeFile({ [_documentGroupCode]: filesData }));
    };

    /* Getting Selected Treatment Type Data */ 
    const getSelectedTreatmentTypeData = (_treatmentType:any) => {
        let name = _treatmentType.displayName ? _treatmentType.displayName : _treatmentType.name;
        if(name.includes(treatmentTypeProperties.fumigation) && name.includes('-'))
        {
            name = name.split('-');
            name = name[0].trim();
        }
        let selectedTreatmentTypeData = createEditTreatmentOnBoardData[name];
        return selectedTreatmentTypeData;
    }

    /* Setting Images Thumbnails */
    const setImageThumbnail = () => {
        if (treatmentType && Object.keys(treatmentType).length > 0) {
            debugger;
            
            let _selectedTreatmentTypeData = getSelectedTreatmentTypeData(treatmentType);
            if(_selectedTreatmentTypeData && Object.keys(_selectedTreatmentTypeData).length > 0)
            {
            let treatmentTypeAttachments = _selectedTreatmentTypeData?.treatmentTypeAttachments && _selectedTreatmentTypeData?.treatmentTypeAttachments.length > 0 ? _selectedTreatmentTypeData.treatmentTypeAttachments : [];
            //  TODO: let subTypeAttachments = name.includes('Fumigation') ? checkSubTypeAttachments(selectedTreatmentTypeData) : [];
            setFileDetails(treatmentTypeAttachments);         
        
        }
        }
    }

    /* Getting setting Files Details */ 
    const setFileDetails = (files:any,documentTypeCode:any="") => {
        
        if (files && files.length > 0) {
            let attachments = [...files];
            let fileIds = attachments.map((val: any) => val.fileIdS);
            let documentTitle = attachments.map((val: any) => val.documentTitle);

            getDetails(fileIds, documentTitle,documentTypeCode);
        }

    }

    /* Checking SubType Attachments  */ 
    const checkSubTypeAttachments = (selectedData:any) => {
        if(selectedData.treatmentSubTypes && selectedData.treatmentSubTypes.length > 0)
        {
            selectedData.treatmentSubTypes.map((val:any) => {
                setFileDetails(val.treatmentSubTypeAttachments,val.documentTypeCode);
            })
            
        }

    }

    /* Get Files Data On Edit */
    useEffect(() => {
        if(!fumigationSubType)
        {
        setImageThumbnail();
        }
        else {
            let _selectedTreatmentTypeData = getSelectedTreatmentTypeData(treatmentType);
            if(_selectedTreatmentTypeData && Object.keys(_selectedTreatmentTypeData).length > 0)
            {

              checkSubTypeAttachments(_selectedTreatmentTypeData);
            }
        }
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
                fileNestFileIds: "",
                documentGroupCode
            };
            setFileName(name.substring(0, name.indexOf(".")));
            let displayName = treatmentType.displayName ? treatmentType.displayName : treatmentType.name;
            if(displayName.includes(treatmentTypeProperties.fumigation) && displayName.includes('-'))
            {
                displayName = displayName.split('-');
                displayName = displayName[0].trim();
            }
            dispatch(uploadDocumentV2Action(userFile,createEditTreatmentOnBoardData,createEditTreatmentOnBoardDataAction,displayName));
        
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
        } else {
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
        if (!_.isEmpty(documentGroupCode)) {
            const documentsReq: IGetDocTypeByDocGroupCodeRequest = {
                agencyId: agencyId,
                documentGroupCode: documentGroupCode
            };
            dispatch(getDocTypeByDocGroupCodeActionV2(documentsReq));
        }
    }, []);

    useEffect(() => {
        if (multipledocumentTypesStore && Object.keys(multipledocumentTypesStore)?.length > 0) {
            setDocumentTypes(
                multipledocumentTypesStore[documentGroupCode]?.documentTypes.map((val: any, index: number) => {
                    return {
                        id: index,
                        code: val.code,
                        //name: val.name
                        name: val.isMandatory ? "M - " + val.name : "O - " + val.name
                    };
                })
            );
        }
    }, [multipledocumentTypesStore]);

    const isFormValid = () => {
        let isAllMandatoryFilesUploaded: boolean = false;
        // if(uploadedFiles.length >= 1){
        //      allFilesUploaded = true;
        // }

        const filterMandatoryFiles = documentTypesStore.filter((doc: any) => doc.isMandatory);

        for (let i = 0; i < filterMandatoryFiles.length; i++) {
            const file =
                uploadedFiles.length > 0
                    ? uploadedFiles?.find(
                          (x: any) => x.docTypeCode?.toLowerCase() === documentTypesStore[i].code?.toLowerCase()
                      )
                    : {};

            if (file == undefined) {
                isAllMandatoryFilesUploaded = false;
                break;
            }
        }
        return isAllMandatoryFilesUploaded;
    };

    useEffect(() => {
        if (isConfirm) {
            if (type === Action.Delete) {
                console.log("formState",formState);
                if(formState["purpose"].action !== TreatmentPurpose.AMENDMENT)
                {
                dispatch(
                    deleteDocumentAction(identification, (res: any) => {
                        setVisibleDialog(false);
                        setType("");
                        deleteDocument();
                        if (res) {
                            //error handling
                        }
                    })
                );
                }
                else {
                    setVisibleDialog(false);
                    setType("");
                    deleteDocument();
                   
                }
               
            }
            
            setConfirmation(false);
        }
    }, [isConfirm]);

    const deletingFileInFormReducer = (documentCode:any) => {
        
        let displayName = treatmentType.displayName ? treatmentType.displayName : treatmentType.name;
        if(displayName.includes(treatmentTypeProperties.fumigation) && displayName.includes('-'))
        {
            displayName = displayName.split('-');
            displayName = displayName[0].trim();
        }
        if(![subTypeDocumentCode.MB,subTypeDocumentCode.ALP,subTypeDocumentCode.CO2].includes(documentCode))
        {
            let attachmentData = createEditTreatmentOnBoardData[displayName].treatmentTypeAttachments;
            if(attachmentData && attachmentData.length > 0)
            {

               attachmentData = attachmentData.filter((val:any) => val.fileNestFileIds !== identification);
            }
           
            dispatch(
                createEditTreatmentOnBoardDataAction({
                    ...createEditTreatmentOnBoardData,
                    [displayName]: { ...createEditTreatmentOnBoardData[displayName], treatmentTypeAttachments: [...attachmentData] }
                })
            );
        }
        else {
            let filter =  createEditTreatmentOnBoardData[displayName].treatmentSubTypes.find((val:any) => val.documentTypeCode === documentCode);
            console.log("Filter",filter);
            if(filter && Object.keys(filter).length > 0)
            {
                let subTypeAttachments = [...filter.treatmentSubTypeAttachments];
                if(subTypeAttachments && subTypeAttachments.length > 0)
                {
                    subTypeAttachments = subTypeAttachments.filter((val:any) => val.fileIdS !== identification)
                }
               filter = {...filter, treatmentSubTypeAttachments: [...subTypeAttachments]};
               let filterData = createEditTreatmentOnBoardData[displayName].treatmentSubTypes.map((val:any) => {
                    
                if(val.documentTypeCode === documentGroupCode)
                {
                    return filter;
                }
                else {
                    return {...val};
                }
                
            }

            );
            //    let filterData = createEditTreatmentOnBoardData[displayName].treatmentSubTypes.map((val:any) => val.documentTypeCode !== documentGroupCode);
                // filterData = [...filterData,filter];
                dispatch(
                    createEditTreatmentOnBoardDataAction({
                        ...createEditTreatmentOnBoardData,
                        [displayName]: { ...createEditTreatmentOnBoardData[displayName], treatmentSubTypes: [
                          
                            ...filterData,
                        ]}
                    })
                );
            }
        }
    }


    /* Deleting File */
    const deleteDocument = () => {
        if (props?.otherProps && props?.otherProps?.isTreatmentTypeDocument) {
            console.log("data", props?.otherProps);
            if (props?.otherProps?.data) {
                const { treatmentTypeRegistrationId } = props?.otherProps?.data;
                let req = {
                    treatmentTypeRegistrationId: treatmentTypeRegistrationId,
                    fileIdS: identification,
                    purpose:formState["purpose"].action
                };
               
               
               dispatch(deleteFileFromTPMAction(req));
               let dummyMultipleFileStore = {...multipleFilesUploadedStore};

               let documentCodeFiles = dummyMultipleFileStore[documentGroupCode].filter((val:any) => val.fileNestFileIds !== identification);
               dummyMultipleFileStore = {
                   ...dummyMultipleFileStore,  
                   [documentGroupCode]:[...documentCodeFiles],
               }
               dummyMultipleFileStore[documentGroupCode] = [...documentCodeFiles];
               dispatch(deleteFileV2Success(dummyMultipleFileStore));
               deletingFileInFormReducer(documentGroupCode);
            }
        }
    }

    //Clear state
    useEffect(() => {
        return () => {
            // debugger;
            // dispatch(clearUploadedFilesReducer());
        };
    }, []);

  
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
                    disabled={disabled || window.location.pathname.includes(Paths.Registration.Renewal) || isHideFileDeleteBtn}
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
                        maxFileSize:resources_EN.file_size
                    }}
                    batch={false}
                    onAdd={handleFileUpload}
                    disabled={disabled || window.location.pathname.includes(Paths.Registration.Renewal) || isHideFileDeleteBtn}
                    // disabled={loading}
                />
            </Col>
            <Row className="mx-0">
                <Col>
                    {uploadedFiles && uploadedFiles?.length > 0 ? (
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
                                                        {uploadedFiles &&
                                                            uploadedFiles?.map((document: IFile, index: any) => {
                                                                return (
                                                                    <Col key={index}>
                                                                        {document.documentName.includes("pdf") ? (
                                                                            <div
                                                                                className={`${styles.imgThumbnail} mt-2 rounded`}>
                                                                               { !isHideFileDeleteBtn ? (<span className="close-icon p-1">
                                                                                    <a
                                                                                        className={`k-icon k-i-close`}
                                                                                        title={"Delete"}
                                                                                        
                                                                                        onClick={() => {
                                                                                            handleDeleteFile(
                                                                                                document.fileNestFileIds
                                                                                            );
                                                                                        }}></a>
                                                                                </span>
                                                                               ) : <></>
                                                            }
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
                                                                                 { !isHideFileDeleteBtn ? (<span className="close-icon p-1">
                                                                                    <a
                                                                                        className={`k-icon k-i-close`}
                                                                                        title={"Delete"}
                                                                                        
                                                                                        onClick={() => {
                                                                                            handleDeleteFile(
                                                                                                document.fileNestFileIds
                                                                                            );
                                                                                        }}></a>
                                                                                </span>
                                                                               ) : <></>
                                                            }
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

export default memo(UploadDocumentsTPM);
