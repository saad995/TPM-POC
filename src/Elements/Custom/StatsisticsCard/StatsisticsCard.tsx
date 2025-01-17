import ImportSVG from "Lib/Helpers/CustomSVGImporter";
import React from "react";
import { IStatsisticsCard } from "./StatsisticsCardInterface";
import './StatsisticsCard.scss';
const StatsisticsCard = (props: IStatsisticsCard) => {
    const icon = props.icon;
    const title = props.title;
    const count = props.count;

    return (
        <div className="mainContainer">
            <ImportSVG name={icon} size={100} color="#008B55" className= "mr-1 mr-md-4" />
            <div className="contentBox">
                <p className="title">{title}</p>
                <p className="count">{count}</p>
            </div>
            
        </div>
    );
};

export default StatsisticsCard;
