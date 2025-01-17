import {FLOW_STATE_CLEAR_STATE, FLOW_STATE_UPDATE} from '../Subscription/SubscriptionActionTypes';

const defaultState = {
    loading: false,
    step: 1
};

 const formState = (state = defaultState, action:any) => {

  switch (action.type) {
    case FLOW_STATE_UPDATE:
      return {
        ...state,
        step: action.step
      };
    case FLOW_STATE_CLEAR_STATE:
        return {
            ...defaultState
        };
    default:
      return state
  }
}

export default formState;

