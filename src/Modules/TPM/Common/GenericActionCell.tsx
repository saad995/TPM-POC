import React, { useEffect, useState } from "react";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload, faPencilAlt, faUpload, faSyncAlt, faPrint, faIcons, faEye } from "@fortawesome/free-solid-svg-icons";

// React Bootstrap
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "Store";
import { Role } from "Lib/Types/SharedTypes";
import { Button } from "@progress/kendo-react-buttons";

import { Agency, DocumentClassificationCode, DocumentGroupCode, DocumentInfo } from "../Constants/Interfaces";
import { useHistory } from "react-router";
import { IUpdateStoreObject } from "../Common/UpdateStoreObject/UpdateStoreObjectInterfaces";
import { resources_EN } from "Modules/TPM/Constants/Resources/Resources_EN";
import Paths from "../Constants/Paths";
import ImportSVG from "Lib/Helpers/CustomSVGImporter";
import { fetchGridDataFunc, getUserRoleAction } from "Modules/Common/Helpers/DateHelper";
import { updateStoreObjectAction } from "./UpdateStoreObject/UpdateStoreObjectActions";
// import { IPrintRequestData } from "./PrintTemplate/PrintTemplateInterfaces";
import ExportPdf from "./ExportPdf/ExportPdf";
import { Tabs } from "./TabStripCommon/TabStripInterface";
import { IPrintRequestData } from "./ExportPdf/ExportPdfInterfaces";

const GenericActionCell = (props: any) => {
    const { rowData, agencyId, IStatusInterface, isDetailAction, handleDetailItemView, URL } = props;

    const { dataItem } = rowData;
    const { id, requestDocumentTypeCode, currentRecordEncryptedId, currentRecordId, parentDocumentTypeCode, statusId,initDocumentTypeCode} = dataItem;


    const history = useHistory();
    const dispatch = useDispatch();
    const [localStorageData, setLocalStorageData] = useState<any>();
    const [printRequest, setPrintRequest] = React.useState<any>();
    const [isPrinting, setIsPrinting] = React.useState(false);

    let Actions: any = <></>;

    const userRole = useSelector((state: RootStore) =>
        state.dashboardReducer.currentUserRole != undefined
            ? state.dashboardReducer.currentUserRole.Code
            : state.dashboardReducer.dashboardInfo.currentRole
    );

    const data: IUpdateStoreObject = {
        initDocumentTypeCode: initDocumentTypeCode,
        id: id,
        action: statusId,
        documentClassificationCode: DocumentClassificationCode.PREMISE.toString(),
        documentGroupCode: DocumentClassificationCode.PREMISE.toString(),
        agencyId: agencyId,
        currentRecordId: currentRecordId,
        isRenewal: false, //default is false
        isAmendment: false,//default is false
        // requestDocumentEncryptedID: id, // treatment provider encrypted id
        // requestDocumentItemRegEncryptedID: '', // treatment type reg encrypted id
        // itemId: itemId, // treatment type id
        // agencyBusinessRegistrationEncryptedId: agencyBusinessRegistrationEncryptedId,
        amendment: {
            initDocumentIDs: currentRecordEncryptedId,
            initDocumentID: currentRecordId,
            documentClassificationCode: DocumentClassificationCode.PREMISE.toString(),
            initDocumentTypeCode: requestDocumentTypeCode
        },
        renewal: {
            initDocumentIDs: currentRecordEncryptedId,
            initDocumentID: currentRecordId,
            documentClassificationCode: DocumentClassificationCode.PREMISE.toString(),
            initDocumentTypeCode: requestDocumentTypeCode
        }
    };

    const handleExportToPdf = (props: any) => {
        const request: IPrintRequestData = {
            documentId: Number(props.currentRecordId),
            documentTypeCode: props.requestDocumentTypeCode,
            documentClassificationCode: DocumentClassificationCode.PREMISE.toString(),
            roleCode: userRole,
            rights: "",
            payload: ""
        };

        setPrintRequest(request);
        setIsPrinting(true);
    };

    const amendmentRequesthandler = () => {
        data.isAmendment = true;
        data.isRenewal = false;
        data.documentGroupCode = DocumentGroupCode.PREMISE_REGISTARTION_AMENDMENT;
        dispatch(updateStoreObjectAction(data));
        fetchGridDataFunc({ ...localStorageData, ...data });
        return history.push(`${URL.Amendment}`, data);
    };

    const renewalRequesthandler = () => {
        data.isAmendment = false;
        data.isRenewal = true;
        data.documentGroupCode = DocumentGroupCode.PREMISE_REGISTARTION_RENEWAL;
        dispatch(updateStoreObjectAction(data));
        fetchGridDataFunc({ ...localStorageData, ...data });
        return history.push(`${URL.Renewal}`, data);
    };

    const tab = useSelector(
        (state: RootStore) => state.TabSripStateReducer.tab
    );
  

    const uploadCallDocument = () => {

        switch (tab) {
            case Tabs.INQUEUE:
                data.isAmendment = false;
                data.isRenewal = false;
                data.initDocumentTypeCode = data?.initDocumentTypeCode;
                data.documentGroupCode = DocumentGroupCode.PREMISE_REGISTARTION;
                break;
            case Tabs.AMENDMENT:
                data.isAmendment = true;
                data.isRenewal = false;
                data.initDocumentTypeCode = data?.amendment ? data?.amendment?.initDocumentTypeCode: data?.initDocumentTypeCode;
                data.documentGroupCode = DocumentGroupCode.PREMISE_REGISTARTION_AMENDMENT;
                break;
            case Tabs.RENEWAL:
                data.isAmendment = false;
                data.isRenewal = true;
                data.initDocumentTypeCode = data?.renewal ? data?.renewal?.initDocumentTypeCode: data?.initDocumentTypeCode;
                data.documentGroupCode = DocumentGroupCode.PREMISE_REGISTARTION_RENEWAL;
                break;
            default:
                data.isAmendment = false;
                data.isRenewal = false;
                data.initDocumentTypeCode = data?.initDocumentTypeCode;
                data.documentGroupCode = DocumentGroupCode.PREMISE_REGISTARTION;
        }

        let payload ={
            ...data,
            id: dataItem.currentRecordId
        }
        dispatch(updateStoreObjectAction({ ...localStorageData, ...payload }));
        fetchGridDataFunc({ ...localStorageData, ...payload });
        history.push(URL.CalledDocument, { ...localStorageData, ...payload });
    };

    const editPremiseRegistration = () => {
        dispatch(updateStoreObjectAction({ ...localStorageData, ...data }));
        fetchGridDataFunc({...localStorageData, ...data})
   
        history.push(URL.Edit,  { ...localStorageData, ...data });
        
    };

    const approvals = () => {
        dispatch(updateStoreObjectAction({ ...localStorageData, ...data }));
        fetchGridDataFunc({...localStorageData, ...data})
        history.push(URL.Approvals,  { ...localStorageData, ...data });
    };

    const approvalsForAmendment = () => {
        dispatch(updateStoreObjectAction({ ...localStorageData, ...data }));
        fetchGridDataFunc({...localStorageData, ...data})
        history.push(URL.Approvals,  { ...localStorageData, ...data });
    };

    const handleView = () => {
        const { id } = dataItem;

        const data: IUpdateStoreObject = {
            initDocumentTypeCode:
                agencyId == Agency.MFD
                    ? DocumentInfo.MFD_PREMISE_REGISTRATION_DOCUMENT_TYPE_CODE.toString()
                    : dataItem.requestDocumentTypeCode,
            id: id,
            action: dataItem.statusId,
            documentClassificationCode: DocumentClassificationCode.PREMISE.toString(),
            agencyId: dataItem.agencyId,
            currentRecordId: dataItem?.currentRecordId,
            isRenewal: false,
            isAmendment: false
        };

        dispatch(updateStoreObjectAction(data));
        fetchGridDataFunc({ ...localStorageData, ...data });

        return history.push(URL.View, data);
    };

    const handleDetailView = () => {
        handleDetailItemView(dataItem)
//         const { id } = dataItem;
// debugger
//         const data: IUpdateStoreObject = {
//             initDocumentTypeCode:
//                 agencyId == Agency.MFD
//                     ? DocumentInfo.MFD_PREMISE_REGISTRATION_DOCUMENT_TYPE_CODE.toString()
//                     : dataItem.requestDocumentTypeCode,
//             id: id,
//             action: dataItem.statusId,
//             documentClassificationCode: DocumentClassificationCode.PREMISE.toString(),
//             agencyId: dataItem.agencyId,
//             currentRecordId: dataItem?.currentRecordId,
//             isRenewal: false,
//             isAmendment: false
//         };
// debugger
//         dispatch(updateStoreObjectAction(data));
//         fetchGridDataFunc({ ...localStorageData, ...data });

//         return history.push(URL.ViewItem, data);
    };

    //Get and set localStorage data
    useEffect(() => {
        const gridData = fetchGridDataFunc();
        setLocalStorageData({ ...localStorageData, ...gridData });
    }, []);
   
    switch (statusId) {
        case IStatusInterface.DRAFT:
            {
            Actions = (
                    <td className="grid-column">
                    <Button primary={true} look="flat" onClick={editPremiseRegistration}>
                        <FontAwesomeIcon
                            icon={faPencilAlt}
                            color="#009a5e"
                            title={resources_EN.Premises_Registration_Grid_ColumnButtonName_Edit}
                        />
                    </Button>
                    </td>
                );
            }
            break;
        case IStatusInterface.APPROVAL_FOR_CALL_DOCUMENT:
            {
                Actions = (
                    <td className="grid-column">
                        {(userRole === Role.DeputyDirector || userRole === Role.IPDeputyDirector) && (
                            <Button look="flat" onClick={approvals}>
                                <FontAwesomeIcon icon={faFileUpload} title="Approve/Reject" color="#009a5e" />
                            </Button>
                        )}
                    </td>
                );
            }
            break;
        // case IStatusInterface.APPROVED:
        //     {
        //         switch (userRole) {
        //             case Role.DeputyDirector || Role.IPDeputyDirector:
        //                 {
        //                     Actions = (
        //                         <td className="grid-column">
        //                             <Button look="flat" onClick={approvalsForAmendment}>
        //                                 <FontAwesomeIcon icon={faFileUpload} title="Approve/Reject" color="#009a5e" />
        //                             </Button>
        //                         </td>
        //                     );
        //                 }
        //                 break;
        //             case Role.Trader:
        //                 {
        //                     Actions = (
        //                         <td className="grid-column" colSpan={1} role="gridcell" aria-selected="false">
        //                             <Button look="flat" onClick={uploadCallDocument}>
        //                                 <FontAwesomeIcon
        //                                     icon={faUpload}
        //                                     color="#009a5e"
        //                                     title={resources_EN.Premises_Registration_Grid_ColumnButtonName_Upload}
        //                                 />
        //                             </Button>
        //                         </td>
        //                     );
        //                 }
        //                 break;
        //         }
        //     }
        //     break;
        case IStatusInterface.REGISTERED:
            {
                Actions = (
                    <td className="grid-column" >
                        {dataItem?.isAmendmentAllowed ? (
                                <Button primary={true} look="flat" onClick={amendmentRequesthandler}>
                                    <ImportSVG name="amendment" color="#6c757d" size={16} title={resources_EN.amendmend_request} />
                                </Button>
                        )  : null}
                        { agencyId == Agency.DPP &&
                            <>
                                    
                                <Button look="flat" onClick={() => handleExportToPdf(dataItem)}>
                                {isPrinting ? <ExportPdf printRequest={printRequest} /> : null}
                                    <FontAwesomeIcon color="#009a5e" icon={faPrint} title={resources_EN.export_pdf} />
                                </Button>
                            </>
                         }
                        
                        {dataItem.isRenewalAllowed && (
                            <Button primary={true} look="flat" onClick={renewalRequesthandler}>
                                <FontAwesomeIcon
                                    color="#009a5e"
                                    icon={faSyncAlt}
                                    title={resources_EN.renewal_request}
                                />
                            </Button>
                        )}
                    </td>
                );
            }
            break;
        case IStatusInterface.DOCUMENTS_CALLED:
            {
                Actions = (
                    <td className="grid-column" colSpan={1} role="gridcell" aria-selected="false">
                        {userRole === Role.Trader && (
                            <Button look="flat" onClick={uploadCallDocument}>
                                <FontAwesomeIcon
                                    icon={faUpload}
                                    color="#009a5e"
                                    title={resources_EN.Premises_Registration_Grid_ColumnButtonName_Upload}
                                />
                            </Button>
                        )}
                    </td>
                );
            }
            break;
        default:
            {
                Actions = <td colSpan={1} role="gridcell" aria-selected="false">
                   {isDetailAction ? <span className={"text-muted d-flex"}>

                    <a
                        style={{
                            paddingLeft: "10px",
                            paddingRight: "10px",
                            cursor: "pointer",
                            fontSize: "1rem"
                        }}
                        className="mr-2"
                        onClick={isDetailAction ? handleDetailView: handleView}>
                        <FontAwesomeIcon icon={faEye} title={resources_EN.TPM_Grid_Registration_Grid_ColumnButtonName_View} />
                    </a>
                    </span>: null}
                </td>;
            }
            break;
    }

    return Actions;
};

export default GenericActionCell;
