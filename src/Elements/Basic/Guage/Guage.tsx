import * as React from "react";
import * as ReactDOM from "react-dom";
import { CircularGauge } from "@progress/kendo-react-gauges";

interface IProps{
    color?:string;
    value:number;
}

const gaugeStyles = {
    display: "block",
    width:"100px",
    height:"100px"
};

const Gauge = (props: IProps) => {
    const { color="red", value } = props;
    const centerRenderer = () => <h3 style={{ color: color }}>{value}</h3>;
    return (
        <CircularGauge
            style={gaugeStyles}
            value={value}
            color={color}
            centerRender={centerRenderer}
        />
    );
};

export default Gauge;
