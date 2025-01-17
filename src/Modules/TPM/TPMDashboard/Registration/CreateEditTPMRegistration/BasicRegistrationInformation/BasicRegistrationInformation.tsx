// Hooks
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect, ReactElement, useLayoutEffect } from "react";

import { Row, Col, Button, Container } from "react-bootstrap";
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
import Styles from "./BasicRegistrationInformation.module.scss";

import _ from "lodash";
import { Label } from "@progress/kendo-react-labels";
import {
    ActionViewGrid,
    ActionTypeId,
    Agency,
    ApplicationCodes,
    DocumentClassificationCode,
    DocumentInfo,
    PremisesAction
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
import { filterBy } from "@progress/kendo-data-query";
import { IDummyDeleteTreatmentTypeData, ITreatmentTypeKeyValue, ItemRenderProps, LastOption } from "../CreateEditTPMRegistrationInterfaces";
import {
    GetTreatmentTypeByProviderIdAction_customeUse,
    getTreatmentTypeClear,
    getTreatmentTypesListAction,
    getUnRegisteredTPBusinessAction
} from "Modules/TPM/Common/CommonApi/CommonApiAction";
import { TPRegisterType } from "Modules/Common/Constants/Interfaces";
import { ConfirmStep1Action } from "../CreateEditTPMRegistrationAction";
import { getCities_customUse, getTreatmentType } from "Modules/TPM/TreatmentCertificate/InitiateTreatmentRequest/InitiateTreatmentRequestAction";
import DailogComponent from "Elements/Basic/Dailog/DailogComponent";
import AlertDismissible from "Elements/Basic/AlertDismissible/AlertDismissible";

const BasicRegistrationInformation = (props: any) => {
    const { onSubmit } = props;

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

    const loading = false;
    let agencyId = Agency.DPP;
 

    const store = useSelector((state: RootStore) => state);
    const { CommonApiReducer, CreateEditTPRegistrationReducer, InitiateTreatmentRequestReducer, alert} = store;
    const { treatmentProviderBusines, treatmentTypes } = CommonApiReducer;
    const {confirmTreatmentTypes, saveTreatmentType} = CreateEditTPRegistrationReducer;
    const {cities} = InitiateTreatmentRequestReducer;
    const { visible,   variant, description } =alert;
    

    let _treatmentTypes = treatmentTypes//.filter((item:any)=>item.id != 7);
    // const { premiseRegistrationElements, loading } = ReviewPremiseFormReducer;
    // const { premiseFileUpload } = PremiseRegisterUploadReducer;
    // const { premiseList, premiseFormData } = GenericGridReducer;

    let gridInfoStoreHistory = history.location.state;
    // const gridInfoStoreReducer: IUpdateStoreObject = useSelector((state: RootStore) => state.updateStoreReducer.store);
    // const gridInfoStore = gridInfoStoreHistory != null ? gridInfoStoreHistory : gridInfoStoreReducer;
    // const agencyId: number = props.agencyId ?? gridInfoStore.agencyId;
    //const  URL:any = getUserRoleAction(userRole);
    const URL:any  = Paths.Registration;
    const [createElements, setCreateElements] = useState<any>({} as any);
    const [isSubmit, setIsSubmit] = useState(false);
    const [isUnauthorized, setIsUnauthorized] = useState(false);
    const [panes, setPanes] = useState<Array<any>>([{ min: "360px" }]);

    const [isSecondOpen, setIsSecondOpen] = useState(false);

    const [DetailedInfo, setDetailedInfo] = useState("");

    const [MainArea, setMainArea] = useState<string | undefined>(undefined);
    const [secondaryArea, setSecondaryArea] = useState<string | undefined>(undefined);
    const [localStorageData, setLocalStorageData] = useState<any>();
    const [isEditPage, setIsEditPage] = useState(false);
    const [subTreatmentTypesList, setSubTreatmentTypesList] = useState<any>([]);
    const [selectedTreatmentProvider, setSelectedTreatmentProvider] = useState({});
    const [isCreate, setIsCreate] = useState(true);
    const [labTypeFilteredData, setLabTypeFilteredData] = React.useState<IKeyValue[]>([]);
    const [selectedTreatmentTypes, setSelectedTreatmentTypes] = useState<IKeyValue[]>([]);
    const [isConfirm, setConfirmation] = useState(false);
    const [message, setMessage] = useState("");
    const [isDialogVisible, setVisibleDialog] = useState(false);
    const [dummyDataForDeleteTreatmentType,setDummyDataForDeleteTreatmentType] = useState<IDummyDeleteTreatmentTypeData>({
        eventData:[],
        isLastOption:0,
    });        


    
    useEffect(() => {
        if (localStorageData && Object.keys(localStorageData).length) {
            let actionType = ActionViewGrid.IN_QUEUE;

            if (window?.location?.pathname.includes(URL.Renewal)) {
                actionType = ActionViewGrid.RENEWAL;
            } else if (window?.location?.pathname.includes(URL.Amendment)) {
                actionType = ActionViewGrid.AMENDMENT;
            } else {
                actionType = ActionViewGrid.IN_QUEUE;
            }

            const requestData: any = {
                agencyID: localStorageData?.agencyId,
                documentTypeCode: localStorageData?.initDocumentTypeCode,
                roleCode: Role.Trader,
                rights: "",
                premiseRegistrationId: localStorageData?.initDocumentID,
                actionTypeId: actionType,
                actionId: PremisesAction.CREATE,
                currentRecordId: localStorageData?.currentRecordId
            };

            // dispatch(
            //     getPremiseCreateFormElementsAction(requestData, (res: any) => {
            //         setIsUnauthorized(true);
            //     })
            // );
        }
    }, [
        localStorageData
        //,premiseFileUpload
    ]);


useEffect(() => {
    if (cities?.length == 0) {
        dispatch(getCities_customUse({ agencyId: Agency.DPP }));
    }
}, []);

const handleConfirm = ()=>{
    
    switch(dummyDataForDeleteTreatmentType.isLastOption)
    {
        case LastOption.isNotLast:
            setSelectedTreatmentTypes(dummyDataForDeleteTreatmentType?.eventData);
            break;
        case LastOption.isLast:
            setSelectedTreatmentTypes([]);
            break;
        default:
            break;
    }
    
    setDummyDataForDeleteTreatmentType({
        eventData:[],
        isLastOption:0,
    });
    setVisibleDialog(false);
    return true;
}


    const handleSubmit = (formData: any) => {
        let data = {
            ...formData,
            selectedTreatmentProvider,
            selectedTreatmentTypes
        };
        if (data) {
            const { NTN, agencyID, businessName, requestDocumentTypeCode } = data?.selectedTreatmentProvider;

            let req = {
                treatmentProviderId: isCreate ? null : data?.selectedTreatmentProvider?.id,
                agencyBusinessRegistration: {
                    ...data?.selectedTreatmentProvider,
                    agencyId: agencyID,
                    registrationTypeCode: requestDocumentTypeCode,
                    ntn: NTN,
                    businessName: businessName,
                    agencyBusinessRegistrationId: data?.selectedTreatmentProvider?.id,
                    companyName: data?.selectedTreatmentProvider?.companyName,
                    principalActivity: data?.selectedTreatmentProvider?.principalActivity
                },
                selectedTreatmentTypes: data?.selectedTreatmentTypes.filter((item:any)=> item?.id > 0).map((item: any) => ({ ...item, isSelected: true }))
                // [
                //     {
                //         "id": 1,
                //         "name": "Sample Treatment Type",
                //         "isSelected": false
                //     },
                //     {
                //         "id": 2,
                //         "name": "Sample Treatment Type",
                //         "isSelected": false
                //     }
                // ]
            };
            dispatch(
                ConfirmStep1Action(req, (res: any) => {
                    if (
                        res?.hasOwnProperty("code")
                            ? res.code !== ApplicationCodes.SUCCESS
                            : res?.hasOwnProperty("message")
                            ? res?.message?.code !== ApplicationCodes.SUCCESS
                            : false
                    ) {
                        let message:any = res?.message;

                        swal({
                            title: resources_EN.sweet_Alert_title_Failed,
                            text:
                                message.code == ApplicationCodes.BAD_REQUEST
                                    ? message.description
                                    : resources_EN.TPM_Registration_General_error_msg,
                            icon: "error"
                        });
                        // setType(Action.SaveChanges); //setting type to saveChanges to avoid routing
                        // handleInfoAlert(res.description || res.message.description, "Error", true);
                    } else {
                       // props?.onSave(1);

                        let req = {
                            treatmentProviderId: res?.treatmentProviderId,
                            initDocumentTypeCode: DocumentInfo.TREATMENT_REG_DOC_TYPE_CODE,
                            roleCode: userRole,
                            rights: "",
                        };

                        dispatch(
                            GetTreatmentTypeByProviderIdAction_customeUse(req)
                        );
                        // props?.onSave(1);

                        // setShow(!show);
                        // setSweetAlertTitle(resources_EN.sweet_Alert_title_Approved);
                        // setSuccess(true);
                        // setDanger(false);
                        // setInfo(false);
                        // setSweetAlertMessage(approveMsg);
                    }
                })
            );
        }
    };

    let resizeEvent: any;
    if (typeof Event === "function") {
        resizeEvent = new Event("resize");
    } else {
        /*IE*/
        resizeEvent = document.createEvent("Event");
        resizeEvent.initEvent("resize", true, true);
    }

    const handleOpen = (stateVariable: string) => {
        let splitter: HTMLDivElement = document.getElementById("ReviewPremiseFormSplit")?.firstChild as HTMLDivElement;
        setPanes([...panes, { size: "50%", min: "360px" }]);
        setIsSecondOpen(true);

        setMainArea((splitter?.clientWidth * (50 / 100)).toString() + "px");
        setSecondaryArea((splitter?.clientWidth * (50 / 100)).toString() + "px");

        setDetailedInfo(stateVariable);
        setTimeout(() => {
            window.dispatchEvent(resizeEvent);
        }, 10);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        if (stateVariable === "openAmmentmentRequest") {
            // setlableExportCertificate(true);
        }
    };

    const onPaneChange = (event: SplitterOnChangeEvent) => {
        setPanes(event.newState);
        let splitter: HTMLDivElement = document.getElementById("ReviewPremiseFormSplit")?.firstChild as HTMLDivElement;

        let mainSize = "";
        let secondSize = "";

        if (event.newState[0].size != undefined) {
            mainSize = event.newState[0].size;
        } else if (event.newState[1].size != undefined) {
            mainSize = (splitter?.clientWidth * ((100 - parseInt(event.newState[1].size)) / 100)).toString() + "px";
            secondSize = (splitter?.clientWidth * (parseInt(event.newState[1].size) / 100)).toString() + "px";
        }
        setMainArea(mainSize);
        setSecondaryArea(secondSize);
        window.dispatchEvent(resizeEvent);
    };

    const handleCancel = () => {
        setPanes([{ min: "360px" }]);
        setIsSecondOpen(false);
        setMainArea(undefined);
        setDetailedInfo("");
    };

    const handleBack = () => {
        // dispatch(clearPremiseFacilityItemsReducerState());
        // dispatch(clearSaveFormDataState());
        // dispatch(clearGetPremiseCreateFormElementsReducerState());
        // dispatch(stepAction(1));
        history.push(URL.Grid);
    };

    const handleChangeTreatmentProvider = (data: any) => {
        const value = data?.value;
        if (value) {
            setSelectedTreatmentProvider(value);
        }
        if (value?.id) {
            //Get All Treatment Types
            dispatch(getTreatmentTypesListAction({ id: 0, agencyBusinessRegistrationId: value?.id }));
        }
    };

    interface IKeyValue {
        id: any;
        name: string;
    }

    // const { data: labTypes, error: labTypeError, loading: labTypeLoading } = useFetch(
    //     ApiURL.LMS_SERVICE,
    //     Methods.GET_LAB_TYPES,
    //     {}
    // );

    useEffect(() => {
        if(treatmentProviderBusines.length>0){
            let selectedProvider = treatmentProviderBusines.find((provider:any)=> provider.isSelected)
            if(selectedProvider){
                setSelectedTreatmentProvider(selectedProvider);
            //let registrationId = null;

            let registrationId= gridInfoStoreHistory !== undefined ? gridInfoStoreHistory?.agencyBusinessRegistrationEncryptedId : localStorageData?.agencyBusinessRegistrationEncryptedId;
            if(window?.location?.pathname.includes(URL.Edit) && registrationId){
                
            //Get All Treatment Types
            dispatch(getTreatmentTypesListAction({ id: 0, agencyBusinessRegistrationId: registrationId }));
            }
            }
        }
    },[treatmentProviderBusines]);

    useEffect(() => {
        if (treatmentTypes && treatmentTypes.length > 0) {
            let selectAllLabTypes: any = {
                id: -1,
                name: "Select All"
            };
       

            treatmentTypes.unshift(selectAllLabTypes);
            let list = _treatmentTypes.filter((item: any) => item?.isSelected);
            setLabTypeFilteredData(_treatmentTypes);
    
            if(list){
                setSelectedTreatmentTypes(list);
            }
            else{
                setSelectedTreatmentTypes([]);
            }
        }
    }, [treatmentTypes]);

    const filterTreatmentType = (event: MultiSelectFilterChangeEvent) => {
        let _slice = _treatmentTypes.slice();
        let _filter = event.filter
        let list = filterBy(_slice, _filter);
        setLabTypeFilteredData(list);
    };

    /* Showing Cancel Dialog Box */
    const showCancelDialog = (data:any,isLastItem:number) => {
        setDummyDataForDeleteTreatmentType({
            eventData:data,
            isLastOption:isLastItem,
        });
        setVisibleDialog(true);
        setMessage(resources_EN.TPM_treatment_type_cancel_message);
    }

    
    const handleDeleteTreatmentType = (event: MultiSelectChangeEvent, isAlreadySelectAll:any)=>{
        let addedLabTypes = [...event?.value];
        if (addedLabTypes.length < selectedTreatmentTypes.length && isAlreadySelectAll) {
            addedLabTypes = addedLabTypes.filter((x: IKeyValue) => x.id > 0); // exclude select all item
        }
        else if(addedLabTypes.length < selectedTreatmentTypes.length)
        {
            showCancelDialog(addedLabTypes,0);
            return;
        }
        setSelectedTreatmentTypes(addedLabTypes);
    }
    const onChangeTreatmentType = (event: MultiSelectChangeEvent) => {
        let isSelectAll = event.value.some((x: IKeyValue) => x.id <= 0);
        let isAlreadySelectAll = selectedTreatmentTypes.some((x: IKeyValue) => x.id <= 0);
        let isNoItemSelected = event.value.every((x: IKeyValue) => x.id <= 0);

        if (isSelectAll && !isAlreadySelectAll) {
            setSelectedTreatmentTypes(_treatmentTypes);
        } else if ((!isSelectAll && isAlreadySelectAll) || isNoItemSelected) {
            showCancelDialog(event?.value,1);
        } else {
            handleDeleteTreatmentType(event, isAlreadySelectAll)
        }
    };

    const clearState = ()=>{
        setSelectedTreatmentProvider({})
        setSelectedTreatmentTypes([] as IKeyValue[])
        setLabTypeFilteredData([] as IKeyValue[])
        dispatch(getTreatmentTypeClear());
        dispatch(getTreatmentType([]));

    }

    useEffect(() => {
        if(confirmTreatmentTypes){
            console.log({confirmTreatmentTypes});

            //when user click on back button
            let registrationId = confirmTreatmentTypes?.agencyBusinessRegistration?.agencyBusinessRegistrationId;
            if(registrationId){
                dispatch(getTreatmentTypesListAction({ id: 0, agencyBusinessRegistrationId: registrationId })); 
            }
        }
    },[confirmTreatmentTypes]);

    //Get and set localStorage data
    useEffect(() => {
      console.log({gridInfoStoreHistory})
    //get registration id from first step confirg store when user click on back button
    const gridData = fetchGridDataFunc();
    let registrationId = null;
    registrationId = gridInfoStoreHistory !== undefined ? gridInfoStoreHistory?.agencyBusinessRegistrationEncryptedId : gridData?.agencyBusinessRegistrationEncryptedId;
      if(window?.location?.pathname.includes(URL.Edit) && registrationId){
        registrationId = registrationId;
      }else{
        registrationId  = confirmTreatmentTypes?.agencyBusinessRegistration?.agencyBusinessRegistrationId;

      }
        //Get All Business Registrations
        dispatch(
            getUnRegisteredTPBusinessAction({
                agencyId,
                registrationTypeCode: TPRegisterType.TREATMENT_REG_DOC_TYPE_CODE,
                registrationId
            })
        );

       
        setLocalStorageData({ ...localStorageData, ...gridData });
        // dispatch(updateStoreObjectAction(gridInfoStore));
        
        if (window.location.pathname.includes(URL.Edit)) {
            setIsEditPage(true);
        }

        return () => {
            clearState()
        }
    }, []);

    return (
        <Container className="h-100 m-t" fluid>
            <DailogComponent
                id="dialog-cancel"
                confirm={handleConfirm}
                isVisible={isDialogVisible}
                closeDailog={setVisibleDialog}
                message={message}
                btnName1="Cancel"
                btnName2="Confirm"
            />

            <AlertDismissible
                isAlertVisible={visible}
                variant={variant}
                message={description}
                className=" w-100 m-2 mx-auto sub-info-alert"
            />
            
            {loading ? (
                <Loader className={"position-absolute"} />
            ) : (
                <>
                    <Form
                        onSubmit={handleSubmit}
                        render={(formRenderProps: any) => (
                            <FormElement>
                                <fieldset className={"k-form-fieldset"}>
                                    <Row className={"m-0 "}>
                                        <Col className="p-0">
                                            <Field
                                                id={"treatmentProvider"}
                                                name={"treatmentProvider"}
                                                label={"Treatment Provider"}
                                                component={FormComboBox}
                                                textField="businessNameWithNTN"
                                                dataItemKey="id"
                                                placeholder={"Select Treatment Provider"}
                                                data={treatmentProviderBusines}
                                                onChange={handleChangeTreatmentProvider}
                                                filterable={true}
                                                disabled={isEditPage && selectedTreatmentTypes && Object.keys(selectedTreatmentProvider)?.length > 0 ? isEditPage: _.isEmpty(treatmentProviderBusines) ? true :false}
                                                value={selectedTreatmentProvider ? selectedTreatmentProvider : {}}
                                                //onFilterChange={onCountryFilterChange}
                                                //value={country}
                                                autocomplete={false}
                                            />
                                        </Col>
                                        <Col>
                                            <Field
                                                id="treatmentType"
                                                name="treatmentType"
                                                label={"Treatment Type *"}
                                                className={Styles.multiSelect}
                                                component={FormMultiSelect}
                                                data={labTypeFilteredData}
                                                onChange={onChangeTreatmentType}
                                                textField="name"
                                                dataItemKey="id"
                                                placeholder={"Select Treatment Type "}
                                                disabled={_.isEmpty(treatmentProviderBusines)}
                                                value={Object.keys(selectedTreatmentProvider)?.length > 0 ? selectedTreatmentTypes : []}
                                                filterable={true}
                                                //onFilterChange={filterTreatmentType}
                                                required={true}
                                                showHint={true}
                                                hint="Note: Please select busniess treatment provider first"
                                            />
                               
                                            {/* <label className="k-label d-inline mb-1 font-semibold text-muted">
                                                Select Lab Category*
                                            </label>
                                            <MultiSelect
                                                data={labTypeFilteredData}
                                                placeholder="Select Lab Category"
                                                onChange={onChangeTreatmentType}
                                                value={selectedTreatmentTypes}
                                                textField="name"
                                                dataItemKey="id"
                                                filterable={true}
                                                onFilterChange={filterTreatmentType}
                                                validationMessage="Please Select Lab Category*"
                                                valid={selectedTreatmentTypes.length > 0}
                                                required={true}
                                            /> */}
                                        </Col>
                                        {/* {isSubType ? (
                                            <Col className="p-0">
                                                <Field
                                                    id={"treatmentSubType"}
                                                    name={"treatmentSubType"}
                                                    label={"Treatment SubType"}
                                                    component={FormComboBox}
                                                    textField="name"
                                                    dataItemKey="id"
                                                    placeholder={"Select Treatment SubType"}
                                                    data={subTreatmentTypesList ? subTreatmentTypesList : []}
                                                    onChange={handleChangeTreatmentSubType}
                                                    key={"id"}
                                                    filterable={true}
                                                    validationMessage={'error'}
                                                    value={selectedTreatmentSubType ? selectedTreatmentSubType : {}}  
                                                    //onFilterChange={onCountryFilterChange}
                                                    //value={country}
                                                    autocomplete={false}
                                                />
                                            </Col>
                                        ) : null} */}
                                    </Row>
                                </fieldset>
                                <Row className="mx-3 mt-3 mb-3 d-flex justify-content-end">
                                    <div className={"pl-0"}>
                                        <button
                                            type="submit"
                                            onClick={handleSubmit}
                                            className={`btn btn-primary px-3 py-2`}
                                            disabled={
                                                !(Object.keys(selectedTreatmentProvider)?.length > 0 && selectedTreatmentTypes?.length > 0)
                                            }>
                                            <span>{resources_EN.proceed_button}</span>
                                        </button>
                                    </div>
                                </Row>
                            </FormElement>
                        )}
                    />
                </>
            )}
        </Container>
    );
};

export default BasicRegistrationInformation;
