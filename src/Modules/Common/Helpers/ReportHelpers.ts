import { savePDF } from "@progress/kendo-react-pdf";
import _ from "lodash";
import { formatDate } from "./DateHelper";

export const exportToPDF = async (
    gridContainer: React.RefObject<HTMLDivElement>,
    fileName: string
): Promise<boolean> => {
    let element = gridContainer.current || document.body;

    savePDF(element, {
        paperSize: "A1",
        margin: 20,
        repeatHeaders: true,
        fileName: fileName
    });

    return true;
};

export const exportToHTML = (
    gridContainer: React.RefObject<HTMLDivElement>,
    anchor: React.RefObject<HTMLAnchorElement>,
    fileName: string
) => {
    let element = gridContainer.current || document.body;

    let elementClone = element.cloneNode(true) as HTMLElement;

    let allElements = element.getElementsByTagName("*");
    let allElementsClone = elementClone.getElementsByTagName("*");
    let foundImage = false;

    for (let i = -1, l = allElements.length; ++i < l; ) {
        if (!foundImage && allElements[i].nodeName.toLowerCase() === "img") {
            foundImage = true;
            toAbsoluteImage(allElements[i], allElementsClone[i]);
        }
        applyStyle(allElements[i], allElementsClone[i]);
    }

    let type = "data:text/html;charset=utf-8,";
    saveFile(fileName, type, elementClone.outerHTML, anchor);
};


export const saveFile = (name: string, type: string, data: any, csvAnchor: React.RefObject<HTMLAnchorElement>) => {
    if (data != null && navigator.msSaveBlob) return navigator.msSaveBlob(new Blob([data], { type: type }), name);

    const url = window.URL.createObjectURL(new Blob([data], { type: type }));

    let anchorElement = csvAnchor.current || document.createElement("a");
    anchorElement.setAttribute("href", url);
    anchorElement.setAttribute("style", "display:none");
    anchorElement.setAttribute("download", name);
    anchorElement.click();
    window.URL.revokeObjectURL(url);
    anchorElement.remove();
};

export const applyStyle = (elem: Element, elementToStyle: Element) => {
    if (!elem) return []; // Element does not exist, empty list.
    let win = document.defaultView || window,
        style,
        styleNode = "";
    if (win.getComputedStyle) {
        /* Modern browsers */
        style = win.getComputedStyle(elem, "");
        for (let i = 0; i < style.length; i++) {
            styleNode += `${style[i]}:${style.getPropertyValue(style[i])};`;
            //               ^name ^           ^ value ^
        }
    }

    elementToStyle.setAttribute("style", styleNode);
};

export const toAbsoluteImage = (elem: Element, elementToStyle: Element) => {
    if (!elem) return []; // Element does not exist, empty list.
    let imageSrc = elem.getAttribute("src");
    let port = window.location.port ? `:${window.location.port}` : "";
    const styleNode = `${window.location.protocol}//${window.location.hostname}${port}${imageSrc}`;
    elementToStyle.setAttribute("src", styleNode);
};

export const validateDates = (
    fromDate: Date,
    toDate: Date,
    minDate: Date,
    maxDate: Date
): [fromDateValidationMsg: string, toDateValidationMsg: string] => {
    minDate.setHours(0, 0, 0, 0);
    maxDate.setHours(0, 0, 0, 0);

    let fromTime: number = -1;
    let toTime: number = -1;
    let minTime = minDate.getTime();
    let maxTime = maxDate.getTime();

    let fromDateValidationMsg = "";
    let toDateValidationMsg = "";
    let isFromDateNull = false;
    let isToDateNull = false;

    if (fromDate === null) {
        fromDateValidationMsg = "From Date must be correct";
        isFromDateNull = true;
    }

    if (toDate === null) {
        toDateValidationMsg = "To Date must be correct";
        isToDateNull = true;
    }

    fromDate.setHours(0, 0, 0, 0);
    fromTime = fromDate.getTime();

    toDate.setHours(0, 0, 0, 0);
    toTime = toDate.getTime();

    //fromDate validation
    if (!isFromDateNull) {
        if (fromTime > maxTime) {
            fromDateValidationMsg = "From Date must not be ahead of today";
        } else if (fromTime < minTime) {
            fromDateValidationMsg = `From Date must be greater than or equal to ${formatDate(minDate)}`;
        } else if (!isToDateNull && toTime >= minTime && toTime <= maxTime && fromTime > toTime) {
            fromDateValidationMsg = "From Date must be less than To Date";
        }
    }

    //toDate validation
    if (!isToDateNull) {
        if (toTime > maxTime) {
            toDateValidationMsg = "To Date must not be ahead of today";
        } else if (toTime < minTime) {
            toDateValidationMsg = `To Date must be greater than or equal to ${formatDate(minDate)}`;
        } else if (!isFromDateNull && fromTime >= minTime && fromTime <= maxTime && toTime < fromTime) {
            toDateValidationMsg = "To Date must be greater than From Date";
        }
    }

    return [fromDateValidationMsg, toDateValidationMsg];
};
