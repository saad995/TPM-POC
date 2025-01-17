import React from "react";
import _ from "lodash";

import { Row, Col } from "react-bootstrap";

//Import Components
import Guage from "Elements/Basic/Guage/Guage";

//Import Style
import Styles from "./ReportTile.module.scss"

interface IOptions{
    color?:string;
    value:number;
    heading?:string;
}
interface IProps {
    options: IOptions[];
}

const Tile = (props: IProps) => {
    const { options=[] } = props;

    return (
        <div  className={`border shadow-sm rounded d-flex flex-column align-items-center" ${Styles.tile}`}>
            {
                options.map((item:IOptions,index:number) => {
                    return(
                        <div className={"w-100 p-4 d-flex border-bottom"} key={index}>
                              <div className="d-inline-block">
                                <h4 className="font-weight-bolder" style={{color: _.get(item,'color',"blue")}}>{_.get(item,'value',0)}</h4>
                                <h5 className="text-muted">{_.get(item,'heading',"N/A")}</h5>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default Tile;