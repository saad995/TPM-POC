import { CLEAR_TAB_STATE, TAB_STATE_UPDATE } from "./TabStripActionTypes";
import { IClearTabActionType, IUpdateTabActionType } from "./TabStripInterface";


export const updateTabStripAction = (tab:number): IUpdateTabActionType => {
    return { type: TAB_STATE_UPDATE, tab: tab };
}

export const clearTabStripState = (): IClearTabActionType => {
    return { type: CLEAR_TAB_STATE };
}