export interface IViewPanelKeysLabels {
    keys: any[];
    labels: string[];
}

export interface IExportLayoutData {
    viewPanelKeysLabels: IViewPanelKeysLabels;
    viewPanelData: any;
    gridColumns: any;
    reportData: any;
    fileName: string;
    reportTitleHeader: string;
}
