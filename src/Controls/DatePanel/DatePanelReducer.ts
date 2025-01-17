import {
    // GET_AUTO_DATE_CRITERIA,
    // GET_MANUAL_DATE_CRITERIA,
    GET_DATE_CRITERIA
} from "./DatePanelActionTypes";
import { IDateCriteria, DateCriteriaTypes } from "./DatePanelInterface";
import moment from "moment";

import _ from "lodash";

//default state
// const defaultState: IDateCriteria = {
//     isManual: false,
//     auto: {
//         date: moment(new Date()).format("YYYY-MM-DD")
//     },
//     manual: {
//         fromDate: moment(new Date()).format("YYYY-MM-DD"),
//         toDate: moment(new Date()).format("YYYY-MM-DD")
//     }
// };

const defaultState: IDateCriteria = {
    isManual: false,
    fromDate: moment(new Date()).format("YYYY-MM-DD"),
    toDate: moment(new Date()).format("YYYY-MM-DD")
};

const DatePanelReducer = (
    state: IDateCriteria = defaultState,
    action: DateCriteriaTypes
): IDateCriteria => {
    switch (action.type) {
        case GET_DATE_CRITERIA:
            return {
                ...state,
                fromDate: action.payload.fromDate,
                toDate: action.payload.toDate,
                isManual: action.payload.isManual
            };
        default:
            return state;
    }
};

export default DatePanelReducer;
