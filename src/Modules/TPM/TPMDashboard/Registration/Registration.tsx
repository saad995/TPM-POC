import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Grid from "./Grid/Grid";
import { Container } from "react-bootstrap";
import styles from "./Registration.module.scss";
import { setPageTitleAction } from "Layouts/AppLayout/AppLayoutActions";

const Registration = () => {
    // Variables
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitleAction("Treatment Provider Registration"));
    }, []);

    return (
        <Container className={`${styles.dppGrid} px-3 h-100`} fluid>
            <Grid />
        </Container>
    );
};

export default Registration;