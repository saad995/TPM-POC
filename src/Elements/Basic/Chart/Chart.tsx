import { useEffect, useState } from "react";


import {
    Chart,
    ChartSeries,
    ChartSeriesItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
    ChartTitle,
    ChartLegend,
    ChartValueAxis,
    ChartValueAxisItem
} from "@progress/kendo-react-charts";

interface IProps {
    categories?: number[];
    data: any;
    title: string;
    position: "top" | "bottom" | "left" | "right" | "custom" | undefined;
    orientation: "horizontal" | "vertical";
    startAngle: number;
    type: string;
    gap?: number;
    height?: number;
    labels?:{}
}

const ChartComponent = (props: IProps) => {
    const { categories, data, title, position, orientation, startAngle, type, gap = 2, height = 350, labels } = props;
    const [minorUnit, setMinorUnit] = useState(1);
    const [majorUnit, SetMajorUnit] = useState(1);

    useEffect(() => {
        setUnits();
    }, [data]);

    const setUnits = () => {
        if (data && data.some((x: any) => x.data && x.data.length > 0)) {
            let max = 0;
            data.forEach((element: any) => {
                let elementMax = Math.max(...element.data);
                if (elementMax > max) {
                    max = elementMax;
                }
            });
            setMinorUnit(Math.ceil((max / 100) * 5));
            SetMajorUnit(Math.ceil((max / 100) * 10));
        }
    };

    const chartType = (type: string) => {
        switch (type) {
            case "column":
                return data.map((item: any, idx: number) => (
                    <ChartSeriesItem
                        key={idx}
                        type="column"
                        tooltip={{ visible: true }}
                        data={item.data}
                        name={item.name}
                        gap={gap}
                    />
                ));
            case "line":
                return data.map((item: any, idx: number) => (
                    <ChartSeriesItem
                        key={idx}
                        type="line"
                        tooltip={{ visible: true }}
                        data={item.data}
                        name={item.name}
                    />
                ));
            case "area":
                return data.map((item: any, idx: number) => (
                    <ChartSeriesItem
                        key={idx}
                        type="area"
                        tooltip={{ visible: true }}
                        data={item.data}
                        name={item.name}
                    />
                ));
            case "pie":
                return (
                    <ChartSeriesItem
                        type="pie"
                        overlay={{
                            gradient: "sharpBevel"
                        }}
                        tooltip={{ visible: true }}
                        data={data}
                        categoryField="name"
                        field="share"
                    />
                );
                case "donut":
                return (
                    <ChartSeriesItem
                        type="donut"
                        overlay={{
                            gradient: "sharpBevel"
                        }}
                        tooltip={{ visible: true }}
                        data={data}
                        categoryField="name"
                        field="share"
                        color= "pink"
                    />
                );
               
        }
    };

    return (
        <Chart style={{ height: height }}>
            <ChartTitle text={title} />
            <ChartLegend position={position} orientation={orientation} />
            <ChartValueAxis>
                <ChartValueAxisItem min={0} minorUnit={minorUnit} majorUnit={majorUnit} />
            </ChartValueAxis>
            <ChartCategoryAxis>
            <ChartCategoryAxisItem categories={categories} startAngle={startAngle} labels={labels} />
            </ChartCategoryAxis>
            <ChartSeries>{chartType(type)}</ChartSeries>
        </Chart>
    );
};

export default ChartComponent;
