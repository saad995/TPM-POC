import {
    faCheckCircle,
    faFilePdf,
    faTimesCircle
} from "@fortawesome/free-solid-svg-icons";

export const GetIconByStyle = (commandStyle: string) => {
    let Icon;
    switch (commandStyle) {
        case "ViewIPApproveButtonStyle":
            Icon = faCheckCircle;
            break;
        case "ViewIPRejectButtonStyle":
            Icon = faTimesCircle;
            break;
        default:
            Icon = faCheckCircle;
            break;
    }

    return Icon;
};
