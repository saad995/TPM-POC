import React, { useState, useEffect } from "react";
import _ from "lodash";

import styles from "./Modal.module.scss";

import { Dialog } from "@progress/kendo-react-dialogs";

//Import Helper
import ImportSVG from "Lib/Helpers/CustomSVGImporter";

//Import Events
import Event from "Lib/PubSub/Event";

interface IProps {
    type?: string;
    children?: any;
    isButton?: boolean;
    getValue?: any;
    title?: any,
    className?: string
    
   
}

const CustomTitleBar = (props: any) => {
    const { msg } = props;

    return (
        <div className="custom-title d-flex py-2">
            <div className="align-self-center">
                <ImportSVG
                    color="#999999"
                    size={26}
                    name="info-circle-outline"
                />
            </div>
            <div className="align-self-center ml-2">
                <p style={{ margin: "0", textAlign: "left" }}>{msg}</p>
            </div>
        </div>
    );
};

const Modal = ( props: IProps ) =>
{
    
    const { className } = props;

    const [content, setContent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");

    const setMessage = (title: string, content: any) => {
        setContent(content);
        setShowModal(true);
        setTitle(title);
    };
    const clearMessage = () => {
        setContent(null);
        setShowModal(false);
        setTitle("");
    };

    useEffect(() => {
        Event.on("showModal", setMessage).on("clearAllMessage", clearMessage);
    }, []);

    const modal = (
        <Dialog
            title={<CustomTitleBar msg={title} />}
            onClose={() => clearMessage()}
            className={`${styles.BasicModal} ${className}`}

        >
            {content}
        </Dialog>
    );

    return <div>{showModal && modal}</div>;
};

export default Modal;
