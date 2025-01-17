import { faPlusCircle, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardBody, CardHeader } from "@progress/kendo-react-layout";
import ImportSVG from "Lib/Helpers/CustomSVGImporter";
import React from "react";
import { Col, Row } from "react-bootstrap";
import style from "./Tile.module.scss";

interface IProps {
    TradeType: string;
    saved: string;
    submitted: string;
    onClickSaved?: any;
    onClickSubmitted?: any;
    onClickTile?: any;
    disabled?: boolean;
}

// TODO SAAD : Refactor and make the component dynamic.

const Tile = (props: IProps) => {
    const card = {
        GDType: props.TradeType,
        saved: props.saved,
        submitted: props.submitted
    };
    return (
        // <div
        //     style={{
        //         display: "flex",
        //         justifyContent: "space-evenly",
        //         flexWrap: "wrap"
        //     }}
        // >
        //     <div>
        <Card className="d-block d-sm-inline-block d-lg-block ml-sm-2 ml-md-2 ml-lg-0 mt-4">
            <CardHeader className={`k-hbox ${style.tileHeader} ${props.disabled ? style.bgDisable : ""}`}>
                <Row
                    className="justify-content-between w-100 no-gutters align-content-center"
                    onClick={props.disabled ? undefined : props.onClickTile}>
                    <Col sm={4} xs={4} md={4} lg={4}>
                        <p
                            className={
                                props.disabled ? `${style.tradeType} title ${style.textDisable}` : `title text-white`
                            }>
                            {props.TradeType}
                        </p>
                    </Col>

                    {props.disabled ? (
                        <Col sm={2} xs={2} md={2} lg={2} className={`${style.underConstruction} text-center`}>
                            <div className={`${style.vl}`}></div>
                        </Col>
                    ) : (
                        ""
                    )}
                    <Col sm={6} xs={6} md={6} lg={6}>
                        {props.disabled ? (
                            <span>
                                <div className={`${style.underConstruction} text-center`}>
                                    <ImportSVG
                                        name="underConstruction"
                                        size={35}
                                        color="#6F7174"
                                        className="card-icon"
                                    />
                                </div>
                                <p className={`${style.underConstruction} mr-1 text-center`}>Under Construction</p>
                            </span>
                        ) : (
                            <span style={{ float: "right" }}>
                                <p className={`${style.createDeclaration} text-center`}>Create Declaration</p>
                                <FontAwesomeIcon
                                    className="d-inline"
                                    icon={faPlusCircle}
                                    size={"lg"}
                                    style={{
                                        color: "white"
                                    }}
                                />
                            </span>
                        )}
                    </Col>
                </Row>
            </CardHeader>

            <CardBody className={`p-0 ${style.tileBody}`}>
                <Row className="no-gutters">
                    <Col
                        id={`${props.TradeType}-saved`}
                        className={`border-right col-6 p-4 ${style.tileSection} text-center`}
                        onClick={props.onClickSaved}>
                        {/* <span onClick={props.onClickSaved}> */}
                        <p className={`text-center ${style.starIcon}`}>
                            <FontAwesomeIcon
                                icon={faStar}
                                style={{
                                    color: "#d3d70e"
                                }}
                                className="mr-1"
                            />
                            {" Saved"}{" "}
                        </p>
                        <h5>
                            <strong>{props.saved}</strong>
                        </h5>

                        {/* </span> */}
                    </Col>
                    <Col  id={`${props.TradeType}-submitted`} className={`pt-4 col-6 ${style.tileSection} text-center`} onClick={props.onClickSubmitted}>
                        <p className={`text-center mb-1 ${style.submitIcon}`}>
                            <ImportSVG name="doubleCheck" size={20} color={"green"} />
                            {" Submitted"}
                        </p>
                        <h5>
                            <strong>{props.submitted}</strong>
                        </h5>
                    </Col>
                </Row>
            </CardBody>
        </Card>
        //     </div>
        // </div>
    );
};
export default Tile;
