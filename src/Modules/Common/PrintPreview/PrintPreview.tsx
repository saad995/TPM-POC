import { useEffect, useState } from "react";
import { Dialog } from "@progress/kendo-react-dialogs";
import DailogComponent from "Elements/Basic/Dailog/DailogComponent";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./PrintPreview.module.scss";
import Loader from "Elements/Basic/Loader/Loader";
import { resources_EN } from "Modules/TPM/Constants/Resources/Resources_EN";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import PreviewService from "./PrintPreviewServices";
import swal from "sweetalert";
import { IErrorType } from "Lib/Types/SharedTypes";
import { IPrintPreviewResponseData } from "./PrintPreviewInterfaces";

const PrintPreview = (props: any) => {
    const { requestData, onClose } = props;
    const [isLoading, setLoading] = useState(false);
    const [dailogMessage] = useState("");
    const [isVisible, setVisibleDialog] = useState(false);
    const [data, setData] = useState("");

    const handleGetPreview = () => {
        setLoading(true);
        PreviewService.handleGetPreview(requestData)
            .then((res: IPrintPreviewResponseData) => {
                const fileContent = res.fileContentHtml;
                setData(fileContent);
                setLoading(false);
            })
            .catch((err: IErrorType) => {
                setLoading(false);
                onClose(false);
                swal("Unable to download certificate !", err.description, "error");
                
            });
    };

    useEffect(() => {
        handleGetPreview();
    }, [requestData]);

    // Handlers
    const handleClose = () => {
        onClose(false);
    };

    const CustomTitleBar = () => {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 text-left">{resources_EN.Print_Preview}</div>
                    <div className="col-md-6 text-right">
                        <button id="close" title="Close" className={styles.btnClose} onClick={handleClose}>
                            <FontAwesomeIcon icon={faWindowClose} />
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <DailogComponent
                id="dialog-cancel"
                isVisible={isVisible}
                closeDailog={setVisibleDialog}
                message={dailogMessage}
            />
            <Dialog
                title={<CustomTitleBar />}
                onClose={() => onClose(false)}
                className={styles.popup}
                style={{ zIndex: 9999 }}>
                <Container fluid style={{ minWidth: "auto", maxHeight: "80vh" }}>
                    <Row className="bg-dark">
                        <Col className="bg-dark p-3">
                            {isLoading ? (
                                <Loader />
                            ) : (
                                <div className={styles.preview}>
                                    <div dangerouslySetInnerHTML={{ __html: data }} />
                                    {/* {data} */}
                                </div>
                            )}
                        </Col>
                    </Row>
                </Container>
            </Dialog>
        </>
    );
};

export default PrintPreview;
