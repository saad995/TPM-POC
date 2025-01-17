import React, { useState } from "react";
import { resources_EN } from "Modules/TPM/Constants/Resources/Resources_EN";
import ImportSVG from "Lib/Helpers/CustomSVGImporter";

// Redux
import { clearAlert, clearFormState } from "Modules/Common/Actions/ClearState";
import { clearReducerState as clearFileReducerState } from "Elements/Basic/File/FileAction";
import { RootStore } from "Store";
import Loader from "Elements/Basic/Loader/Loader";

// React Bootstrap
import { Row, Col, Button, Container } from "react-bootstrap";

// Kendo UI
import { TabStripTab } from "@progress/kendo-react-layout";

// Hooks
import { useDispatch, useSelector } from "react-redux";
import { Prompt, useHistory, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Types
import {
    ISubmitPremiseRegistrationResponse,
    ISubmitPremiseRegistrationRequest,
    IPremisesRegistrationDeleteAttachmentReq
} from "./CreateEditTPMRegistrationInterfaces";

// SCSS
import styles from "./CreateEditTPMRegistration.module.scss";
import { Action, Agency, ApplicationCodes, AttachedDocumentFormat, DocumentInfo } from "Modules/TPM/Constants/Interfaces";
import { setPageTitleAction } from "Layouts/AppLayout/AppLayoutActions";

import AutoTabstrip from "Elements/Custom/AutoTabstrip/AutoTabstrip";
import Paths from "Modules/TPM/Constants/Paths";
import { stepAction } from "Modules/Common/Actions/SubscriptionActions";
import swal from "sweetalert";

import { fetchGridDataFunc, getUserRoleAction } from "Modules/Common/Helpers/DateHelper";

import DailogComponent from "Elements/Basic/Dailog/DailogComponent";
import Unauthorized from "Modules/TPM/Common/Unauthorized/Unauthorized";
import { Role } from "Lib/Types/SharedTypes";
import PremiseForm from "./BasicRegistrationInformation/BasicRegistrationInformation";

import GenericCustomAlert from "Modules/TPM/Common/GenericCustomAlert";
// import {
//     clearPremiseFacilityItemsReducerState,
//     clearSaveFormDataState
// } from "Modules/TPM/Common/GenericGrid/GenericGridAction";
import { defaultState } from "Modules/Common/Reducers/FormStateReducer";
import BasicRegistrationInformation from "./BasicRegistrationInformation/BasicRegistrationInformation";
import RegistrationDetails from "./RegistrationDetails/RegistrationDetails";
import { submitTreatmentTypeRegistrationAction } from "./CreateEditTPMRegistrationAction";
import { getTreatmentTypeByProviderIdClear, getTreatmentTypeClear } from "Modules/TPM/Common/CommonApi/CommonApiAction";
import { getCitiesListClear } from "Modules/TPM/TreatmentCertificate/InitiateTreatmentRequest/InitiateTreatmentRequestAction";
// import UploadRegistration from "Modules/OGA/PremisesRegistration/CreatePremiseRegistration/UploadPremiseRegistration/Upload/Upload";
// import { clearGetPremiseCreateFormElementsReducerState } from "../CreatePremiseRegistration/ReviewPremiseForm/ReviewPremiseFormActions";
// import { clearReducerState as clearDocumentInfoReducerState, UploadSupportDocAction } from "../CreatePremiseRegistration/SupportDocumentInfo/SupportDocumentInfoAction";
// import { clearReducerState as clearPCTCodeInfoReducerState } from "Modules/OGA/Common/PCTCodeInfoByCode/PCTCodeInfoByCodeActions";
// import { clearReducerState as clearImportConditionReducerState } from "Modules/OGA/ImportPermit/CreateEditImportPermit/ImportCondition/ImportConditionAction";


const CreateEditTPMRegistration = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    let gridInfoStoreHistory = history.location.state;
    const userRoleCode: string = useSelector((state: RootStore) => state.dashboardReducer.dashboardInfo.currentRole);

    const loading: any = useSelector((state: RootStore) => state.CreateEditTPRegistrationReducer?.loading);

    const currentStep = useSelector((state: RootStore) => state.formState.step);

    const [show, setShow] = React.useState(false);
    const [isSuccess, setSuccess] = React.useState(false);
    const [isUnauthorized, setIsUnauthorized] = React.useState(false);
    const [sweetAlertTitle, setSweetAlertTitle] = React.useState("");
    const [sweetAlertMessage, setSweetAlertMessage] = React.useState("");
    const [isBackButtonClicked, setBackbuttonPress] = useState(false);
    const [type, setType] = useState("");
    const [message, setMessage] = useState("");
    const [tabPos, setTabPos] = useState("left");
    const [isFormSubmitted, setIsFormSubmitted] = useState(true);
    const [submitData, setSubmitData] = useState({} as any);
    const [psid, setPSID] = useState("");
    const [totalPayableFacilityAmount, setTotalPayableFacilityAmount] = useState(0);
    const [isEditPage, setIsEditPage] = useState(false);
    const [localStorageData, setLocalStorageData] = useState<any>();
    const [isConfirm, setConfirmation] = useState(false);
    const [isDialogVisible, setVisibleDialog] = useState(false);

    // const URL: any = getUserRoleAction(userRoleCode);
const URL:any  = Paths.Registration;
    const handleSaveApi = (data: any) => {

        const payload: ISubmitPremiseRegistrationRequest = data;
        // dispatch(
        //     TPRegistrationAction(
        //         payload,
        //         (submitRes: any) => {
        //             const { data, message } = submitRes;
        //             if (message.code == ApplicationCodes.SUCCESS) {
        //                 // setType(Action.ConfirmPayment);
        //                 // setSweetAlertTitle(resources_EN.sweet_Alert_title_Submitted);
        //                 // setSuccess(true);
        //                 // setPSID(data.billDocumentNumber);
        //                 // setSweetAlertMessage(resources_EN.premise_registration_sucess_sweet_Alert_title);
        //                 // setIsFormSubmitted(false);
        //                 const gridData = fetchGridDataFunc();
        //                 fetchGridDataFunc({ ...localStorageData, ...gridData, initDocumentID: data.premiseRegistrationId });
        //                 dispatch(stepAction(1));
        //             } else {
        //                 setShow(false);
        //                 swal({
        //                     title: resources_EN.sweet_Alert_title_Failed,
        //                     text:
        //                         message.code == ApplicationCodes.BAD_REQUEST
        //                             ? message.description
        //                             : resources_EN.upload_Registration_file_unable_to_uploaded,
        //                     icon: "error"
        //                 });
        //             }
        //         }
        //     )
        // );

    }

    useEffect(() => {
        if (isConfirm) {
            if (type === Action.Cancel) {
                setShow(!show);
                setSweetAlertTitle(resources_EN.sweet_Alert_title_Cancelled);
                setSuccess(true);
                setSweetAlertMessage(`Your Premises Registration request has been cancelled!`);
                setIsFormSubmitted(false);
            }else if (type === Action.Submit) {
                const payload: ISubmitPremiseRegistrationRequest = submitData;

                dispatch(
                    submitTreatmentTypeRegistrationAction(
                        payload,
                        (res: any) => {
                            if (res?.hasOwnProperty("code") ? res.code !== ApplicationCodes.SUCCESS : res?.hasOwnProperty("message") ? res?.message?.code !== ApplicationCodes.SUCCESS : false) {
                                const { data, message } = res;
                                setShow(false);
                                swal({
                                    title: resources_EN.sweet_Alert_title_Failed,
                                    text:
                                        message.code == ApplicationCodes.BAD_REQUEST
                                            ? message.description
                                            : resources_EN.TPM_Registration_General_error_msg,
                                    icon: "error"
                                });
                            } else {
                                const { data, message } = res;
                                 setVisibleDialog(false);

                                swal({
                                    title: resources_EN.sweet_Alert_title_Submitted,
                                    text:
                                        message.code == ApplicationCodes.SUCCESS
                                            ? message.description
                                            : resources_EN.TPM_Registration_submit_msg,
                                    icon: "success"
                                }).then((submitted: any) => {
                                    if (submitted) {
                                       
                                            handleDone();
                                    }
                                });
                            
                                // setIsFormSubmitted(false)

                                //setType()
                                // setSweetAlertTitle(resources_EN.sweet_Alert_title_Submitted);
                                // setSuccess(true);
                                // // setSweetAlertMessage(resources_EN.premise_registration_sucess_sweet_Alert_title);
                                // setSweetAlertMessage(message?.description ? message?.description : '');
                                // setIsFormSubmitted(false);

                            }

                        }
                    )
                );

            }

            setConfirmation(false);
        }
    }, [isConfirm]);

    const handleSave = (nextStep: number) => {
        dispatch(stepAction(nextStep));
    };

    const onParentSave = () => {
        setMessage(resources_EN.TPM_registration_save_message);
        setType(Action.Save);
        setVisibleDialog(true);
    };

    const handleClosed = () => {
        // setType(Action.Cancel);
        return history.push(URL.Grid);
    };

    const handleCancel = () => {
        setMessage(resources_EN.TPM_registration_cancel_message);
        setType(Action.Cancel);
        setVisibleDialog(true);
    };

    const handleSubmit = (formData: any) => {
        setMessage(resources_EN.TPM_registration_submit_message);
        setSweetAlertMessage(resources_EN.premise_registration_confirm_sweet_Alert_title);
        setType(Action.Submit);
        setVisibleDialog(true);
        setSubmitData(formData);
        //setShow(true);

        // if (localStorageData?.agencyId == Agency.MFD) {
        //     if (
        //         window.location.pathname?.includes(URL.Create) &&
        //         formData?.premiseFacilityItem?.length == 0
        //     ) {
        //         swal({
        //             title: resources_EN.sweet_Alert_title_Failed,
        //             text: "Please select atleast one facility item",
        //             icon: "error"
        //         });
        //     } else {
        //         setMessage(resources_EN.TPM_registration_submit_message);
        //         setType(Action.Submit);
        //         setShow(true);
        //         setSubmitData(formData);
        //        // setTotalPayableFacilityAmount(genericFeeCalculator(formData, localStorageData?.agencyId));
        //         setSweetAlertMessage(resources_EN.premise_registration_confirm_sweet_Alert_title);
        //     }
        // } else {

        //     setMessage(resources_EN.TPM_registration_submit_message);
        //     setSweetAlertMessage(resources_EN.premise_registration_confirm_sweet_Alert_title);
        //     setType(Action.Submit);
        //     // setVisibleDialog(true);
        //     setSubmitData(formData);
        //     setShow(true);
        //    // setTotalPayableFacilityAmount(genericFeeCalculator(formData, localStorageData?.agencyId));
        // }
    };

    const handleProceed = (formData: any) => {
        // const req = {
        //     treatmentProviderId: 0,
        //     agencyBusinessRegistration: {
        //         agencyId: 2,
        //         registrationTypeCode: "C09",
        //         agencyBusinessRegistrationId: "Gyhb8ZrrDBo8/jPuCSp+HA==",
        //         ntn: "0656781",
        //         businessName: "Hagler Bailly Pakistan (Pvt) Ltd",
        //         companyName: "HAGLER BAILLY PAKISTAN (PRIVATE) LIMITED",
        //         principalActivity: "Other service activities/SERVICES/MISCELLANEOUS / NON-SPECIFIED COMMODITES"
        //     },
        //     selectedTreatmentTypes: [
        //         {
        //             id: 1,
        //             name: "Sample Treatment Type",
        //             isSelected: false,
        //             isSubType: false
        //         },
        //         {
        //             id: 2,
        //             name: "Sample Treatment Type",
        //             isSelected: false,
        //             isSubType: true,
        //             SelectedSubtypes: [
        //                 {
        //                     id: 2,

        //                     name: "sub type"
        //                 }
        //             ]
        //         }
        //     ]
        // };






        // if (localStorageData?.agencyId == Agency.MFD) {
        //     if (
        //         window.location.pathname?.includes(URL.Create) &&
        //         formData?.premiseFacilityItem?.length == 0
        //     ) {
        //         swal({
        //             title: resources_EN.sweet_Alert_title_Failed,
        //             text: "Please select atleast one facility item",
        //             icon: "error"
        //         });
        //     } else {
        //         setMessage(resources_EN.TPM_registration_submit_message);
        //         setType(Action.Save);
        //         setVisibleDialog(true);
        //         // setShow(true);
        //         setSubmitData(formData);
        //         // setTotalPayableFacilityAmount(genericFeeCalculator(formData, localStorageData?.agencyId));
        //         // setSweetAlertMessage(resources_EN.premise_registration_confirm_sweet_Alert_title);
        //     }
        // } else {
        //     console.log("handle Proceed else statement")

        //     let isValid = true;
        //     let dataObject = JSON.parse(formData?.registrationElementDataJson);
        //     if(dataObject?.ListOfMajorEquipment?.length == 0){
        //         swal({
        //             title: resources_EN.sweet_Alert_title_Failed,
        //             text: "Please enter values in List Of Major Equipment",
        //             icon: "error"
        //         });
        //         isValid = false;
        //     }

        //     if(isValid)
        //     {
        //         // setMessage(resources_EN.TPM_registration_submit_message);
        //         // setType(Action.Save);
        //         setSubmitData(formData);
        //         handleSaveApi(formData);
        //         // setVisibleDialog(true);              
        //         // setVisibleDialog(true);
        //         // setShow(true);
        //         // setTotalPayableFacilityAmount(genericFeeCalculator(formData, localStorageData?.agencyId));
        //     }
        // }
    };

    const handleSweetAlertOnCancel = () => {
        setVisibleDialog(false);
        setShow(false);
    };

    const handleConfirm = () => {
        setConfirmation(true);
        setVisibleDialog(false);
    };
    const handleDone = () => {
        if (type == Action.Submit || type == Action.Cancel) {
             setIsFormSubmitted(false);
             history.push(URL.Grid);
        }
        setShow(false);
        setVisibleDialog(false);
    };

    const sweetAlertOnConfirm = () => {
        if (type !== Action.Save) history.push(URL.Grid);
        setShow(false);
    };

    const handleDialoClose = () => {
        setVisibleDialog(false);
        setShow(false);
        setConfirmation(false);
    };

    const clearForm = () => {
        dispatch(clearFormState());
        dispatch(clearFileReducerState());
        // dispatch(clearDocumentInfoReducerState());
        //  dispatch(clearGetPremiseCreateFormElementsReducerState());
        //   dispatch(clearPremiseFacilityItemsReducerState());
        //  dispatch(clearSaveFormDataState());
        dispatch(clearAlert({ code: "", description: "" }));
    };

    const myFunction = (x: any) => {
        if (x.matches) {
            // If media query matches
            setTabPos("left");
        } else {
            setTabPos("top");
        }
    };

    const onBackButtonEvent = (event: any) => {
        event.preventDefault();
        if (!isBackButtonClicked) {
            if (window.confirm("Data will be lost if you leave the page, Are you sure?")) {
                setBackbuttonPress(true);
                clearForm();
                clearState();
                setIsFormSubmitted(false);
                history.push(URL.Grid);

            } else {
                window.history.pushState(null, "", window.location.pathname);
                setBackbuttonPress(false);
            }
        }
    };

    useEffect(() => {
        const pathName = location.pathname;
        
        if (pathName.includes(URL.CreateForm)) {
            dispatch(clearFormState());
        }
        // history.push(URL.Grid, agencyid)

        window.history.pushState(null, "", window.location.pathname);
        window.addEventListener("popstate", onBackButtonEvent);

        //logic for showing popup warning on page refresh
        window.onbeforeunload = function () {
            return "Data will be lost if you leave the page, Are you sure?";
        };

        clearForm();

        let PageTitle = resources_EN.tpm_registration_create;

        if (pathName.includes(URL.Edit)) {
            PageTitle = resources_EN.tpm_registration_edit;
        } else {
            PageTitle = resources_EN.tpm_registration_create;
        }

        dispatch(setPageTitleAction(PageTitle));

        //Saad's Lines
        const x = window.matchMedia("(min-width: 992px)");
        myFunction(x); // Call listener function at run time
        x.addEventListener("change", () => {
            myFunction(x);
        });

        return () => {
                        window.removeEventListener("popstate", onBackButtonEvent);
            window.onbeforeunload = function () {
                // blank function do nothing
            };
            clearForm();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getStepperVal = () => {
        const step: number = currentStep;
        let stepperId = 0;

        switch (step) {
            case 1:
                stepperId = 1;
                break;
            case 2:
                stepperId = 2;
                break;
            case 3:
                stepperId = 3;
                break;
            default:
                stepperId = 0;
        }

        document?.querySelectorAll('[role="tablist"]').forEach(function (e1) {
            const childs = e1?.children;
            e1?.scroll(childs[stepperId]?.getBoundingClientRect().x, e1?.getBoundingClientRect().y);
        });

        return stepperId;
    };

    //Get and set localStorage data
    useEffect(() => {
        const gridData = fetchGridDataFunc();
        let Obj = { ...localStorageData, ...gridData };
        setLocalStorageData(Obj);

        if (window.location.pathname.includes(URL.Edit)) {
           // dispatch(stepAction(1));
            setIsEditPage(true);
        }

        return () => {
            clearState()
        }

    }, []);

    useEffect(() => {
        if (localStorageData && Object.keys(localStorageData).length > 0) {
            let { agencyId } = localStorageData;

            switch (agencyId) {
                case Agency.MFD:
                    {
                        setIsUnauthorized(true);
                    }
                    break;
                case Agency.DPP:
                    {
                        setIsUnauthorized(true);
                    }
                    break;
                default:
                    {
                        setIsUnauthorized(false);
                    }
                    break;
            }
        }
    }, [localStorageData]);


    function clearState(){
        dispatch(getTreatmentTypeClear());
        dispatch(getTreatmentTypeByProviderIdClear());
        dispatch(getCitiesListClear());
    };


    return (
        <>
            <Prompt when={isFormSubmitted} message="Are you sure you want to leave?" />

            <DailogComponent
                id="dialog-cancel"
                confirm={setConfirmation}
                isVisible={isDialogVisible}
                closeDailog={setVisibleDialog}
                message={message}
                btnName1="NO"
                btnName2="Yes"
            />
            <GenericCustomAlert
                confirmBtnText={type == Action.Submit ? "Proceed" : "OK"}
                showCancel={type == Action.Submit}
                warning={true}
                title={sweetAlertTitle}
                show={show}
                psid={psid}
                type={type}
                isUnauthorized={isUnauthorized}
                sweetAlertMessage={sweetAlertMessage}
                totalPayableFacilityAmount={totalPayableFacilityAmount}
                onConfirm={type == Action.Submit ? handleConfirm : handleDone}
                onCancel={type == Action.Submit ? handleSweetAlertOnCancel : null}
                isSuccess={isSuccess}
            />
            {loading ? (
                <Loader className={"position-absolute"} />
            ) : !isUnauthorized && userRoleCode !== Role.OGAAdmin ? (
                <Unauthorized />
            ) : (
                <Container
                    className={`${styles.createPremise} px-0 pb-3 pb-md-0 h-120`}
                    style={{ backgroundColor: "white" }}
                    fluid>
                    <Container className="py-3 border-top border-bottom" fluid>
                        <Row>
                            <Col>
                                <div className="base-lg font-semibold">Step {getStepperVal() + 1} of 2</div>
                                <p className="text-muted">
                                    {" "}
                                    <em>{resources_EN.tpm_registration_Header_Note}</em>
                                </p>
                            </Col>
                            {/* {defaultState.step > currentStep && (
                                <Col className="align-self-center" xs="auto">
                                    <Row className="no-gutters">
                                        <Col className="border-left px-1" xs="auto">
                                            <Button
                                              //  onClick={handleCancel}
                                                className={`${styles.btnTabNav} text-nowrap d-flex align-items-center`}
                                                variant="link">
                                                <ImportSVG
                                                    name="cancel-main"
                                                    size={16}
                                                    hoverClassName={"mr-2"}
                                                    color="#000000"
                                                />
                                                Cancel
                                            </Button>
                                        </Col>
                                        <Col className="border-left px-1" xs="auto">
                                            <Button
                                                className={`${styles.btnTabNav} text-nowrap d-flex align-items-center`}
                                               // onClick={onParentSave}
                                                variant="link">
                                                <ImportSVG
                                                    name="save-main"
                                                    size={16}
                                                    hoverClassName={"mr-2"}
                                                    color="#000000"
                                                />
                                                Save
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            )} */}
                        </Row>
                    </Container>
                    <AutoTabstrip
                        animation={false}
                        selected={getStepperVal()}
                        // onSelect={() => setSelected()}
                        // isManual
                        parentClass={styles.tabStripHeight}>
                        <TabStripTab
                            title="Basic Registration Information"
                            contentClassName={styles.CreatePremiseFormSection}>
                            <BasicRegistrationInformation
                                roleCode={userRoleCode}
                                onSave={(nextStep: number) => handleSave(nextStep)}
                                agencyId={gridInfoStoreHistory?.data}
                            />
                        </TabStripTab>
                        <TabStripTab
                            title="Treatment Details"
                            contentClassName={styles.CreatePremiseFormSection}>
                            <RegistrationDetails
                                roleCode={userRoleCode}
                                onSave={(nextStep: number) => handleSave(nextStep)}
                                onSubmit={handleSubmit}
                                agencyId={gridInfoStoreHistory?.data}
                            />
                        </TabStripTab>

                    </AutoTabstrip>
                </Container>
            )}
        </>
    );
};

export default CreateEditTPMRegistration;