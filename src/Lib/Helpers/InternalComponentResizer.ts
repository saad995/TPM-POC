function handlingForXLComponents (classSplit: string[], extFunc?: any) {
    if (extFunc) extFunc(1, 0, 0);
    if (classSplit[1] === "xl") {
        return classSplit[0] + "-" + classSplit[2];
    } else if (classSplit[2] === "xl") {
        return classSplit[0] + "-" + classSplit[1] + "-" + classSplit[3];
    } else {
        return "";
    }
}
function handlingForLGComponents(classSplit: string[], extFunc?: any) {
    if (extFunc) extFunc(0, 0, 1);
    if (classSplit[1] === "md") {
        return classSplit[0] + "-" + classSplit[2];
    } else if (classSplit[2] === "md") {
        return classSplit[0] + "-" + classSplit[1] + "-" + classSplit[3];
    } else {
        return "";
    }
}
function handlingForMDComponents(classSplit: string[], extFunc?: any) {
    if (extFunc) extFunc(0, 0, 1);
    if (classSplit[1] === "md") {
        return classSplit[0] + "-" + classSplit[2];
    } else if (classSplit[2] === "md") {
        return classSplit[0] + "-" + classSplit[1] + "-" + classSplit[3];
    } else {
        return "";
    }
}
function handlingForSMComponents(classSplit: string[], extFunc?: any) {
    //Todo: Need to add support for External Function for SM Devices
    if (extFunc) extFunc(0, 0, 1);
    if (classSplit[1] === "sm") {
        return classSplit[0] + "-" + classSplit[2];
    } else if (classSplit[2] === "sm") {
        return classSplit[0] + "-" + classSplit[1] + "-" + classSplit[3];
    } else {
        return "";
    }
}
function handlingForXSComponents(classSplit: string[], className: string, extFunc?: any) {
    if (extFunc) extFunc(0, 0, 0);
    if (classSplit.length == 3) {
        if (!isNaN(parseInt(classSplit[2]))) {
            if (
                classSplit[1] == "sm" ||
                classSplit[1] == "md" ||
                classSplit[1] == "lg" ||
                classSplit[1] == "xl"
            ) {
                return "";
            } else {
                return className;
            }
        } else {
            return "";
        }
    } else if (classSplit.length == 4) {
        return "";
    } else {
        return className;
    }
}

const ComponentResizer = (size: string | undefined, className: string, extFunc?: any) => {
    let modClassName = className;
    let classSplit = modClassName.split("-");

    //size = "---px", have to remove px from end;

    if (size != undefined) {
        let onlyDigits = size.slice(0, -2);
        let elementSize = parseInt(onlyDigits);
        if (elementSize > 1200) {
            return handlingForXLComponents(classSplit, extFunc)
        } else if (elementSize > 992) {
            return handlingForLGComponents(classSplit, extFunc)
        } else if (elementSize > 768) {
            return handlingForMDComponents(classSplit, extFunc)
        } else if (elementSize > 576) {
            return handlingForSMComponents(classSplit, extFunc)
        } else {
            return handlingForXSComponents(classSplit, className, extFunc)
        }
    } else {
        return className;
    }
};

export const SizeChecker = (size: string | undefined) => {
    if (size != undefined) {
        let onlyDigits = size.slice(0, -2);
        let elementSize = parseInt(onlyDigits);

        if (elementSize > 1200) {
            return "xl";
        } else if (elementSize > 992) {
            return "lg";
        } else if (elementSize > 768) {
            return "md";
        } else if (elementSize > 576) {
            return "sm";
        } else {
            return "xs";
        }
    }
};

export default ComponentResizer;
