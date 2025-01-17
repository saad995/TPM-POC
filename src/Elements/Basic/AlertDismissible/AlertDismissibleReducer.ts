import { AlertReducerTypes } from './AlertDismissibleInterfaces';
import { ALERT_SUCCESS, ALERT_ERROR, ALERT_CLEAR, ALERT_INFO, MODAL_ALERT_ERROR, MODAL_ALERT_SUCCESS, MODAL_ALERT_CLEAR } from './AlertDismissibleActionTypes';
import _ from "lodash";

//default state
const defaultState: IAlertState = {
  visible: false,
  variant: '',
  description: '',
  modalVisible: false,
  modalVariant: '',
  modalDescription: ''
};

export interface IAlertState {
  visible?: boolean,
  variant?: string,
  description?: string,
  modalVisible?: boolean,
  modalVariant?: string,
  modalDescription?: string

}

const alert = (state: IAlertState = defaultState, action: AlertReducerTypes): IAlertState => {
  switch (action.type) {
    case ALERT_SUCCESS:
      
      
      return {
        visible: !_.isEmpty(action.payload?.code) ? true : false,
        variant: 'success',
        description: action.payload?.description
      };
    case ALERT_ERROR:
      return {
        visible: !_.isEmpty(action.payload?.code) ? true : false,
        variant: 'danger',
        description: action.payload?.description
      };
    case ALERT_INFO:
      return {
        visible: !_.isEmpty(action.payload?.code) ? true : false,
        variant: 'info',
        description: action.payload?.description
      };
    case ALERT_CLEAR:
      return {
        visible: false,
        variant: '',
        description: ''
      };
    case MODAL_ALERT_SUCCESS:
      return {
        modalVisible: !_.isEmpty(action.payload?.code) ? true : false,
        modalVariant: 'success',
        modalDescription: action.payload?.description
      };
    case MODAL_ALERT_ERROR:
      return {
        modalVisible: !_.isEmpty(action.payload?.code) ? true : false,
        modalVariant: 'danger',
        modalDescription: action.payload?.description
      };
    case MODAL_ALERT_CLEAR:
      return {
        modalVisible: false,
        modalVariant: '',
        modalDescription: ''
      };
    default:
      return state
  }
}

export default alert;