//Import Dispatch from redux
import { Dispatch } from "redux";
import _ from "lodash";

//Import action types


//Import data types for action
import { clearAlert,  } from "Elements/Basic/AlertDismissible/AlertDismissibleActions";


//import interface
import { IMessage } from "Elements/Basic/AlertDismissible/AlertDismissibleInterfaces";
import { stepAction } from "Modules/Common/Actions/SubscriptionActions";
import { subTabActivate } from "Elements/Custom/AutoTabstrip/AutoTabstrip";
import { IRedirectStepperRequest } from "./PaymentProfileInterfaces";


/************************** Actions Creators************************/


//get update profile payment data

    export const redirectStepperAction = (payload: IRedirectStepperRequest) => async (dispatch: Dispatch<any>) => {
        dispatch(stepAction(payload.step)); 
        subTabActivate(payload.stepperId);
        const message: IMessage = {
            code: "",
            description: ""
        };
        dispatch(clearAlert(message));
};

