import { IFile } from "Elements/Basic/File/FileTypes";
import { Role } from "Lib/Types/SharedTypes";
import UploadDocumentsTPM from "Modules/TPM/Common/UploadDocuments/UploadDocumentsTPM";
import { RootStore } from "Store";
import { memo, useEffect, useState } from "react";
import { Row, Col, Button as BootstrapButton, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

const UploadDocumentFunction = (props: any) => {
    const {status, documentGroupCode, data, heading, disabled, treatmentType, formState,fumigationSubType,isHideFileDeleteBtn } = props;
  
    const history = useHistory();
    const dispatch = useDispatch();
    let agencyIdLocationState = history.location.state;

    const userRole = useSelector((state: RootStore) =>
        state.dashboardReducer.currentUserRole != undefined
            ? state.dashboardReducer.currentUserRole.Code
            : state.dashboardReducer.dashboardInfo.currentRole
    );
    const deletedFiles: IFile[] = useSelector((state: RootStore) => state.fileReducer.deletedFiles);

    const agencyId = useSelector((state: RootStore) =>
        state.dashboardReducer.dashboardInfo.agencyId != undefined && state.dashboardReducer.dashboardInfo.agencyId != 0
            ? state.dashboardReducer.dashboardInfo.agencyId
            : agencyIdLocationState
    );

    let Component = null;
    const otherProps  ={
        isTreatmentTypeDocument: true,
        data
    };
    console.log("Upload document render===>>");

    //For Officer upload documents
    // if (window.location.pathname.includes(PremisesURL.RenewalView) || window.location.pathname.includes(PremisesURL.AmendmentView) && status && status != "Registered") {
        switch (userRole) {
            case Role.OGAAdmin:
                Component = (
                    <Row className="mx-0">
                        <Col className="mb-3">
                            <div
                                className="mb-1 font-semibold"
                                style={{
                                    color: "#3E5277"
                                }}>
                                {heading ? heading : 'Upload Documents'}
                            </div>
                            <Container
                                className={`border rounded py-2 px-0`}
                                style={{
                                    background: "white",
                                    boxShadow: "0px 4px 12px #EBF0FA"
                                }}
                                fluid>
                                <UploadDocumentsTPM
                                    agencyId={agencyId}
                                    documentGroupCode={documentGroupCode}
                                    showOtherDocumentComp={false}
                                    showError={true}
                                    otherProps={otherProps}
                                    disabled={disabled}
                                    treatmentType={treatmentType}
                                    formState={formState}
                                    fumigationSubType={fumigationSubType}
                                    isHideFileDeleteBtn={isHideFileDeleteBtn}
                                />
                            </Container>
                        </Col>
                    </Row>
                );
                break;
            default:
                Component = null;
                break;
        }
    // }
    return Component;

};

export default memo(UploadDocumentFunction);