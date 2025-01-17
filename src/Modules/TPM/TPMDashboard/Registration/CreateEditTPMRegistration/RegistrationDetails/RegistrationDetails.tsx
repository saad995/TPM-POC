// Hooks
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect, ReactElement, useCallback } from "react";

import { Row, Col, Container } from "react-bootstrap";
import { Button } from "@progress/kendo-react-buttons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Grid, GridColumn as Column, GridItemChangeEvent } from "@progress/kendo-react-grid";

// import SearchNTN from "Modules/TPM/Common/SearchNTN/SearchNTN";
import Loader from "Elements/Basic/Loader/Loader";
import {
    FormCheckbox,
    FormComboBox,
    FormDatePicker,
    FormDropDown,
    FormInput,
    FormMultiSelect,
    FormNumericTextBox
} from "Elements/Basic/FormComponent/FormComponent";
import { resources_EN } from "Modules/TPM/Constants/Resources/Resources_EN";

// Redux
// import {
//     clearGetPremiseCreateFormElementsReducerState,
//     getPremiseCreateFormElementsAction
// } from "../../CreatePremiseRegistration/ReviewPremiseForm/ReviewPremiseFormActions";
import { stepAction } from "Modules/Common/Actions/SubscriptionActions";
import { RootStore } from "Store";

// Kendo UI
import { MultiSelect, MultiSelectChangeEvent, MultiSelectFilterChangeEvent } from "@progress/kendo-react-dropdowns";

import { Field } from "@progress/kendo-react-form";
import { Form, FormElement } from "@progress/kendo-react-form";

// Types
import { Role } from "Lib/Types/SharedTypes";
import { IGetDashboardInfoResponseData } from "Layouts/AppLayout/AppLayoutInterfaces";

// SCSS
import "./RegistrationDetails.scss";

import _ from "lodash";
import { Label } from "@progress/kendo-react-labels";
import {
    ActionViewGrid,
    ActionTypeId,
    Agency,
    ApplicationCodes,
    DocumentClassificationCode,
    DocumentInfo,
    PremisesAction,
    Action
} from "Modules/TPM/Constants/Interfaces";
// import {
//     IAgencyPremiseRegistrationDPP,
//     IAgencyPremiseRegistrationMFD,
//     IProps,
//     ISubmitPremiseRegistrationRequest
// } from "../../CreatePremiseRegistration/CreatePremiseRegistrationInterfaces";
import swal from "sweetalert";
// import { IGetPremiseCreateFormElements, IGetPremiseElementsRequestData } from "../../CreatePremiseRegistration/ReviewPremiseForm/ReviewPremiseFormInterface";
import moment from "moment";
import GridColumns from "Modules/TPM/Constants/GridColumns";
// import DetailedInfoBar, {
//     DetailedInfoBarButtonGroup
// } from "Modules/OGA/ReleaseOrder/View/DetailedInfoBar/DetailedInfoBar";
import { Splitter, SplitterOnChangeEvent } from "@progress/kendo-react-layout";
import Paths from "Modules/TPM/Constants/Paths";
import { IUpdateStoreObject } from "Modules/TPM/Common/UpdateStoreObject/UpdateStoreObjectInterfaces";
// import GenericForm from "Modules/TPM/Common/GenericForm";
import { customSortFunction, fetchGridDataFunc, getUserRoleAction } from "Modules/Common/Helpers/DateHelper";
import { updateStoreObjectAction } from "Modules/TPM/Common/UpdateStoreObject/UpdateStoreObjectActions";
// import {
//     clearPremiseFacilityItemsReducerState,
//     clearSaveFormDataState
// } from "Modules/TPM/Common/GenericGrid/GenericGridAction";
import { distinct, filterBy } from "@progress/kendo-data-query";
import {
    IKeyValue,
    ITreatmentTypeKeyValue,
    ItemRenderProps,
    TreatmentType,
    TreatmentTypeRegistrationStatus
} from "../CreateEditTPMRegistrationInterfaces";
import {
    GetTreatmentTypeByProviderIdAction,
    GetTreatmentTypeByProviderIdAction_customeUse,
    getTreatmentSubTypesListAction,
    getTreatmentTypeByProviderIdClear,
    getTreatmentTypesListAction,
    getUnRegisteredTPBusinessAction
} from "Modules/TPM/Common/CommonApi/CommonApiAction";
import { TPRegisterType } from "Modules/Common/Constants/Interfaces";
import { PanelBarComponent, PanelBarItemComponent } from "Elements/Basic/PanelBar/PanelBar";
import FormGenerator from "Elements/Custom/FormGenerator/FormGenerator";
import { FormConfig } from "./FormConfig";
import UploadDocumentFunction from "../../UploadDocumentFunction";
import { IAttachment } from "Modules/TPM/Common/UploadDocuments/UploadDocumentsInterfaces";
import GridTitle from "Modules/TPM/Common/GridTitle";
import {
    deleteTreatmentTypeRegistrationAction,
    saveTreatmentTypeRegistrationAction
} from "../CreateEditTPMRegistrationAction";
import {
    getCities,
    getCitiesListClear,
    getCities_customUse
} from "Modules/TPM/TreatmentCertificate/InitiateTreatmentRequest/InitiateTreatmentRequestAction";
import TreatmentLicenseGrid from "./TreatmentLicenseGrid";
import { TreatmentTypeLicenseGridColumns } from "../../Grid/GridColumnSize";
import Unauthorized from "Modules/Common/Unauthorized/Unauthorized";
import { FieldControlTypes } from "Elements/Custom/FormGenerator/FormGeneratorInterface";
import InitiateTreatmentRequestServices from "Modules/TPM/TreatmentCertificate/InitiateTreatmentRequest/InitiateTreatmentRequestServices";
import DailogComponent from "Elements/Basic/Dailog/DailogComponent";
import TreatmentTypeForm from "Elements/Custom/FormGenerator/TreatmentTypeForm";
import ImportSVG from "Lib/Helpers/CustomSVGImporter";
import { createEditTreatmentOnBoardDataClearAction } from "Elements/Custom/FormGenerator/FormGeneratorAction";
import { saveFormReqDataMapper } from "../../Utility";
import SearchCriteriaPanelComponent from "./SearchCriteriaPanelComponent";

const RegistrationDetails = (props: any) => {
    const { onSubmit, onSave } = props;

    let param: any = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const dashboardInfo: IGetDashboardInfoResponseData = useSelector(
        (state: RootStore) => state.dashboardReducer.dashboardInfo
    );
    const userRole = useSelector((state: RootStore) =>
        state.dashboardReducer.currentUserRole != undefined
            ? state.dashboardReducer.currentUserRole.Code
            : state.dashboardReducer.dashboardInfo.currentRole
    );

    const validationMsg = useSelector((state:RootStore) => state.FormGeneratorReducer.addValidationMsgs);

    const agencyId = Agency.DPP;
    const URL: any = Paths.Registration;

    const store = useSelector((state: RootStore) => state);
    const {
        CommonApiReducer,
        CreateEditTPRegistrationReducer,
        InitiateTreatmentRequestReducer,
        FormGeneratorReducer
    } = store;
    const {
        treatmentProviderBusines,
        treatmentTypes,
        getTreatmentTypesByTPId,
        getTreatmentTypesByTPIdLoading
    } = CommonApiReducer;
    const { confirmTreatmentTypes, saveTreatmentType } = CreateEditTPRegistrationReducer;
    const { createEditTreatmentOnBoardData } = FormGeneratorReducer;
    const { cities } = InitiateTreatmentRequestReducer;
    const loading = getTreatmentTypesByTPIdLoading;

    const [formConfig, setFormConfig] = useState<any>({} as any);
    const [treatmentTypesFormConfig, setTreatmentTypesFormConfig] = useState<any>({} as any);
    const [filesAttachedByOfficer, setFilesAttachedByOfficer] = useState([] as IAttachment[]);
    const [uploadedDocuments, setUploadedDocuments] = useState([]);
    const [isAllMandatoryFilesUploaded, setIsAllMandatoryFilesUploaded] = useState(false);
    const [isConfirm, setConfirmation] = useState(false);
    const [type, setType] = useState("");
    const [saveFormData, setSaveFormData] = useState<any>({} as any);
    const [deleteFormData, setDeleteFormData] = useState<any>({} as any);
    const [isUnauthorized, setIsUnauthorized] = useState(false);
    const [message, setMessage] = useState("");
    const [isDialogVisible, setVisibleDialog] = useState(false);
    const [selectedTreatmentType, setSelectedTreatmentType] = useState<any>({});
    const [btnDisable,setBtnDisable] = useState(false);
console.log({filesAttachedByOfficer})


    const handleBack = () => {
        dispatch(stepAction(0));
    };
    const handleSaveTreatmentType = ({ formData, data }: any) => {
        setSaveFormData({ formData, data });
        setConfirmation(true);
        setType(Action.Save);
    };

    const handleDone = () => {
        if (getTreatmentTypesByTPId && getTreatmentTypesByTPId?.treatmentTypes?.length === 1 && type == Action.Delete) {
            onSave(0);
        }
        // setShow(false);
        setVisibleDialog(false);
    };

    const handleDeleteTreatmentType = (data: any) => {
        setDeleteFormData(data);
        setVisibleDialog(true);
        setMessage(resources_EN.TPM_registration_delete_message);
        //  setConfirmation(true);
        setType(Action.Delete);
        return null;
    };

    const saveFormDataMapper = (formData: any, data: any) => {
        const { treatmentProviderId, agencyBusinessRegistration, treatmentTypes } = getTreatmentTypesByTPId; //treatmentProvider data

        console.log({createEditTreatmentOnBoardData})
        const {
            treatmentProviderUserRoleId,
            principalActivity,
            companyName,
            businessName,
            ntn
        } = agencyBusinessRegistration;
        const {
            documentTypeCode,
            treatmentTypeRegistrationId,
            treatmentTypeId,
            name,
            isSubType,
        } = data;
        const {
            cellNumber,
            city,
            emailAddress,
            officeAddress,
            phoneNumber,
            plantAddress,
            plantCapacity,
            productionUnitCode,
            validUpto,
            ispmMark,
            treatmentOperatorLicenseNumber,
            treatmentOperatorName,
            treatmentSubTypes
        } = formData;
      //  console.log("save form data ===>>>>", formData);
        let req = {
            treatmentProviderId: treatmentProviderId,
            agencyBusinessRegistration: {
                ...agencyBusinessRegistration,
                agencyId: agencyId,
                registrationTypeCode: DocumentInfo.TREATMENT_REG_DOC_TYPE_CODE
            },
            treatmentTypeInformation: {
                ...formData,
                //...data,
                cityId: city && Object.keys(city).length > 0 ? city?.value : 0,
                city: city && Object.keys(city).length > 0 ? city?.label : "",
                productionUnitCode: productionUnitCode ? productionUnitCode : "",
                cellNumber: cellNumber ? cellNumber : "",
                emailAddress: emailAddress ? emailAddress : "",
                plantAddress: plantAddress ? plantAddress : "",
                officeAddress: officeAddress ? officeAddress : "",
                validUpto: validUpto ? moment(validUpto).format("YYYY-MM-DD") : "",
                ispmMark: ispmMark ? ispmMark : "",
                treatmentOperators: [], //TODO: remove this
                treatmentTypeRegistrationId: treatmentTypeRegistrationId,
                treatmentTypeId: treatmentTypeId,
                name: name,
                documentTypeCode: documentTypeCode,
                isSubType: isSubType,
                isSaveCompleted: false,
                treatmentProviderUserRoleId: treatmentProviderUserRoleId,
                companyName: companyName,
                businessName: businessName,
                ntn: ntn,
                principalActivity: principalActivity,
                treatmentTypeAttachments: filesAttachedByOfficer.map((attachment) => ({
                    ...attachment,
                    fileIdS: attachment?.fileNestFileId
                })),
                treatmentSubTypes: isSubType ? treatmentSubTypes : []
            }
        };
        return req;
    };

    const handleChangeTreatmentType = (event: any) => {
        if (event && event?.value) {
            setFormConfig((prev: any) => FormConfig);
            setSelectedTreatmentType(event?.value);
           // dispatch(createEditTreatmentOnBoardDataClearAction());
        }
    };

    const handleCheckIsSubmitBtnDisable = () => {
        let isDisabled: boolean = false;
       
        if (getTreatmentTypesByTPId && Object.keys(getTreatmentTypesByTPId).length > 0) {
            isDisabled = getTreatmentTypesByTPId?.treatmentTypes.every(
                (treatmentType: any) => treatmentType?.isSaveCompleted && !btnDisable
                
            );
        }
        return !isDisabled;
    };
    useEffect(() => {
        const disabledBtn = checkFieldValidations(validationMsg)
       setBtnDisable(disabledBtn);
    },[validationMsg])


    const checkFieldValidations = (messages:any):boolean =>  {

        let disabled = false;
        for(const [key,val] of Object.entries(messages))
        {
        
            if(!_.isEmpty(val))
            {
                disabled = true;
                return disabled;
            }
           
            
        }
        return disabled;
    }

    useEffect(() => {
        if (isConfirm) {
            if (type === Action.Delete) {
                if (getTreatmentTypesByTPId) {
                    const { treatmentProviderId, agencyBusinessRegistration, treatmentTypes } = getTreatmentTypesByTPId; //treatmentProvider data
                    const {
                        documentTypeCode,
                        treatmentTypeRegistrationId,
                        treatmentTypeId,
                        name,
                        isSubType,
                        treatmentSubTypes
                    } = deleteFormData;
                    let req = {
                        treatmentProviderId: treatmentProviderId,
                        treatmentTypeRegistrationId: treatmentTypeRegistrationId,
                        treatmentTypeRegistrationStatusId: TreatmentTypeRegistrationStatus.CANCELLED
                    };
                    dispatch(
                        deleteTreatmentTypeRegistrationAction(req, (res: any) => {
                            if (
                                res?.hasOwnProperty("code")
                                    ? res.code !== "200"
                                    : res?.hasOwnProperty("message")
                                    ? res?.message?.code !== "200"
                                    : false
                            ) {
                                let message: any = res?.message;

                                swal({
                                    title: resources_EN.sweet_Alert_title_Failed,
                                    text:
                                        message.code == ApplicationCodes.BAD_REQUEST
                                            ? message.description
                                            : resources_EN.TPM_Registration_delete_msg,
                                    icon: "error"
                                });
                                setVisibleDialog(false);
                                setMessage("");
                                // setType(Action.SaveChanges); //setting type to saveChanges to avoid routing
                                // handleInfoAlert(res.description || res.message.description, "Error", true);
                            } else {
                                let message: any = res?.message;
                                // let swalMsg = message.code == ApplicationCodes.SUCCESS
                                // ? message.description
                                // : resources_EN.TPM_Registration_delete_msg;
                                let swalMsg = resources_EN.TPM_Registration_delete_msg;

                                if (getTreatmentTypesByTPId && getTreatmentTypesByTPId?.treatmentTypes?.length === 1) {
                                    swalMsg =
                                        "Note: You deleted all your selected treatment types, Please select confirm button to redirect to step 1";
                                }

                                swal({
                                    title: resources_EN.sweet_Alert_title_Deleted,
                                    text: swalMsg,
                                    icon: "success"
                                    // html: true,
                                    //content: swalMsg,
                                }).then((willDelete: any) => {
                                    if (willDelete) {
                                        if (
                                            getTreatmentTypesByTPId &&
                                            getTreatmentTypesByTPId?.treatmentTypes?.length === 1
                                        ) {
                                            handleDone();
                                        }
                                    }
                                });

                                setVisibleDialog(false);
                                setMessage("");
                                let req = {
                                    treatmentProviderId: treatmentProviderId,
                                    initDocumentTypeCode: DocumentInfo.TREATMENT_REG_DOC_TYPE_CODE,
                                    roleCode: userRole,
                                    rights: ""
                                };
                                dispatch(
                                    GetTreatmentTypeByProviderIdAction_customeUse(req, () => {
                                        setIsUnauthorized(true);
                                    })
                                );
                            }
                        })
                    );
                }
            } else if (type === Action.Save) {
                const { formData, data } = saveFormData;
                let req: any = {};
                //if(data?.name == TreatmentType.Fumigation){
                    req = saveFormReqDataMapper(formData, data, getTreatmentTypesByTPId);
                // }
                // else{
                //     req = saveFormDataMapper(formData, data);
                // }

                dispatch(
                    saveTreatmentTypeRegistrationAction(req, (res: any) => {
                        if (
                            res?.hasOwnProperty("code")
                                ? res.code !== ApplicationCodes.SUCCESS
                                : res?.hasOwnProperty("message")
                                ? res?.message?.code !== ApplicationCodes.SUCCESS
                                : false
                        ) {
                            let message: any = res; //.message ? res?.message : res?.description;
                            swal({
                                title: resources_EN.sweet_Alert_title_Failed,
                                text:
                                
                                    message.code == ApplicationCodes.BAD_REQUEST
                                        ? 
                                        /* Changing AS Per Observation Should be Message From Backend */
                                        // resources_EN.TPM_Registration_General_mandatory_form_fields_error_msg//message.description
                                        message.description
                                        : resources_EN.TPM_Registration_General_error_msg,
                                icon: "info"
                            });
                        } else {
                            let message: any = res?.message;
                            swal({
                                title: resources_EN.sweet_Alert_title_Saved,
                                text:
                                    message.code == ApplicationCodes.SUCCESS
                                        ? message.description
                                        : resources_EN.TPM_Registration_save_msg,
                                icon: "success"
                            });

                            let getProvidersReq = {
                                treatmentProviderId: req?.treatmentProviderId,
                                initDocumentTypeCode: DocumentInfo.TREATMENT_REG_DOC_TYPE_CODE,
                                roleCode: userRole,
                                rights: ""
                            };
                            // dispatch(createEditTreatmentOnBoardDataClearAction());

                            dispatch(
                                GetTreatmentTypeByProviderIdAction_customeUse(getProvidersReq, () => {
                                    setIsUnauthorized(true);
                                })
                            );
                        }
                    })
                );
            }

            setConfirmation(false);
        }
    }, [isConfirm]);

    const handleSubmit = () => {
        if (getTreatmentTypesByTPId) {
            const { treatmentProviderId, agencyBusinessRegistration, treatmentTypes } = getTreatmentTypesByTPId;

            const treatementTypeIds = treatmentTypes?.map(
                (treatmentType: any) => treatmentType.treatmentTypeRegistrationId
            );

            let data = {
                treatmentProviderId: treatmentProviderId,
                savedTreatmentTypeIds: treatementTypeIds
            };
            onSubmit(data);
        }
    };

    const handleCancel = (data: any) => {};

    const handleDisableSubmitCheck = () => {
        //  console.log({})
        return false;
    };

    function reverseDateFormate(str: any) {
        if (!_.isNil(str)) {
            const splitDate = str.split("-");
            const date = splitDate[2] + "-" + splitDate[1] + "-" + splitDate[0] + " " + "GMT";
            return new Date(date); //new Date("2022-5-19 GMT");
        }
        return str;
    }

    useEffect(() => {
        if (getTreatmentTypesByTPId && Object.keys(getTreatmentTypesByTPId).length > 0) {
            setFormConfig(FormConfig);
            setSelectedTreatmentType(getTreatmentTypesByTPId?.treatmentTypes[0]);
        }
    }, [getTreatmentTypesByTPId]);

    const SearchCriteriaPanel = useCallback(
        (data: any, agencyBusinessData: any) => {
            if (data && Object.keys(data).length > 0) {
                const { documentTypeCode, isSubType, name } = data;
                let payload = {
                    status,
                    documentGroupCode: documentTypeCode,
                    setFilesAttachedByOfficer,
                    setIsAllMandatoryFilesUploaded,
                    setUploadedDocuments,
                    data
                };
                let isHideSaveBtn = data?.treatmentTypeRegistrationStatusId === TreatmentTypeRegistrationStatus.ACTIVATED ? true : false;
                //let isHideCancelBtn = false;
                let isHideCancelBtn = data?.treatmentTypeRegistrationStatusId === TreatmentTypeRegistrationStatus.ACTIVATED ? true : false;
                let isDisabled = data?.treatmentTypeRegistrationStatusId  === TreatmentTypeRegistrationStatus.ACTIVATED ? true : false;

            //    if (name == TreatmentType.Fumigation) {
                    let fumigationData:any = {
                        treatmentType: data,
                        agencyBusinessData,
                        handleSubmit: handleSaveTreatmentType,
                        oncancel: handleDeleteTreatmentType,
                        isHideSaveBtn,
                        isHideCancelBtn,
                        treatmentTypeUploadDocPayload: payload,
                        isDisabled,
                        documentGroupCode: documentTypeCode
                    };
                    return <SearchCriteriaPanelComponent {...fumigationData} />;
                // } 
                // else if (name == "Formalin Treatment") {
                //     let updatedformConfig = treatmentEditDataMapper(data, agencyBusinessData);
                //     let formMappeders = { ...updatedformConfig };
                //     delete formMappeders?.productionUnitCode;
                //     delete formMappeders?.treatmentSubTypes;

                //     return (
                //         <FormGenerator
                //             formState={formMappeders}
                //             data={data}
                //             handleSubmit={handleSaveTreatmentType}
                //             oncancel={handleDeleteTreatmentType}
                //             handleDisableSubmitCheck={handleDisableSubmitCheck}
                //             isHideSubmitBtn={isHideSaveBtn}
                //             isHideCancelBtn={isHideCancelBtn}>
                //             <UploadDocumentFunction {...payload} />
                //         </FormGenerator>
                //     );
                // } else if (name == "Vapor Heat Treatment") {
                //     // console.log({formConfig});
                //     let updatedformConfig = treatmentEditDataMapper(data, agencyBusinessData);
                //     let formMappeders = { ...updatedformConfig };
                //     //delete formMappeders?.ispmMark;
                //     delete formMappeders?.treatmentSubTypes;

                //     // console.log({formMappeders})

                //     if (name == "Hot Water Treatment" || name == "Vapor Heat Treatment" || name == "Cold Treatment") {
                //         delete formMappeders?.ispmMark;
                //     } else {
                //         delete formMappeders?.productionUnitCode;
                //     }
                //    // console.log({ formMappeders });
                //     // if(formMappeders['phoneNumber'] ){

                //     // }

                //     return (
                //         <FormGenerator
                //             formState={formMappeders}
                //             data={data}
                //             handleSubmit={handleSaveTreatmentType}
                //             oncancel={handleDeleteTreatmentType}
                //             handleDisableSubmitCheck={handleDisableSubmitCheck}
                //             isHideSubmitBtn={isHideSaveBtn}
                //             isHideCancelBtn={isHideCancelBtn}>
                //             <UploadDocumentFunction {...payload} />
                //         </FormGenerator>
                //     );
                // } else if (name == "Hot Water Treatment") {
                //     let updatedformConfig = treatmentEditDataMapper(data, agencyBusinessData);
                //     let formMappeders = { ...updatedformConfig };
                //     //delete formMappeders?.ispmMark;
                //     delete formMappeders?.treatmentSubTypes;

                //     // console.log({formMappeders})

                //     if (name == "Hot Water Treatment" || name == "Vapor Heat Treatment" || name == "Cold Treatment") {
                //         delete formMappeders?.ispmMark;
                //     } else {
                //         delete formMappeders?.productionUnitCode;
                //     }
                //     //console.log({formMappeders});
                //     return (
                //         <FormGenerator
                //             formState={formMappeders}
                //             data={data}
                //             handleSubmit={handleSaveTreatmentType}
                //             oncancel={handleDeleteTreatmentType}
                //             handleDisableSubmitCheck={handleDisableSubmitCheck}
                //             isHideSubmitBtn={isHideSaveBtn}
                //             isHideCancelBtn={isHideCancelBtn}>
                //             <UploadDocumentFunction {...payload} />
                //         </FormGenerator>
                //     );
                // } else if (name == "Cold Treatment") {
                //     let updatedformConfig = treatmentEditDataMapper(data, agencyBusinessData);

                //     let formMappeders = { ...updatedformConfig };
                //     //delete formMappeders?.ispmMark;
                //     delete formMappeders?.treatmentSubTypes;

                //     // console.log({formMappeders})

                //     if (name == "Hot Water Treatment" || name == "Vapor Heat Treatment" || name == "Cold Treatment") {
                //         delete formMappeders?.ispmMark;
                //     } else {
                //         delete formMappeders?.productionUnitCode;
                //     }
                //     // console.log({formMappeders});
                //     return (
                //         <FormGenerator
                //             formState={formMappeders}
                //             data={data}
                //             handleSubmit={handleSaveTreatmentType}
                //             oncancel={handleDeleteTreatmentType}
                //             handleDisableSubmitCheck={handleDisableSubmitCheck}
                //             isHideSubmitBtn={isHideSaveBtn}
                //             isHideCancelBtn={isHideCancelBtn}>
                //             <UploadDocumentFunction {...payload} />
                //         </FormGenerator>
                //     );
                // } else if (name == "Irradiation Treatment") {
                //     let updatedformConfig = treatmentEditDataMapper(data, agencyBusinessData);
                //     let formMappeders = { ...updatedformConfig };
                //     //delete formMappeders?.ispmMark;
                //     delete formMappeders?.treatmentSubTypes;
                //     if (name == "Hot Water Treatment" || name == "Vapor Heat Treatment" || name == "Cold Treatment") {
                //         delete formMappeders?.ispmMark;
                //     } else {
                //         delete formMappeders?.productionUnitCode;
                //     }
                //     // console.log({formMappeders});
                //     return (
                //         <FormGenerator
                //             formState={formMappeders}
                //             data={data}
                //             handleSubmit={handleSaveTreatmentType}
                //             oncancel={handleDeleteTreatmentType}
                //             handleDisableSubmitCheck={handleDisableSubmitCheck}
                //             isHideSubmitBtn={isHideSaveBtn}
                //             isHideCancelBtn={isHideCancelBtn}>
                //             <UploadDocumentFunction {...payload} />
                //         </FormGenerator>
                //     );
                // } else if (name == "Heat Treatment") {
                //     let updatedformConfig = treatmentEditDataMapper(data, agencyBusinessData);
                //     let formMappeders = { ...updatedformConfig };
                //     //delete formMappeders?.ispmMark;
                //     delete formMappeders?.treatmentSubTypes;

                //     // console.log({formMappeders})

                //     if (name == "Hot Water Treatment" || name == "Vapor Heat Treatment" || name == "Cold Treatment") {
                //         delete formMappeders?.ispmMark;
                //     } else {
                //         delete formMappeders?.productionUnitCode;
                //     }
                //     // console.log({formMappeders});
                //     return (
                //         <FormGenerator
                //             formState={formMappeders}
                //             data={data}
                //             handleSubmit={handleSaveTreatmentType}
                //             oncancel={handleDeleteTreatmentType}
                //             handleDisableSubmitCheck={handleDisableSubmitCheck}
                //             isHideSubmitBtn={isHideSaveBtn}
                //             isHideCancelBtn={isHideCancelBtn}>
                //             <UploadDocumentFunction {...payload} />
                //         </FormGenerator>
                //     );
                // }
            }
        },
        [selectedTreatmentType, formConfig]
    );

    useEffect(() => {
        if (confirmTreatmentTypes && Object.keys(confirmTreatmentTypes).length > 0) {
            const { treatmentProviderId } = confirmTreatmentTypes;

            let req = {
                treatmentProviderId: treatmentProviderId,
                initDocumentTypeCode: DocumentInfo.TREATMENT_REG_DOC_TYPE_CODE,
                roleCode: userRole,
                rights: "",
            };
            if (cities?.length == 0) {
                dispatch(getCities_customUse({ agencyId: Agency.DPP }));
            }
            dispatch(
                GetTreatmentTypeByProviderIdAction_customeUse(req, () => {
                    setIsUnauthorized(true);
                })
            );
        }
    }, [confirmTreatmentTypes]);

    // TODO: For testing purposes only
    //{"methodId":"5037","data":{"treatmentProviderId":"XkDQyD03BvtMFxQbSwdPNQ==","initDocumentTypeCode":"C09","roleCode":"OAA","rights":""},"pagination":{}}
    // useEffect(() => {
    //     let req = {
    //         initDocumentTypeCode: DocumentInfo.TREATMENT_REG_DOC_TYPE_CODE,
    //         roleCode: userRole,
    //         treatmentProviderId: "+R8N4Sn/uqE6xkAMHRor/A==",//"XkDQyD03BvtMFxQbSwdPNQ==",
    //         rights: ""
    //     };
    //     if(cities?.length == 0){
    //         dispatch(getCities_customUse({ agencyId: Agency.DPP }))
    //      }
    //     dispatch(GetTreatmentTypeByProviderIdAction_customeUse(req,()=>{
    //         setIsUnauthorized(true)
    //     }));
    // }, []);

    useEffect(() => {
        dispatch(getCities_customUse({ agencyId: agencyId }));

        return () => {
            setFilesAttachedByOfficer([]);
            setUploadedDocuments([]);
            setIsAllMandatoryFilesUploaded(false);
            dispatch(getTreatmentTypeByProviderIdClear());
            //dispatch(createEditTreatmentOnBoardDataClearAction());
            // dispatch(getCitiesListClear());
        };
    }, []);

    let TreatmentProviderBusinessName = "";
    if (getTreatmentTypesByTPId) {
        TreatmentProviderBusinessName =
            getTreatmentTypesByTPId?.agencyBusinessRegistration?.businessName +
            " " +
            getTreatmentTypesByTPId?.agencyBusinessRegistration?.ntn;
    }

    let expandContent = "";

    if (selectedTreatmentType?.treatmentTypeRegistrationStatusId === TreatmentTypeRegistrationStatus.ACTIVATED) {
        expandContent = expandContent = selectedTreatmentType?.name + " - " + "Activated ";
    } else if (selectedTreatmentType?.treatmentTypeRegistrationStatusId === TreatmentTypeRegistrationStatus.DRAFT) {
        expandContent = selectedTreatmentType?.name + " - " + "Drafted "; //+ '<ImportSVG name="check-circle-outline" color="green" size={16} title={"Activate"}  />'
    } else {
        expandContent = selectedTreatmentType?.name;
    }

    return (
        <Container className="h-100 m-t" fluid>
    
            <DailogComponent
                id="dialog-cancel"
                confirm={setConfirmation}
                isVisible={isDialogVisible}
                closeDailog={setVisibleDialog}
                message={message}
                btnName1="Cancel"
                btnName2="Confirm"
            />
            {loading ? (
                <Loader className={"position-absolute"} />
            ) : isUnauthorized ? (
                <Unauthorized />
            ) : (
                <>
                    <Row>
                        <Col>
                            <div className="base-lg mt-2">
                                {" "}
                                <span className=" p-3 base-lg font-semibold"> Treatment Provider: </span>
                                {TreatmentProviderBusinessName}
                            </div>
                            <p className="text-muted mt-2 mx-3">
                                {" "}
                                <em>{resources_EN.tpm_registration_save_Note}</em>
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={`mb-2 mx-3`}>
                            <Form
                                render={(formRenderProps: any) => (
                                    <FormElement>
                                        <fieldset className={"k-form-fieldset"}>
                                            <Row className={"m-0 "}>
                                                <Col className="p-0">
                                                    <Field
                                                        id={"treatmentType"}
                                                        name={"treatmentType"}
                                                        label={"Select Treatment Type"}
                                                        component={FormComboBox}
                                                        textField="name"
                                                        dataItemKey="name"
                                                        placeholder={"Select Treatment Type"}
                                                        data={getTreatmentTypesByTPId?.treatmentTypes && getTreatmentTypesByTPId?.treatmentTypes.length > 0 ? getTreatmentTypesByTPId?.treatmentTypes : []}
                                                        onChange={handleChangeTreatmentType}
                                                        filterable={true}
                                                        value={
                                                            selectedTreatmentType &&
                                                            Object.keys(selectedTreatmentType)?.length > 0
                                                                ? selectedTreatmentType
                                                                : {}
                                                        }
                                                        //onFilterChange={onCountryFilterChange}
                                                        //value={country}
                                                        autocomplete={false}
                                                    />
                                                </Col>
                                            </Row>
                                        </fieldset>
                                    </FormElement>
                                )}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <PanelBarComponent className={`mt-2 mx-3 customPannel`}>
                                {selectedTreatmentType &&
                                Object.keys(selectedTreatmentType)?.length > 0 &&
                                getTreatmentTypesByTPId &&
                                Object.keys(getTreatmentTypesByTPId)?.length > 0 ? (
                                    <PanelBarItemComponent
                                        aria-expanded="true"
                                        aria-selected="true"
                                        aria-hidden="false"
                                        key={"index"}
                                        title={
                                            <GridTitle
                                                content={expandContent}
                                                isCountHide={true}
                                                isContentIconShow={true}
                                                contentIcon={
                                                    <ImportSVG
                                                        name="check-circle-outline"
                                                        color="white"
                                                        size={16}
                                                        title={"Activate"}
                                                    />
                                                }
                                            />
                                        }
                                        expanded={true}
                                        expandMode={"multiple"}
                                        animation={true}>
                                        {SearchCriteriaPanel(
                                            selectedTreatmentType,
                                            getTreatmentTypesByTPId?.agencyBusinessRegistration
                                        )}
                                    </PanelBarItemComponent>
                                ) : null}
                            </PanelBarComponent>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs="auto" className="mt-4 mr-2">
                            <Button
                                onClick={handleBack}
                                primary={true}
                                // variant="outline-primary"
                            >
                                Back
                            </Button>
                        </Col>
                        <Col>
                            <div className="k-form-buttons p-2 justify-content-end border-top mt-4 ">
                                {/* <Button onClick={handleCancel}>Back</Button> */}

                                {/* <Button onClick={handleCancel}>Cancel</Button> */}
                                <Button
                                    primary={true}
                                    type={"submit"}
                                    onClick={handleSubmit}
                                    disabled={ 
                                        handleCheckIsSubmitBtnDisable() 
                                    }>
                                    Submit
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
};

export default RegistrationDetails;