import { Button } from "react-bootstrap";

const ButtonComponent = (props: any) => {
    const { data, handleExportToForm22Pdf, handleViewTreatmentProvider, handleViewTreatmentCertificate, isViewTreatmentProvider, isViewTreatmentCertificate, ViewTreatmentProviderBtnText,  ViewTreatmentCertificateBtnText} = props;
debugger;
    return (
        <>
            {isViewTreatmentProvider && <Button
                className="btn btn-primary mt-2 mr-4 py-2 px-1 px-xl-2"
                size="sm"
                id="add-role"
                onClick={()=>handleExportToForm22Pdf(data?.id)}>
                {/* <FontAwesomeIcon icon={faFileImage} className={"mr-2"} /> */}
                <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M4.78833 0.000266503H11.0842C11.2648 0.000266503 11.4204 0.0648176 11.5482 0.192555L14.3077 2.9521C14.4354 3.07984 14.5 3.23541 14.5 3.41608V12.8542C14.5 13.432 14.0295 13.9025 13.4519 13.9025H4.78829C4.21298 13.9025 3.74002 13.4298 3.74002 12.8542V11.0813C3.74002 11.0388 3.75838 11.0023 3.79226 10.9767C3.82615 10.9509 3.86639 10.9435 3.90731 10.955C4.10526 11.0116 4.30584 11.0598 4.50887 11.0991C4.57117 11.1113 4.61522 11.1646 4.61522 11.2279V12.8541C4.61522 12.9515 4.6911 13.0274 4.78827 13.0274H13.4519C13.5466 13.0274 13.625 12.9491 13.625 12.8541V3.55074H11.8716C11.3637 3.55074 10.9493 3.13638 10.9493 2.62845V0.875094H4.78796C4.69304 0.875094 4.61491 0.953415 4.61491 1.04834V3.75588C4.61491 3.81936 4.57097 3.87268 4.50856 3.88469C4.30583 3.92424 4.10493 3.97239 3.907 4.02884C3.86609 4.04046 3.82585 4.03304 3.79196 4.00735C3.75807 3.98177 3.73972 3.94524 3.73972 3.90257V1.04827C3.73972 0.470533 4.21022 0 4.78798 0L4.78833 0.000266503ZM5.89107 4.40809C3.69063 4.40809 1.75125 5.48896 0.610231 7.13139C0.463256 7.34291 0.463256 7.64107 0.610231 7.8526C1.75145 9.4952 3.69078 10.5759 5.89107 10.5759C8.09136 10.5759 10.0309 9.4952 11.1719 7.8526C11.3189 7.64107 11.3189 7.34292 11.1719 7.13139C10.0307 5.48898 8.09136 4.40809 5.89107 4.40809ZM5.89107 4.86072C7.34422 4.86072 8.52236 6.03897 8.52236 7.49202C8.52236 8.94507 7.34412 10.1233 5.89107 10.1233C4.43802 10.1233 3.25978 8.94537 3.25978 7.49202C3.25978 6.03887 4.43772 4.86072 5.89107 4.86072ZM5.89107 5.56641C6.95466 5.56641 7.81698 6.42852 7.81698 7.49212C7.81698 8.55571 6.95466 9.41782 5.89107 9.41782C4.82768 9.41782 3.96536 8.55571 3.96536 7.49212C3.96536 6.42852 4.82768 5.56641 5.89107 5.56641Z"
                        fill="#007B4B"
                    />
                </svg>
                <span className="pr-2 ml-2">{ViewTreatmentProviderBtnText}</span>
            </Button>}

            {/* {isViewTreatmentCertificate && <Button
                className="btn btn-primary mt-2 mr-2 py-2 px-1 px-xl-2"
                size="sm"
                id="add-role"
                onClick={handleViewTreatmentCertificate}
                // onClick={AddUser}
            >
                <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M4.78833 0.000266503H11.0842C11.2648 0.000266503 11.4204 0.0648176 11.5482 0.192555L14.3077 2.9521C14.4354 3.07984 14.5 3.23541 14.5 3.41608V12.8542C14.5 13.432 14.0295 13.9025 13.4519 13.9025H4.78829C4.21298 13.9025 3.74002 13.4298 3.74002 12.8542V11.0813C3.74002 11.0388 3.75838 11.0023 3.79226 10.9767C3.82615 10.9509 3.86639 10.9435 3.90731 10.955C4.10526 11.0116 4.30584 11.0598 4.50887 11.0991C4.57117 11.1113 4.61522 11.1646 4.61522 11.2279V12.8541C4.61522 12.9515 4.6911 13.0274 4.78827 13.0274H13.4519C13.5466 13.0274 13.625 12.9491 13.625 12.8541V3.55074H11.8716C11.3637 3.55074 10.9493 3.13638 10.9493 2.62845V0.875094H4.78796C4.69304 0.875094 4.61491 0.953415 4.61491 1.04834V3.75588C4.61491 3.81936 4.57097 3.87268 4.50856 3.88469C4.30583 3.92424 4.10493 3.97239 3.907 4.02884C3.86609 4.04046 3.82585 4.03304 3.79196 4.00735C3.75807 3.98177 3.73972 3.94524 3.73972 3.90257V1.04827C3.73972 0.470533 4.21022 0 4.78798 0L4.78833 0.000266503ZM5.89107 4.40809C3.69063 4.40809 1.75125 5.48896 0.610231 7.13139C0.463256 7.34291 0.463256 7.64107 0.610231 7.8526C1.75145 9.4952 3.69078 10.5759 5.89107 10.5759C8.09136 10.5759 10.0309 9.4952 11.1719 7.8526C11.3189 7.64107 11.3189 7.34292 11.1719 7.13139C10.0307 5.48898 8.09136 4.40809 5.89107 4.40809ZM5.89107 4.86072C7.34422 4.86072 8.52236 6.03897 8.52236 7.49202C8.52236 8.94507 7.34412 10.1233 5.89107 10.1233C4.43802 10.1233 3.25978 8.94537 3.25978 7.49202C3.25978 6.03887 4.43772 4.86072 5.89107 4.86072ZM5.89107 5.56641C6.95466 5.56641 7.81698 6.42852 7.81698 7.49212C7.81698 8.55571 6.95466 9.41782 5.89107 9.41782C4.82768 9.41782 3.96536 8.55571 3.96536 7.49212C3.96536 6.42852 4.82768 5.56641 5.89107 5.56641Z"
                        fill="#007B4B"
                    />
                </svg>

                <span className="pr-2 ml-2">{ViewTreatmentCertificateBtnText}</span>
            </Button>} */}
        </>
    );
};

export default ButtonComponent;