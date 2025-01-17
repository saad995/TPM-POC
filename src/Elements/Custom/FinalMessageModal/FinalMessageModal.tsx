import React from "react";
import { Link } from "react-router-dom";

//Import Components
import { Dialog } from "@progress/kendo-react-dialogs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImportSVG from "Lib/Helpers/CustomSVGImporter";

//Import Styles
import style from  "./FinalMessageModal.module.scss";

interface IProps {
    title?:string;
    message?: string;
    icon?: any;
    btnClick?:any;
    link?:string;
    size?: any;
}

const FinalMessageModal = (props: IProps) => {
    const {title, message, icon, btnClick, link , size} = props;

    return (
        <Dialog className={style.finalMessageDialog}>
            <ImportSVG name="check-circle-outline" color="#009A5E" size={size} />

            {title && <h5 className="mt-3 text-align-center">
                {title}
            </h5>}

            {message && <p className="mt-3 text-align-center">
                {message}
            </p>}

            {link && <Link to={link}>
                <button className="k-button mt-2" onClick={btnClick}>
                    <FontAwesomeIcon icon={icon} className="mr-2" />
                    Back
                </button>
            </Link>}
        </Dialog>
    );
};

export default FinalMessageModal;
