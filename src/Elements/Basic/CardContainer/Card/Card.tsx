
import React from "react";
import _ from 'lodash';
import { Card, Col, Row } from "react-bootstrap";
import "./Card.scss";
import ImportSVG from "Lib/Helpers/CustomSVGImporter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";

interface IProps {
    url?: string;
    name: string;
    description: string;
    className?: string;
    selected?: boolean;
    disable?:boolean;
}

const SubCard = (props: IProps) => {
    const card = {
        name: props.name,
        description: props.description,
        scrollViewItems: {
            url: props.url
        }
    };

    return (
         <Card id="card" className={(props.selected == true) ? "CardwText CardSelected h-100 p-2 p-md-4" : (props.disable ? "CardwText card-disable h-100 p-2 p-md-4" : (props.url != null ? "Card h-100 p-2 p-md-4" : "CardwText h-100 p-2 p-md-4"))}>
            <div className="extra-space">
            <Row className="my-auto">
            {props.url && <Col id="card-img-container" xs="3" md="3" lg="12" className="mx-auto mb-lg-4 d-flex justify-content-center"> <ImportSVG name={props.url} size={100} color="#8C8C8C" className="card-icon"/></Col> }
            
            <Col id="card-content-container" className="align-self-center">
            <Card.Body id="card-content" className={props.url != null ? "CardBody":"CardBody"}>
                <h5 id="card-content-title">{props.name}</h5>
                {
                    props.disable == false ? 
                    <p id="card-content-description">{props.url != null ? props.description:""}</p> : null

                }
              
                
               <FontAwesomeIcon
                                    icon={faArrowCircleRight}
                                    className="go-icon"
                                    size="2x"
                                    color="#009A5E"
                                />
            </Card.Body>
            </Col>
            </Row>
            </div>
        </Card>
    );
};
export default SubCard;