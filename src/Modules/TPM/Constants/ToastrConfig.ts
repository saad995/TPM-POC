import { Dispatch } from "react";
import { actions as toastrActions, toastType } from "react-redux-toastr";

export const setToastr = (props: any) => async (dispatch: Dispatch<any>) => {
    let type = props.type as toastType;
    dispatch(
        toastrActions.add({
            type: `${type}`,
            title: `${props.title}`,
            position: "top-right", // This will override the global props position.
            message: `${props.message}`,
            options: {
                timeOut: 5000,
                progressBar: false,
                showCloseButton: false,
                removeOnHover: true
            }
        })
    );
};
