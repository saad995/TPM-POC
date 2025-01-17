import React from "react";
import ReduxToastr from "react-redux-toastr";

const Toaster = (props: any) => {
    return (
        <ReduxToastr
            timeOut={3000}
            newestOnTop={false}
            preventDuplicates
            position="bottom-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick={true}
        />
    );
};

export default Toaster;
