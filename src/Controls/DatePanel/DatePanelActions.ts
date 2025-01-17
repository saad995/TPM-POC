import {
  IDateCriteria
} from "./DatePanelInterface";

import {
    GET_DATE_CRITERIA
} from "./DatePanelActionTypes";

export const getDateCriteria = (payload: IDateCriteria): any => {
    return {
        type: GET_DATE_CRITERIA,
        payload: payload
    };
};
