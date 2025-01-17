import { faCircle, faPlusCircle, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardBody, CardHeader } from "@progress/kendo-react-layout";
import ImportSVG from "Lib/Helpers/CustomSVGImporter";
import React from "react";
import { Col, Row } from "react-bootstrap";
import internal from "stream";
import style from "./Tile.module.scss";

interface IProps {
    Title: string;
    subTitle: string;
    count: number;
    onClick?: any;
    onClickTile?: any;
    disabled?: boolean;
    contentIcon?: string;
}

const Tile = (props: IProps) => {
    return (
        <Card className="d-block d-sm-inline-block d-lg-block ml-sm-2 ml-md-2 ml-lg-0 mt-4">
            <CardHeader className={`k-hbox ${style.tileHeader} ${props.disabled ? style.bgDisable : ""}`}>
                <Row
                    className="justify-content-between w-100 no-gutters align-content-center"
                    onClick={props.disabled ? undefined : props.onClickTile}>
                    <Col xs={12}>
                        <p className={props.disabled ? `${style.type} ${style.textDisable}` : `text-white`}>
                            {props.Title}
                        </p>
                    </Col>

                    {props.disabled ? (
                        <Col xs={12} className={`${style.underConstruction} text-center`}>
                            <div className={`${style.vl}`}></div>
                        </Col>
                    ) : (
                        ""
                    )}
                    {/* <Col sm={6} xs={6} md={6} lg={6}>
                        {props.disabled == true ? (
                            <span>
                                <div className={`${style.underConstruction} text-center`}>
                                    <ImportSVG
                                        name="underConstruction"
                                        size={35}
                                        color="#6F7174"
                                        hoverClassName="card-icon"
                                    />
                                </div>
                                <p className={`${style.underConstruction} mr-1 text-center`}>Under Construction</p>
                            </span>
                        ) : props.disabled == false ? (
                            <span style={{ float: "right" }}>
                                <p className={`${style.create} text-center`}>Create </p>
                                <FontAwesomeIcon
                                    className="d-inline"
                                    icon={faPlusCircle}
                                    size={"lg"}
                                    style={{
                                        color: "white"
                                    }}
                                />
                            </span>
                        ) : (
                            ""
                        )}
                    </Col> */}
                </Row>
            </CardHeader>

            <CardBody className={`p-0 ${style.tileBody}`}>
                <Row className="no-gutters">
                    <Col className={`border-right  p-4 ${style.tileSection} text-center`} onClick={props.onClick}>
                        <span onClick={props.onClick}>
                            <p className={`text-center ${style.starIcon}`}>
                                <h3 className="d-flex align-items-center">
                                    {props.contentIcon && <ImportSVG name={props.contentIcon} color="#000"  size={28} className="mr-1"/>}{props.count}
                                
                                </h3>
                                {/* {props.subTitle} */}
                            </p>
                        </span>
                    </Col>
                </Row>
            </CardBody>
        </Card>
        //     </div>
        // </div>
    );
};
export default Tile;
