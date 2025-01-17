import * as React from "react";
import * as ReactDOM from "react-dom";

import { IHistogramCharts } from "./HistogramChartsInterface";
import Chart from "Elements/Basic/Chart/Chart";

const HistogramChart = ({ data }: any) => {
    return (
        <Chart
            height={403}
            categories={data.categories}
            data={data.series}
            title={""}
            position={"bottom"}
            orientation={"horizontal"}
            startAngle={120}
            type={"column"}
            labels={{ rotation: "auto" }}
        />
    );
};

export default HistogramChart;
