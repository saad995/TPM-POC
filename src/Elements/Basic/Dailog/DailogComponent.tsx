import React, { useState, useEffect } from "react";
import _ from "lodash";

import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

import  "./DailogComponent.scss"

const DailogComponent = (props: any) => {
    const { confirm, isVisible, closeDailog, message="", btnName1 = "No" , btnName2 = "Yes" ,disabled = false, title, customClassName } = props;

    const getConfirm = (val: boolean) => {
        confirm(val);
        // closeDailog(false);
    };

    return (
        <div>
            {isVisible && (
                <Dialog
                style={{padding:50}}
                // contentStyle={{}}}
                title={title}
                width={300}
                    onClose={() => closeDailog(false)}
                >
                    
                    {message !== "" && 
                             <p  className="text-muted message-style" > {message} </p> }
                            
                    
                    <div className={customClassName}>
                        {props.children}
                    </div>
                    <DialogActionsBar>
                        <button
                            disabled={disabled}
                            className={`k-button pt-3 pb-3`}
                            onClick={() => closeDailog(false)}
                            >
                            {btnName1}
                        </button>
                        {btnName2 && <button
                            disabled={disabled}
                            className="k-button pt-3 pb-3 btn-primary"
                            onClick={confirm}
                        >
                            {btnName2}
                        </button>
                        }
                    </DialogActionsBar>
                </Dialog>
            )}
            
        </div>
    );
};

export default DailogComponent;
