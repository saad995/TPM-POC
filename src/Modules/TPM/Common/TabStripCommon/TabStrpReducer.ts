import { CLEAR_TAB_STATE, TAB_STATE_UPDATE } from "./TabStripActionTypes";

export const defaultState = {
    loading: false,
    tab: 0
};

 const TabSripStateReducer = (state = defaultState, action:any) => {

  switch (action.type) {
    case TAB_STATE_UPDATE:
      return {
        ...state,
        tab: action.tab
      };
    case CLEAR_TAB_STATE:
        return {
            ...defaultState
        };
    default:
      return state
  }
}

export default TabSripStateReducer;