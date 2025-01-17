import {
    // GET_AUTO_DATE_CRITERIA,
    // GET_MANUAL_DATE_CRITERIA,
    GET_DATE_CRITERIA
} from "./DatePanelActionTypes";
export interface IDateCriteria{
    isManual: boolean,
    fromDate:  string,
    toDate: string,
}

export interface IGetDateCriteria {
    type: typeof GET_DATE_CRITERIA;
    payload: IDateCriteria;
}
export type DateCriteriaTypes = IGetDateCriteria;