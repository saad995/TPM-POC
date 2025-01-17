import { TokenTypes } from './LoginInterfaces';
import { SET_INTERVAL, SET_TOKEN } from './LoginActionTypes';
import _ from "lodash";
import jwtDecode from 'jwt-decode';


const defaultState = {
  token: "",
  isActive: true,
    isDevMode : "True"
}


const loginReducer = (state = defaultState, action: TokenTypes) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state, token: action.token, isDevMode: jwtDecode<any>(action?.token).devMode
      };
    case SET_INTERVAL:
      return {
        ...state, isActive: action.isActive
      };
    default:
      return state
  }
}

export default loginReducer;