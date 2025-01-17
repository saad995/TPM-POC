import { CLEAR_TAB_STATE, TAB_STATE_UPDATE } from "./TabStripActionTypes";

export interface IClearTabActionType {
    type: typeof CLEAR_TAB_STATE;
}
export interface IUpdateTabActionType {
    type: typeof TAB_STATE_UPDATE;
    tab: number;
}

export enum Tabs {
    INQUEUE = 0,
    AMENDMENT = 1,
    RENEWAL = 2
}