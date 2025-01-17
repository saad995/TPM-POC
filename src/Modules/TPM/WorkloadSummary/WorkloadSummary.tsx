import { Button } from "@progress/kendo-react-buttons";
import { Field, Form, FormElement } from "@progress/kendo-react-form";
import defaultImg from "Assets/Images/Avatar.jpg";
import { uploadDocumentAction } from "Elements/Basic/File/FileAction";
import { IDocumentType, IFile } from "Elements/Basic/File/FileTypes";
import { FormComboBox } from "Elements/Basic/FormComponent/FormComponent";
import Column from "Elements/Basic/GridView/Columns/Column";
import GridView from "Elements/Basic/GridView/GridView";
import ImageUploader from "Elements/Basic/ImageUploader/ImageUploader";
import Loader from "Elements/Basic/Loader/Loader";
import Radio from "Elements/Basic/Radio/Radio";
import { setPageTitleAction } from "Layouts/AppLayout/AppLayoutActions";
import Methods from "Modules/Common/Constants/MethodIDs";
import { getLastWeeksDate, getPreviousMonthsDate } from "Modules/Common/Helpers/DateHelper";
import { RootStore } from "Store";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import GridColumns from "../Constants/GridColumns";
import { resources_EN } from "../Constants/Resources_EN";
import Style from "./WorkloadSummary.module.scss";
import {
    getWorkloadSummaryAction,
    resetWorkLoadSummaryReducerState,
    updateProfilePictureId
} from "./WorkloadSummaryAction";
import {
    IUpdateProfilePictureRequest,
    WorkloadAssignmentList,
    WorkloadSummaryResponse
} from "./WorkloadSummaryInterfaces";

const WorkloadSummary = (props: any) => {
    const dispatch = useDispatch();
    const [workloadSummaryGridData, setWorkloadSummaryGridData] = useState<WorkloadAssignmentList[]>();

    const [radioState, setRadioState] = useState("1-Week");

    const [isLabIncharge, setIsLabIncharge] = useState(true);
    const [selectedOfficer, setSelectedOfficer] = useState({ userRoleId: 0, name: "" });

    const defaultDocumentType: IDocumentType = {
        code: "",
        name: ""
    };
    useEffect(() => {
        let title = "Workload Summary";
        dispatch(setPageTitleAction(title));
    }, []);

    const [documentType, setDocumentType] = useState(defaultDocumentType);

    useEffect(() => {
        let date = new Date();
        let req = {
            fromDate: date
        };
        dispatch(getWorkloadSummaryAction(req));
        return () => {
            dispatch(resetWorkLoadSummaryReducerState());
        };
    }, []);

    let workloadSummary: WorkloadSummaryResponse = useSelector(
        (state: RootStore) => state.WorkloadSummaryReducer.workloadSummary
    );
    let isLoading = useSelector((state: RootStore) => state.WorkloadSummaryReducer.loading);
    let labOfficers = useSelector((state: RootStore) => state.WorkloadSummaryReducer.labOfficers);
    const state = {
        isAlertVisible: false,
        alertVariant: "",
        alertMessage: "",
        // isLoading: false,
        defaultSrc: defaultImg,
        errorOccured: false
    };

    useEffect(() => {
        if (workloadSummary.workloadAssignmentList && workloadSummary) {
            let gridData = workloadSummary.workloadAssignmentList.map((item) => {
                return {
                    ...item,
                    requestedDate: item.requestedDate ? moment(item.requestedDate).format("DD-MM-YYYY") : "",
                    assignedOn: item.assignedOn ? moment(item.assignedOn).format("DD-MM-YYYY") : ""
                };
            });
            setWorkloadSummaryGridData(gridData);
        }
    }, [workloadSummary]);
    const img = React.useRef<HTMLImageElement>(null);
    const onImageSrcError = () => {
        if (!state.errorOccured && img.current) {
            // set to true as to not loop if even defaultSrc is not found
            state.errorOccured = true;
            img.current.src = state.defaultSrc;
        }
    };

    const profilePhoto: IFile = useSelector((state: RootStore) => {
        let files = state.fileReducer.newFiles;

        return files[files.length - 1];
    });

    useEffect(() => {
        if (profilePhoto?.fileNestFileId != null && profilePhoto?.fileNestFileId != 0) {
            updateProfilePicture();
        }
    }, [profilePhoto?.fileNestFileId]);

    const getFileURL = (fileId: string | undefined) => {
        fileId = profilePhoto?.fileNestFileIds ? profilePhoto.fileNestFileIds : workloadSummary.profilePictureID;
        //: workloadSummary?.profilePictureID
        if (fileId) {
            const url: string = `/${Methods.READ_FILE}?fileId=${fileId}`;
            return url;
        }
    };

    const changeProfilePicture = (event: any) => {
        if (true) {
            if (event.target.files && event.target.files.length > 0) {
                const { validationErrors, name, size, type } = event.target.files[0];

                if (!validationErrors && type.includes("image")) {
                    const userFile: IFile = {
                        documentExtension: name.split(".")[1],
                        file: event.target.files[0],
                        documentName: name,
                        documentSize: size,
                        docTypeCode: documentType.code,
                        docTypeName: documentType.name,
                        fileNestFileId: 0,
                        fileNestFileIds: ""
                    };

                    dispatch(uploadDocumentAction(userFile));
                    setDocumentType(defaultDocumentType);

                    //To enable twice uploading same file
                    event.target.value = "";
                    return;
                }
            }
        }
    };

    const updateProfilePicture = () => {
        let data: IUpdateProfilePictureRequest = {
            userId: workloadSummary.userID,
            profilePictureId: profilePhoto?.fileNestFileIds
        };
        dispatch(updateProfilePictureId(data));
    };

    const OneMonthHandler = (value: any) => {
        setRadioState(value);
    };

    const oneWeekHandler = (value: any) => {
        setRadioState(value);
    };

    const threeMonthHandler = (value: any) => {
        setRadioState(value);
    };

    const sixMonthHandler = (value: any) => {
        setRadioState(value);
    };

    const handleLabOfficerChange = (event: any) => {
        if (event?.value) {
            setSelectedOfficer(event.value);
        } else {
            setSelectedOfficer({ userRoleId: 0, name: "" });
        }
    };
    const labOfficerValidator = (value: any = selectedOfficer) => {
        let msg = "Select Lab Officer";
        if (value.userRoleId > 0) {
            msg = "";
        }
        return msg;
    };
    const handleSubmit = () => {
        let newDate = new Date();
        switch (radioState) {
            case "1-Week":
                newDate = getLastWeeksDate();
                break;
            case "1-Month":
                newDate = getPreviousMonthsDate(1);
                break;
            case "3-Month":
                newDate = getPreviousMonthsDate(3);
                break;
            case "6-Month":
                newDate = getPreviousMonthsDate(6);
                break;
            default:
                newDate = new Date();
                break;
        }

        let req = {
            fromDate: newDate,
            userRoleId: selectedOfficer.userRoleId
        };
        dispatch(getWorkloadSummaryAction(req));
    };

    const isFormValid = () => {
        return (labOfficers.length > 0 && selectedOfficer.userRoleId > 0) || !labOfficers || labOfficers.length === 0;
    };
    const DateHelper = (
        <>
            {labOfficers.length > 0 ? (
                <div className="float-left">
                    <Form
                        onSubmit={handleSubmit}
                        render={() => (
                            <FormElement>
                                
                                <Field
                                    label={"Lab Officer"}
                                    name={"Lab Officer"}
                                    placeholder={"Select Lab Officer "}
                                    component={FormComboBox}
                                    data={labOfficers}
                                    dataItemKey={"userRoleId"}
                                    textField={"name"}
                                    onChange={handleLabOfficerChange}
                                    disabled={labOfficers.length == 0}
                                    labelClass={"text-muted"}
                                    value={selectedOfficer}
                                    validator={labOfficerValidator}
                                    
                                />
                            </FormElement>
                        )}
                    />
                </div>
            ) : (
                <></>
            )}

            <div className="float-right">
                <Radio defaultVal={"1-Week"} value={radioState} onChangeHandler={oneWeekHandler} label="1 Week" />
                <Radio defaultVal={"1-Month"} value={radioState} onChangeHandler={OneMonthHandler} label="1 Month" />

                <Radio defaultVal={"3-Month"} value={radioState} onChangeHandler={threeMonthHandler} label="3 Month" />

                <Radio defaultVal={"6-Month"} value={radioState} onChangeHandler={sixMonthHandler} label="6 Month" />
                <Button
                    type="submit"
                    onClick={handleSubmit}
                    className={`btn btn-primary ml-3 py-2`}
                    disabled={!isFormValid()}>
                    <span>{resources_EN.Report_Search_button}</span>
                </Button>
            </div>
        </>
    );

    const ProfileCard = (
        <>
            <div className={Style.cardProfile}></div>
            <div className={"position-relative " + Style.imageAlign}>
                <ImageUploader
                    imageUrl={getFileURL(profilePhoto?.fileNestFileIds)}
                    handleUpload={changeProfilePicture}
                    // disabled={ !isUserFetched}
                />
                <div className="text-center">
                    <p className={"mt-4 base-lg"}>{workloadSummary.name}</p>
                </div>
            </div>
            <div className="border-top border-down px-2 py-3 d-flex justify-content-between">
                <p className={"d-inline text-muted base-lg"}>{"Assigned Test"}</p>

                <p className={"d-inline text-success base-lg"}>
                    <strong>{workloadSummary.assignedTests}</strong>
                </p>
            </div>
            <div className="border-top border-down px-2 py-3 d-flex justify-content-between">
                <p className={"d-inline text-muted base-lg"}>{"In Process Test"}</p>

                <p className={"d-inline text-success base-lg"}>
                    <strong>{workloadSummary.inProgressTests}</strong>
                </p>
            </div>
            <div className="border-top border-down px-2 py-3 d-flex justify-content-between">
                <p className={"d-inline text-muted base-lg"}>{"Completed Test"}</p>

                <p className={"d-inline text-success base-lg"}>
                    <strong>{workloadSummary.completedTests}</strong>
                </p>
            </div>
            <div className="border-top border-down px-2 py-3 d-flex justify-content-between">
                <p className={"d-inline text-muted base-lg"}>{"Sample Awaited"}</p>

                <p className={"d-inline text-success base-lg"}>
                    <strong>{workloadSummary.samplesAwaited}</strong>
                </p>
            </div>
        </>
    );

    //#endregion

    return (
        <>
            <Container className="px-3" fluid>
                <div>
                    <Row className="my-2">
                        <Col xs={12} lg={6} xl={2}>
                            <Row className="m-0 mt-4 mb-2">
                                <div className="justify-content-start w-100">
                                    <p className={`${Style.dashboardTitle}`}>Workload Summary</p>
                                </div>
                            </Row>
                            <Row className={`m-0 ${Style.divMinHeight}`}>
                                <Col className="p-0 ">
                                    <div className="rounded shadow-sm border bg-white w-100 h-100 p-0">
                                        {ProfileCard}
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} lg={6} xl={10}>
                            {isLoading ? (
                                <div
                                    className="pl-3 pr-3"
                                    style={{
                                        backgroundColor: "#F5F7FB"
                                    }}>
                                    <Loader />
                                </div>
                            ) : (
                                <GridView
                                    heading={DateHelper}
                                    isSearchEnabled={false}
                                    // gridStyle={"noCursorOnRow"}
                                    data={workloadSummaryGridData ? workloadSummaryGridData : []}
                                    properties={GridColumns.WorkloadSummary}
                                    pageable={true}
                                    takeColumn={10}
                                    resizable={true}
                                    sortable={true}
                                    reorderable={true}>
                                    {GridColumns.WorkloadSummary?.map((items: any, index: number) => {
                                        return (
                                            <Column
                                                key={index}
                                                gridColumn={GridColumns.WorkloadSummary}
                                                field={items.field}
                                                title={items.title}
                                                width={"auto"}
                                            />
                                        );
                                    })}
                                </GridView>
                            )}
                        </Col>
                    </Row>
                </div>
            </Container>
        </>
    );
};

export default WorkloadSummary;
