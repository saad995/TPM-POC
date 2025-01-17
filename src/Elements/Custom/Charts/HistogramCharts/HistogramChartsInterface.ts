
export interface IHistogramCharts {
    categories: any[];
    series: IHistogramChartsData[];
}

export interface IHistogramChartsData{
    name?: string;
    data: number[]
}
