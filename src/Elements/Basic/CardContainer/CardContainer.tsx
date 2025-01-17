import _ from "lodash";
import React from "react";
import { Col, Row } from "react-bootstrap";
import SubCard from "./Card/Card";
import "./CardContainer.scss";

interface IProps {
    defaultCallback: string;
    cards: any;
    getCallback: any;
    classes: string;
    addScale?: boolean;
    id?: string;
    disable?: boolean;
    containsImage?: boolean;

    xs?: any;
    sm?: any;
    md?: any;
    lg?: any;
    xl?: any;
}

const CardContainer = (props: IProps) => {
    const [callbackVal, setCallbackVal] = React.useState(props.defaultCallback);

    const select = (
        event: React.MouseEvent<HTMLDivElement>,
        StateID: string
    ) => {
        let x = event.currentTarget.firstElementChild;
        props.getCallback(event.currentTarget.id);
        if (x && event.currentTarget.id != StateID) {
            let old = document.getElementById(StateID)?.firstElementChild;
            if (old) {
                if(props.containsImage) {
                    old.classList.remove("CardSelected");
                    x.classList.add("CardSelected");
                };
                setCallbackVal(event.currentTarget.id);
            }
        }
     }
    

    return (
        <Row
            id={props.id + "-container"}
            className={`CardContainer no-gutters ${props.classes}`}
        >
            {_.map(props.cards, (items, index) => {

                return (
                    <Col
                        id={props.id}
                        xl={props.xl}
                        lg={props.lg}
                        md={props.md}
                        sm={props.sm}
                        xs={props.xs}
                    >
                        <div
                            id={
                                !_.isEmpty(items.id)
                                    ? items.id
                                    : _.toString(index)
                            }
                            onClick={(event) => {
                                if(!items.disable){
                                    select(event, callbackVal);
                                }
                            }}
                            className="h-100"
                        >
                            <SubCard
                                url={items.url}
                                name={items.name}
                                description={items.description}
                                selected={items.selected}
                                disable={items.disable}
                            />
                        </div>
                    </Col>
                );
            })}
        </Row>
    );
};

export default CardContainer;
