import { useCallback, useEffect, useState } from "react";
import { TreatmentType, TreatmentTypeRegistrationStatus } from "../CreateEditTPMRegistrationInterfaces";
import TreatmentLicenseGrid from "./TreatmentLicenseGrid";
import UploadDocumentFunction from "../../UploadDocumentFunction";
import { treatmentTypeCreateEditConfigDataMapper } from "../../Utility";
import TreatmentTypeForm from "Elements/Custom/FormGenerator/TreatmentTypeForm";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "Store";
import { TreatmentTypeLicenseGridColumns } from "../../Grid/GridColumnSize";
import _ from "lodash";
import { FormConfig } from "./FormConfig";
import { Action, AttachedDocumentFormat, DocumentInfo } from "Modules/TPM/Constants/Interfaces";
import { IAttachment, IDocumentType } from "Modules/TPM/Common/UploadDocuments/UploadDocumentsInterfaces";
import { IFile } from "Elements/Basic/File/FileTypes";
import Paths from "Modules/TPM/Constants/Paths";
import { RenewalFormConfig } from "../../Renewal/RenewalFormConfig";
import { AmendmentFormConfig } from "../../AmendmentTreatmentType/AmendmentFormConfig";

const SearchCriteriaPanelComponent = (props: any) => {
    const dispatch = useDispatch();
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
    const multipledocumentTypesStore: any = useSelector(
        (state: RootStore) => state.UploadDocumentReducer.multipledocumentTypes
    );
    const multipleFilesUploadedStore: any = useSelector((state: RootStore) => state.fileReducer.multipleFilesUploaded);

    const {
        treatmentType,
        agencyBusinessData,
        handleSubmit,
        oncancel,
        isHideSaveBtn,
        isHideCancelBtn,
        documentGroupCode,
        treatmentTypeUploadDocPayload,
        isDisabled,

    } = props;
    // const [filesAttachedByOfficer, setFilesAttachedByOfficer] = useState([] as IAttachment[]);
    // const [uploadedDocuments, setUploadedDocuments] = useState([]);
    // const [isAllMandatoryFilesUploaded, setIsAllMandatoryFilesUploaded] = useState(false);
    let selectedTreatmentType: any = createEditTreatmentOnBoardData[treatmentType?.name]
        ? createEditTreatmentOnBoardData[treatmentType?.name]
        : {};
    const handleDisableSubmitCheck = () => {
        //  console.log({})
        return false;
    };

    // const handleFilesAttachedByOfficer = () => {
    //     setFilesAttachedByOfficer([]);
    // };

    // const handleIsAllMandatoryFilesUploaded = () => {
    //     setIsAllMandatoryFilesUploaded(false);
    // };

    const handleOfficerAttachments = (documentGroupCode: any) => {
        const officerAttachments: any[] = [];

        if (
            multipledocumentTypesStore &&
            multipleFilesUploadedStore &&
            multipleFilesUploadedStore[documentGroupCode] &&
            documentGroupCode &&
            multipleFilesUploadedStore[documentGroupCode]?.length > 0 &&
            multipledocumentTypesStore[documentGroupCode] &&
            multipledocumentTypesStore[documentGroupCode]?.documentTypes?.length > 0
        ) {
            multipleFilesUploadedStore[documentGroupCode].map((file: IFile) => {
                const documentUploaded: IDocumentType[] = multipledocumentTypesStore[
                    documentGroupCode
                ]?.documentTypes.filter(
                    // (x:any) => x.name.toLowerCase() === file.docTypeName.toLowerCase()
                    (x: any) => x.code === file.docTypeCode
                );
                if (documentUploaded.length > 0) {
                    const doc: IDocumentType = documentUploaded[0];
                    const attachment: any = {
                        attachementId: doc?.id,
                        attachedDocumentTypeCode: doc.code,
                        documentTitle: doc.name,
                        fileNestFileId: file.fileNestFileIds,
                        fileIdS: file.fileNestFileIds
                    };

                    officerAttachments.push(attachment);
                }
            });
        }

        return officerAttachments;
    };

    const handleSaveClicked = (saveFormData: any) => {
        if (saveFormData) {
            let _treatmentSubTypes: any = saveFormData?.formData?.treatmentSubTypes
                .filter((item: any) => item?.checked)
                ?.map((subType: any) => {
                    const { documentTypeCode, id } = subType;
                    return {
                        subTypeDocumentTypeCode: documentTypeCode,
                        treatmentSubTypeId: id,
                        treatmentSubTypeAttachments: handleOfficerAttachments(documentTypeCode)
                    };
                });

            let _treatmentTypeAttachments: any[] = handleOfficerAttachments(documentGroupCode);
            handleSubmit({
                ...saveFormData,
                formData: {
                    ...saveFormData?.formData,
                    treatmentSubTypes: _treatmentSubTypes,
                    treatmentTypeAttachments: _treatmentTypeAttachments
                }
            });
        }
    };

    let _FormConfig = FormConfig;
    if (window.location.pathname.includes(Paths.Registration.Renewal)
    ) {
        _FormConfig = RenewalFormConfig
    } else if (window.location.pathname.includes(Paths.Registration.Amendment)) {
        _FormConfig = AmendmentFormConfig
    } else {
        _FormConfig = FormConfig
    };

    function deletePropertiesOnSpecificName(formMappeders: any) {
        if (name == "Hot Water Treatment" || name == "Vapor Heat Treatment" || name == "Cold Treatment") {
            delete formMappeders?.ispmMark;
        } else {
            delete formMappeders?.productionUnitCode;
        }
    }

    function renderForm() {
        switch (name) {
            case TreatmentType.Fumigation: {
                let updatedformConfig = treatmentTypeCreateEditConfigDataMapper(
                    treatmentType,
                    agencyBusinessData,
                    _FormConfig,
                    cities
                );
                let formMappeders = { ...updatedformConfig };
                delete formMappeders?.productionUnitCode;
                delete formMappeders?.packHouse;
    
                return (
                    <TreatmentTypeForm
                        formState={formMappeders}
                        treatmentType={treatmentType}
                        handleSubmit={handleSaveClicked}
                        oncancel={oncancel}
                        handleDisableSubmitCheck={handleDisableSubmitCheck}
                        isHideSubmitBtn={isHideSaveBtn}
                        isHideCancelBtn={isHideCancelBtn}
                        formConfig ={_FormConfig}
                        >
                        {selectedTreatmentType &&
                            Object.keys(selectedTreatmentType)?.length > 0 &&
                            selectedTreatmentType["treatmentSubTypes"]
                                ?.filter((item: any) => item.checked)
                                .map((item: any) => {
                                    const { id, label } = item;
                                    let payloadItem = {
                                        ...payload,
                                        documentGroupCode: item?.documentTypeCode,
                                        disabled: isDisabled
                                    };
                                    return (
                                        <UploadDocumentFunction
                                            index={id}
                                            key={label}
                                            {...payloadItem}
                                            heading={`${label} Documents`}
                                            treatmentType={treatmentType}
                                            formState={formMappeders}
                                            fumigationSubType={true}
                                            isHideFileDeleteBtn={isHideSaveBtn}
                                        />
                                    );
                                })}
    
                        <UploadDocumentFunction
                            key={name}
                            {...treatmentTypeUploadDocPayload}
                            disabled={isDisabled}
                            heading={`Upload ${name} Documents`}
                            treatmentType={treatmentType}
                            formState={formMappeders}
                            fumigationSubType={false}
                            isHideFileDeleteBtn={isHideSaveBtn}
                        />
                    </TreatmentTypeForm>
                );
            }
            case TreatmentType.HeatTreatment: {
                // let updatedformConfig = treatmentEditDataMapper(data, agencyBusinessData);
                let updatedformConfig = treatmentTypeCreateEditConfigDataMapper(
                    treatmentType,
                    agencyBusinessData,
                    _FormConfig,
                    cities
                );
                let formMappeders = { ...updatedformConfig };
                
                //delete formMappeders?.ispmMark;
                delete formMappeders?.treatmentSubTypes;
                delete formMappeders?.treatmentOperatorInfo;
                delete formMappeders?.fumigationAllowed;
    
                deletePropertiesOnSpecificName(formMappeders)

                return (
                    <TreatmentTypeForm
                        formState={formMappeders}
                        treatmentType={treatmentType}
                        handleSubmit={handleSaveClicked}
                        oncancel={oncancel}
                        handleDisableSubmitCheck={handleDisableSubmitCheck}
                        isHideSubmitBtn={isHideSaveBtn}
                        isHideCancelBtn={isHideCancelBtn}
                        formConfig ={_FormConfig}
                        >
                        <UploadDocumentFunction
                            key={name}
                            {...treatmentTypeUploadDocPayload}
                            disabled={isDisabled}
                            heading={`Upload ${name} Documents`}
                            treatmentType={treatmentType}
                            formState={formMappeders}
                            fumigationSubType={false}
                            isHideFileDeleteBtn={isHideSaveBtn}
                        
                        />
                    </TreatmentTypeForm>
                );
            }
            case TreatmentType.ColdTreatment: {
                // let updatedformConfig = treatmentEditDataMapper(data, agencyBusinessData);
                let updatedformConfig = treatmentTypeCreateEditConfigDataMapper(
                    treatmentType,
                    agencyBusinessData,
                    _FormConfig,
                    cities
                );
                let formMappeders = { ...updatedformConfig };
                //delete formMappeders?.ispmMark;
                delete formMappeders?.treatmentSubTypes;
                delete formMappeders?.treatmentOperatorInfo;
                delete formMappeders?.fumigationAllowed;
    
                deletePropertiesOnSpecificName(formMappeders)

                return (
                    <TreatmentTypeForm
                        formState={formMappeders}
                        treatmentType={treatmentType}
                        handleSubmit={handleSaveClicked}
                        oncancel={oncancel}
                        handleDisableSubmitCheck={handleDisableSubmitCheck}
                        isHideSubmitBtn={isHideSaveBtn}
                        isHideCancelBtn={isHideCancelBtn}>
                        <UploadDocumentFunction
                            key={name}
                            {...treatmentTypeUploadDocPayload}
                            disabled={isDisabled}
                            heading={`Upload ${name} Documents`}
                            treatmentType={treatmentType}
                            formState={formMappeders}
                            fumigationSubType={false}
                            isHideFileDeleteBtn={isHideSaveBtn}
                        />
                    </TreatmentTypeForm>
                );
            }
            case TreatmentType.FormalinTreatment: {
                // let updatedformConfig = treatmentEditDataMapper(data, agencyBusinessData);
                let updatedformConfig = treatmentTypeCreateEditConfigDataMapper(
                    treatmentType,
                    agencyBusinessData,
                    _FormConfig,
                    cities
                );
                let formMappeders = { ...updatedformConfig };
                delete formMappeders?.productionUnitCode;
                delete formMappeders?.treatmentSubTypes;
                delete formMappeders?.treatmentOperatorInfo;
                delete formMappeders?.fumigationAllowed;
    
                return (
                    <TreatmentTypeForm
                        formState={formMappeders}
                        treatmentType={treatmentType}
                        handleSubmit={handleSaveClicked}
                        oncancel={oncancel}
                        handleDisableSubmitCheck={handleDisableSubmitCheck}
                        isHideSubmitBtn={isHideSaveBtn}
                        isHideCancelBtn={isHideCancelBtn}
                        formConfig ={_FormConfig}
                        
                        
                        >
                        <UploadDocumentFunction
                            key={name}
                            {...treatmentTypeUploadDocPayload}
                            disabled={isDisabled}
                            heading={`Upload ${name} Documents`}
                            treatmentType={treatmentType}
                            formState={formMappeders}
                            fumigationSubType={false}
                            isHideFileDeleteBtn={isHideSaveBtn}
                        />
                    </TreatmentTypeForm>
                );
            }
            case TreatmentType.IrradiationTreatment: {
                // let updatedformConfig = treatmentEditDataMapper(data, agencyBusinessData);
                let updatedformConfig = treatmentTypeCreateEditConfigDataMapper(
                    treatmentType,
                    agencyBusinessData,
                    _FormConfig,
                    cities
                );
                let formMappeders = { ...updatedformConfig };
                //delete formMappeders?.ispmMark;
                delete formMappeders?.treatmentSubTypes;
                delete formMappeders?.treatmentOperatorInfo;
                delete formMappeders?.fumigationAllowed;
    
                deletePropertiesOnSpecificName(formMappeders)

                return (
                    <TreatmentTypeForm
                        formState={formMappeders}
                        treatmentType={treatmentType}
                        handleSubmit={handleSaveClicked}
                        oncancel={oncancel}
                        handleDisableSubmitCheck={handleDisableSubmitCheck}
                        isHideSubmitBtn={isHideSaveBtn}
                        isHideCancelBtn={isHideCancelBtn}
                        formConfig ={_FormConfig}
                        >
                        <UploadDocumentFunction
                            key={name}
                            {...treatmentTypeUploadDocPayload}
                            disabled={isDisabled}
                            heading={`Upload ${name} Documents`}
                            treatmentType={treatmentType}
                            formState={formMappeders}
                            fumigationSubType={false}
                            isHideFileDeleteBtn={isHideSaveBtn}
                        />
                    </TreatmentTypeForm>
                );
            }
            case TreatmentType.HotWaterTreatment: {
                // let updatedformConfig = treatmentEditDataMapper(data, agencyBusinessData);
                let updatedformConfig = treatmentTypeCreateEditConfigDataMapper(
                    treatmentType,
                    agencyBusinessData,
                    _FormConfig,
                    cities
                );
                let formMappeders = { ...updatedformConfig };
                //delete formMappeders?.ispmMark;
                delete formMappeders?.treatmentSubTypes;
                delete formMappeders?.treatmentOperatorInfo;
                delete formMappeders?.fumigationAllowed;
    
                deletePropertiesOnSpecificName(formMappeders)

                return (
                    <TreatmentTypeForm
                        formState={formMappeders}
                        treatmentType={treatmentType}
                        handleSubmit={handleSaveClicked}
                        oncancel={oncancel}
                        handleDisableSubmitCheck={handleDisableSubmitCheck}
                        isHideSubmitBtn={isHideSaveBtn}
                        isHideCancelBtn={isHideCancelBtn}
                        formConfig ={_FormConfig}
                        >
                        <UploadDocumentFunction
                            key={name}
                            {...treatmentTypeUploadDocPayload}
                            disabled={isDisabled}
                            heading={`Upload ${name} Documents`}
                            treatmentType={treatmentType}
                            formState={formMappeders}
                            fumigationSubType={false}
                            isHideFileDeleteBtn={isHideSaveBtn}
                        />
                    </TreatmentTypeForm>
                );
            }
            case TreatmentType.VaporHeatTreatment: {
                // let updatedformConfig = treatmentEditDataMapper(data, agencyBusinessData);
                let updatedformConfig = treatmentTypeCreateEditConfigDataMapper(
                    treatmentType,
                    agencyBusinessData,
                    _FormConfig,
                    cities
                );
                let formMappeders = { ...updatedformConfig };
                //delete formMappeders?.ispmMark;
                delete formMappeders?.treatmentSubTypes;
                delete formMappeders?.treatmentOperatorInfo;
                delete formMappeders?.fumigationAllowed;
    
                deletePropertiesOnSpecificName(formMappeders)
    
                return (
                    <TreatmentTypeForm
                        formState={formMappeders}
                        treatmentType={treatmentType}
                        handleSubmit={handleSaveClicked}
                        oncancel={oncancel}
                        handleDisableSubmitCheck={handleDisableSubmitCheck}
                        isHideSubmitBtn={isHideSaveBtn}
                        isHideCancelBtn={isHideCancelBtn}
                        formConfig ={_FormConfig}
                        >
                        <UploadDocumentFunction
                            key={name}
                            {...treatmentTypeUploadDocPayload}
                            disabled={isDisabled}
                            heading={`Upload ${name} Documents`}
                            treatmentType={treatmentType}
                            formState={formMappeders}
                            isHideFileDeleteBtn={isHideSaveBtn}
                        />
                    </TreatmentTypeForm>
                );
            }
            default:
                return <>Please select treatment type</>;
        }
    }

    if (!treatmentType || Object.keys(treatmentType).length == 0) return <></> 

    const { documentTypeCode, isSubType, name } = treatmentType;
    let payload = {
        status,
        documentGroupCode: documentTypeCode,
        // setFilesAttachedByOfficer,
        // setIsAllMandatoryFilesUploaded,
        // setUploadedDocuments,
        data: treatmentType
    };

    
    return renderForm()
};

export default SearchCriteriaPanelComponent;
