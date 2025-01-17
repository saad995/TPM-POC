import React from "react";

import Style from "./ImageUploader.module.scss";
import Avatar from "Assets/Images/Avatar.jpg"
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import defaultImg from "Assets/Images/Avatar.jpg";

interface IProps{
    imageUrl?: string;
    handleUpload?: any;
    disabled?: boolean
}

const ImageUploader = (props: IProps) => {
    const {imageUrl = Avatar, handleUpload, disabled} = props;
    const img = React.useRef<HTMLImageElement>(null);

    const state = {
        defaultSrc: defaultImg,
        errorOccured: false
    };

    const onError = () => {
        if(!state.errorOccured && img.current)
        {
            // set to true as to not loop if even defaultSrc is not found
            state.errorOccured = true;
            img.current.src = state.defaultSrc
        }
    }

    return (
        <span className={Style.uploadInput}>
            <label className={Style.customFileUpload}>
                <div className={Style.imgWrap}>
                    <div className={Style.uploadButton}><FontAwesomeIcon icon={faUpload} size="2x" className="mb-2"/><br/>Upload</div>
                    <img src={imageUrl} ref={img} onError={onError}/>
                </div>
                <input id="photo-upload" type="file" onChange={handleUpload} accept="image/*" disabled={disabled}/>
            </label>
        </span>
    );
};

export default ImageUploader;
