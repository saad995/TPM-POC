import {FORM_STATE_CLEAR_STATE, FORM_STATE_UPDATE} from '../Subscription/SubscriptionActionTypes';

export const defaultState = {
    loading: false,
    step: 100
};

 const formState = (state = defaultState, action:any) => {

  switch (action.type) {
    case FORM_STATE_UPDATE:
      return {
        ...state,
        step: action.step
      };
    case FORM_STATE_CLEAR_STATE:
        return {
            ...defaultState
        };
    default:
      return state
  }
}

export default formState;