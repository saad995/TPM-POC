import React from "react";

const colorCode = (str:string) => {
    switch(str){
        case "IP":
        return "#ffc107";
        case "EC":
        return "#17a2b8";
        case "RO":
        return "#009a5e";
        default:
        return "#009a5e"
    }
}

export default colorCode;