import { useEffect } from "react";
import { Container } from "react-bootstrap";
import styles from "./ReleaseOrder.module.scss";
import { useDispatch } from "react-redux";
import { setPageTitleAction } from "Layouts/AppLayout/AppLayoutActions";

const ReleaseOrder = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitleAction("Release Order"));
    }, []);

    return (
        <Container
            className={`${styles.dppGrid} pl-3 pr-3`}
            style={{
                backgroundColor: "#F5F7FB",
                gridArea: "main",
                zIndex: 1
            }}
            fluid>
        </Container>
    );
};

export default ReleaseOrder;
