import React, { memo, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import moment from "moment";

import { Splitter, SplitterOnChangeEvent } from "@progress/kendo-react-layout";
import { Row, Col } from "react-bootstrap";
import { Button as BootstrapButton, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    Agency,
    ApplicationCodes,
    DocumentClassificationCode,
    DocumentInfo as DocInfo,
    ImportPermitStatus
} from "Modules/TPM/Constants/Interfaces";
import { resources_EN } from "Modules/TPM/Constants/Resources/Resources_EN";
import { RootStore } from "Store";

import { useParams } from "react-router";
import SweetAlert from "react-bootstrap-sweetalert";
import { Checkbox, TextArea, TextAreaChangeEvent } from "@progress/kendo-react-inputs";
import DailogComponent from "Elements/Basic/Dailog/DailogComponent";

import styles from "./View.module.scss";
import { Form, Field, FormElement, FormRenderProps } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { getDashboardInfoAction, setPageTitleAction } from "Layouts/AppLayout/AppLayoutActions";
import { Role } from "Lib/Types/SharedTypes";
import { Action, DocumentInfo, GeneralCommentsEnum, CatchCertificateStatus } from "Modules/TPM/Constants/Interfaces";
import Loader from "Elements/Basic/Loader/Loader";
import GeneralComments from "Modules/TPM/Common/GeneralComments/GeneralComments";
import Config from "Config";
import ViewPanel from "Elements/Basic/ViewPanel/ViewPanel";
import { IAvailableCommandsType } from "Modules/Common/Workflow/WorkflowInterfaces";
import WorkflowBar from "Modules/Common/Workflow/WorkflowBar/WorkflowBar";
import { WFCommands } from "Modules/Common/Workflow/Constants/WFCommands";
import { WFStates } from "Modules/Common/Workflow/Constants/WFStates";
import { WFParameters } from "Modules/Common/Workflow/Constants/WFParameters";
import Unauthorized from "Modules/TPM/Common/Unauthorized/Unauthorized";
import { Hint } from "@progress/kendo-react-labels";
import { clearReducerState, deleteDocumentAction, uploadDocumentAction } from "Elements/Basic/File/FileAction";
import _ from "lodash";
import Paths from "Modules/TPM/Constants/Paths";
// import { ICatchCertificatePrintRequestData, IPrintRequestData } from "Modules/TPM/Common/PrintTemplate/PrintTemplateInterfaces";
import validation from "Modules/TPM/Constants/validation";
import { IUpdateStoreObject } from "Modules/TPM/Common/UpdateStoreObject/UpdateStoreObjectInterfaces";
import GridView from "Elements/Basic/GridView/GridView";
import Column from "Elements/Basic/GridView/Columns/Column";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPrint, faTrash } from "@fortawesome/free-solid-svg-icons";
import ExportPdf from "Modules/TPM/Common/ExportPdf/ExportPdf";
import { GetTreatmentTypeByProviderIdAction } from "Modules/TPM/Common/CommonApi/CommonApiAction";
import BasicInfoRibbon from "../../../View/BasicInfo/BasicInfoRibbon";
import FormGenerator from "Elements/Custom/FormGenerator/FormGenerator";
// import { FormTreatmentLIcenseGridConfig } from "../FormConfig";
import ImportSVG from "Lib/Helpers/CustomSVGImporter";
import FormFumigationControlType from "Elements/Custom/FormGenerator/FormFumigationControlType";
import { createEditTreatmentOnBoardDataAction } from "Elements/Custom/FormGenerator/FormGeneratorAction";
import { FieldControlTypes } from "Elements/Custom/FormGenerator/FormGeneratorInterface";

const TreatmentLicenseGrid = (props: any) => {
    const { id, config, treatmentType,isHideSubmitBtn } = props;
    const { columns, handleAdd, disabled } = config;
    let param: any = useParams();
    const dispatch = useDispatch();
    const location = useLocation();

    let initDocumentID = 0;
    let gridInfoStoreHistory: undefined;

    // Hooks
    const history = useHistory();
    const URL = Paths.Registration;

    // Retrive request data if already set in previous request
    const gridInfoStoreHistoryObject = localStorage.getItem("gridInfoStoreHistoryObject");

    // if (history.location.state != null) {
    //     initDocumentID = props.id > 0 ? props.id : Number(history.location.state.id); // Number(param.id);
    //     gridInfoStoreHistory = history.location.state;

    //     // Setting localstorage to get request data on reload
    //     localStorage.setItem("gridInfoStoreHistoryObject", JSON.stringify(gridInfoStoreHistory));
    // } else if (gridInfoStoreHistoryObject != "undefined" && gridInfoStoreHistoryObject != null) {
    //     const tempGridInfoStoreHistory = JSON.parse(gridInfoStoreHistoryObject);

    //     // Setting up gridInfoStoreHistory from previous request data
    //     initDocumentID = Number(tempGridInfoStoreHistory.id);
    //     gridInfoStoreHistory = tempGridInfoStoreHistory;
    // } else {
    //     history.push(URL.Grid);
    // }

    const [isVisible, setVisible] = useState(false);
    const [isConfirm, setConfirmation] = useState(false);
    const [isDialogVisible, setVisibleDialog] = useState(false);
    const agencyId: number = Agency.MFD;

    const userRole = useSelector((state: RootStore) =>
        state.dashboardReducer.currentUserRole != undefined
            ? state.dashboardReducer.currentUserRole.Code
            : state.dashboardReducer.dashboardInfo.currentRole
    );

    const gridInfoStoreReducer: IUpdateStoreObject = useSelector((state: RootStore) => state.updateStoreReducer.store);

    const loading = useSelector((state: RootStore) => state.CommonApiReducer.getTreatmentTypesByTPIdLoading);

    const store = useSelector((state: RootStore) => state);

    const { CommonApiReducer, CreateEditTPRegistrationReducer, InitiateTreatmentRequestReducer } = store;
    const { treatmentProviderBusines, treatmentTypes, getTreatmentTypesByTPId } = CommonApiReducer;
    const { confirmTreatmentTypes, saveTreatmentType } = CreateEditTPRegistrationReducer;
    const { cities } = InitiateTreatmentRequestReducer;
    const createEditTreatmentOnBoardData = useSelector(
        (state: RootStore) => state.FormGeneratorReducer.createEditTreatmentOnBoardData
    );

    const pathName = location.pathname;
    const gridInfoStore = gridInfoStoreHistory != null ? gridInfoStoreHistory : gridInfoStoreReducer;

    const emptyCommand: IAvailableCommandsType = {
        classifier: "",
        isForSubprocess: false,
        commandName: "",
        processId: "",
        validForActivityName: "",
        validForStateName: "",
        displayName: "",
        style: ""
    };

    // const history = useHistory();
    const [show, setShow] = React.useState(false);
    const [type, setType] = useState("");
    const [isSuccess, setSuccess] = React.useState(false);
    const [isDanger, setDanger] = useState(false);
    const [isInfo, setInfo] = useState(false);
    const [sweetAlertTitle, setSweetAlertTitle] = React.useState("");
    const [sweetAlertMessage, setSweetAlertMessage] = React.useState("");
    const [message, setMessage] = useState("");
    const [remarks, setRemarks] = useState("");
    const [isUnauthorized, setIsUnauthorized] = useState(false);
    const [isFileUploadedValid, setIsFileUploadedValid] = useState(false);
    const [isItem, setItem] = useState(false);
    const [showCloseApplication, setShowCloseApplication] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [formConfig, setFormConfig] = useState<any>(config?.formFields);
    const [command, setCommand] = useState(emptyCommand);
    let selectedTreatmentType: any = createEditTreatmentOnBoardData[treatmentType?.name]
    ? createEditTreatmentOnBoardData[treatmentType?.name]
    : {};

    // State Name Decision On The Basic of Screen
    let stateName = []; // Fix This
    if (userRole === Role.Officer) {
        stateName.push(WFStates.Quarantine_Officer_Queue);
        stateName.push(WFStates.Trader_To_Do_List);
    }
    const stateArray = () => {
        let arr: any = [];

        for (let key in config?.formFields) {
            arr.push({
                id: key,
                config: config?.formFields[key]
            });
        }
        return arr;
    };

    const sweetAlertOnConfirm = () => {
        setShow(false);
        // if (!isInfo) {
        //     history.push(Paths.CatchCertificate.Grid);
        // }
    };

    const handleDeleteTreatmentTypeLicense = (value: any) => {
        if (value) {
            let updateGridData: any = selectedTreatmentType[id]
                ? selectedTreatmentType[id]
                      ?.filter((item: any) => item?.sno !== value?.sno)
                      ?.map((item: any, index: number) => ({ ...item, sno: index + 1 }))
                : [];
            dispatch(
                createEditTreatmentOnBoardDataAction({ ...createEditTreatmentOnBoardData, [treatmentType?.name]: {...selectedTreatmentType, [id]: updateGridData} })
            );
        }
        return null;
    };

    // useEffect(() => {
    //     console.log({ formConfig });
    //     let _formConfig: any = { ...formConfig };
    //     //Mapped Business Data
    //     let businessDataName = ["addButton"];
    //     businessDataName.map((mappingItemLabel: any) => {
    //         let Config: any = _formConfig[mappingItemLabel];
    //         if (Config?.name == "button") {
    //             Object.assign(Config, {
    //                 ...Config,
    //                 data: [],
    //                 onclick: handleAdd
    //             });
    //         }

    //         _formConfig[mappingItemLabel] = Config;
    //     });

    //     setFormConfig(_formConfig);
    // }, []);

    const ActionCell = (props: any) => {
        let dataItem = props.dataItem;
        return (
            <td className="grid-column pl-4">
                <span className={"text-muted d-flex"}>
                    <a
                        style={{
                            paddingLeft: "5px",
                            paddingRight: "5px",
                            cursor: "pointer",
                            fontSize: "1rem"
                        }}
                        className="mr-2"
                        >
                        {!disabled ? <FontAwesomeIcon icon={faTrash} fill="warning" title={"Delete"} 
                        onClick={() => handleDeleteTreatmentTypeLicense(dataItem)}
                        />:null}
                    </a>


                 {/* TODO: add view button in future*/}
                    {/* <a
                    style={{
                        paddingRight: "5px",
                        cursor: "pointer",
                        fontSize: "1rem"
                    }}
                    className="mr-2"
                    // onClick={() => onView(dataItem)} title={"View"}
                    >
                    <ImportSVG name="view" color="#6c757d" size={14} />
                </a> */}
                </span>
            </td>
        );
    };

    const handleAddSumbit = () => {
        switch (config.controlType) {
            case FieldControlTypes.GRID:
                {
                    let obj: any = {};
                    let clearInputFields = {};
                    Object.keys(selectedTreatmentType).map((key: any) => {
                        if (config?.columns.find((item: any) => item?.field == key)) {
                            obj = { ...obj, [key]: selectedTreatmentType[key] };
                            clearInputFields = { ...clearInputFields, [key]: "" };
                        }
                    });

                    // * check unique input
                    if (
                        selectedTreatmentType[id]?.length > 0 &&
                        config?.columns.find(
                            (item: any) =>
                                obj.hasOwnProperty(item?.field) &&
                                item?.unique &&
                                selectedTreatmentType[id].find(
                                    (it: any) => it[item?.field] == obj[item?.field]
                                )
                        )
                    ) {
                        let inputItem = config?.columns.find(
                            (item: any) => obj.hasOwnProperty(item?.field) && item?.unique
                        );
                        setDanger(true);
                        setShow(true);
                        setSweetAlertMessage(`Please input unique ${inputItem?.title}`);
                        obj = {};
                    } else {
                        setDanger(false);
                        setShow(false);
                        setSweetAlertMessage("");

                        let gridData: any = selectedTreatmentType[id]
                            ? [...selectedTreatmentType[id], obj]
                            : [obj];
                        gridData = gridData
                            .map((item: any, index: number) => ({ ...item, sno: index + 1 }))
                            .filter((item: any) => item);
                        dispatch(
                            createEditTreatmentOnBoardDataAction({ ...createEditTreatmentOnBoardData, [treatmentType?.name]: {...selectedTreatmentType, [id]: gridData, ...clearInputFields} })
                        );
                    }
                }
                break;
        }
        return null;
    };

    const handleDisableSubmitCheck = () => {
        let isDisable = false;
        switch (config?.controlType) {
            case FieldControlTypes.GRID:
                {
                    for (let key in config?.formFields) {
                        let field = config?.formFields[key];
                        let isRequired = !field?.optional;
                        let isValueNull = _.isEmpty(selectedTreatmentType[key]);
                        if (isRequired && isValueNull) {
                            isDisable = true;
                            break;
                        }
                    }
                }
                break;
        }
        return isDisable;
    };

    return (
        <>
                <Container
                    className="m-0"
                    style={{ width: "100%" }}
                    //className={`${styles.viewCatchCertificate}`}
                    fluid>
                    <SweetAlert
                        success={isSuccess}
                        danger={isDanger}
                        info={isInfo}
                        title={sweetAlertTitle}
                        show={show}
                        onConfirm={sweetAlertOnConfirm}>
                        <label>{sweetAlertMessage}</label>
                    </SweetAlert>

                    <DailogComponent
                        id="dialog-cancel"
                        confirm={setConfirmation}
                        isVisible={isDialogVisible}
                        closeDailog={setVisibleDialog}
                        message={message}
                    />

                    <>
                        <Row>
                            <Col
                                className="mt-4"
                                // xs="1" sm="2" md="3" lg="4" xl="12"
                            >
                                <h6>Treatment Type License information</h6>
                            </Col>
                        </Row>
                        <Form
                            render={(formRenderProps) => {
                                return (
                                    <FormElement>
                                        <fieldset>
                                            <Row
                                            // xs={1} sm={2} lg={3} xl={4} className={"p-2"}
                                            >
                                                {config?.formFields &&
                                                    Object.keys(config?.formFields).length &&
                                                    stateArray().map((item: any, index: any) => {
                                                        return (
                                                            <>
                                                                <FormFumigationControlType {...item} treatmentType={treatmentType} isHideSubmitBtn={isHideSubmitBtn} />
                                                            </>
                                                        );
                                                    })}
                                                <Col key={"btn"} style={{ marginTop: 28 }}>
                                                    <Button
                                                        style={{ paddingLeft: 10, paddingRight: 10 }}
                                                        primary={true}
                                                        type={"button"}
                                                        onClick={handleAddSumbit}
                                                        disabled={handleDisableSubmitCheck() || isHideSubmitBtn}>
                                                        Add
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </fieldset>
                                    </FormElement>
                                );
                            }}
                        />
                        <Row className="mx-0">
                            <Col
                                className="p-0  grid-col mb-2 mx-0"
                                xs="12"
                                style={{
                                    background: "white",
                                    boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.08)"
                                }}>
                                <GridView
                                    heading={resources_EN.TPM_view_treatment_type_license_grid_Heading}
                                    skipColumn={0}
                                    takeColumn={10}
                                    data={selectedTreatmentType[id] ? selectedTreatmentType[id] : []}
                                    className={"shadow-0px h-100 " + styles.gridNoScroller}
                                    isSearchEnabled={false}
                                    searchableColumns={[]}
                                    pageable={true}
                                    reorderable={true}
                                    resizable={true}
                                    sortable={true}
                                    style={{ height: "50vh" }}>
                                    {columns.map((items: any, index: number) => {
                                        return (
                                            <Column
                                                key={index}
                                                gridColumn={columns}
                                                field={items.field}
                                                title={items.title}
                                                width={"auto"}
                                                cell={items.isAction ? ActionCell : null}
                                            />
                                        );
                                    })}
                                </GridView>
                            </Col>
                        </Row>
                    </>
                </Container>
            
        </>
    );
};

export default memo(TreatmentLicenseGrid);
