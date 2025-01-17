import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./Loader.scss";



const LoaderComponent = (props: any) => {
    const { color, className, type } = props;
    return (
        <Loader
            type={props.type ?? "Oval"}
            color={color ? color : "#009A5E"}
            height={100}
            width={100}
            // timeout={3000} //3 secs
            className={className ? "loader " + className : "loader loader-fixed"}
        />
    );
};

export default LoaderComponent;

//https://www.npmjs.com/package/react-loader-spinner
