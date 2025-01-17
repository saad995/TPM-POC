import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IDonutCharts } from './DonutChartsInterface';
import Chart from 'Elements/Basic/Chart/Chart';
import ErrorBoundary from 'Elements/Basic/ErrorBoundary/ErrorBoundary';
// const data: IDonutCharts[] = [{
//   "name": "Coal", "share": 0.118
// }, {
//   "name": "Solar", "share": 0.052
// }, {
//   "name": "Wind", "share": 0.225
// }]

interface IProps {
  data: IDonutCharts[],
  title: string
}

const labelContent = (e: any) => (e.category);

const DonutChart = (props: IProps) => {
  const { data, title } = props;
  
  return (
    // <Chart>
    //   <ChartSeries>
    //     <ChartSeriesItem type="donut" data={data} categoryField="name" field="value">
    //       <ChartSeriesLabels color="#fff" background="none" content={labelContent} />
    //     </ChartSeriesItem>
    //   </ChartSeries>
    //   <ChartLegend visible={true} position='right'/>
    // </Chart>
    <ErrorBoundary >
      <Chart
        height={403}
        data={data}
        title={title}
        position={"right"}
        orientation={"vertical"}
        startAngle={45}
        type={"donut"}
        categories={data.map(x=> x.share)} />
    </ErrorBoundary>
  );
}

export default DonutChart
