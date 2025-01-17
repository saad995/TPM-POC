import React from "react";
import _ from "lodash";
import { Dialog } from "@progress/kendo-react-dialogs";

import "./SuccessModal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    IconProp,
  } from '@fortawesome/fontawesome-svg-core'

import ImportSVG from "Lib/Helpers/CustomSVGImporter";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

interface IProps {
    title?:string;
    description?:string;
    icon?:IconProp;
    link?:string
};

const SuccessModal = (props: IProps) => {
    const { title, description, icon, link } = props;

    const dispatch = useDispatch();

    const clearFormState = ()=> {
    }
  

    return (
    
        <Dialog className="final-message-dialog">
        <ImportSVG name="check-circle-outline" color="#009A5E" size={90} />
 
        <h5 className="mt-3 text-align-center">
                {title}
        </h5>

        <p className="mt-3 text-align-center">
        {description}
        </p>

        
        <Link to={link}>
        <button className="k-button" onClick = {clearFormState}>
            <FontAwesomeIcon icon={_.get(icon, "", "")} className="mr-2"/>
        Return to Home
        </button>
        </Link>
       
    </Dialog>    
        
    );
};

export default SuccessModal;
