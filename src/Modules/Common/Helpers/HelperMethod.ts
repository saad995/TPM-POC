import store from "Store";
import _ from "lodash";
import { IDataMaskingDefaultState , IDataMaskingkKeys } from "../DataMasking/DataMaskingInterface";
import jwtDecode from "jwt-decode";
import { setDataMaskingSuccess } from "../DataMasking/DataMaskingAction";
import Config from "Config";
import CryptoJS from "crypto-js";
import {encrypt as concave, decrypt as convex} from "crypto-js/aes"
import {parse} from "crypto-js/enc-utf8"
import {mode as m, PBKDF2 as pb} from "crypto-js"
import pk from "crypto-js/pad-pkcs7"

export const removeEmptyKeysFromObject = (newObj: any) => {
    try {
        if (newObj) {
            Object.keys(newObj).forEach((key) => {
                if (
                    Object.prototype.toString.call(newObj[key]) === "[object Date]" &&
                    (newObj[key].toString().length === 0 || newObj[key].toString() === "Invalid Date")
                ) {
                    newObj[key] = "N/A";
                } else if (newObj[key] && typeof newObj[key] === "object") {
                    removeEmptyKeysFromObject(newObj[key]);
                } else if (_.isNil(newObj[key]) || newObj[key] === "") {
                    newObj[key] = "N/A";
                }
            });
        }
        return newObj;
    } catch {
        return newObj;
    }
};

export const removeNAFromProperties = (obj: any) => {
    try {
        let newObj = JSON.parse(JSON.stringify(obj));

        if (newObj) {
            Object.keys(newObj).forEach((key) => {
                if (newObj[key] === "N/A") {
                    newObj[key] = null;
                }
            });
        }
        return newObj;
    } catch {
        return obj;
    }
};

// CamelCase to Title Case
// e.g hasNoPromotionPolicy = Has No Promotion Policy
export const CamelCaseToTileCase = (text: any) => {
    if (text) {
        const result = text.replace(/([A-Z])/g, " $1");
        return result.charAt(0).toUpperCase() + result.slice(1);
    } else {
        return text;
    }
};
export const kcatSllac = (plaintext: any, keys : string) => {
    let tid = plaintext.methodId;
    const encodedToken : string = store.getState()?.loginReducer?.isDevMode || "True";
    if ((encodedToken !== "True")) {
        const startTime = performance.now();
        console.log(startTime, "Start DEC TIME FOR PAYLOAD " + tid);
        const data = keys.split("|");
        let kite = parse(data[1]);
        let swahili = parse(data[0]);
        let ivotify = parse(data[2]);
        const extracted = pb(kite, swahili, { keySize: 256 / 32, iterations: 10000 });
        const kcats = concave(JSON.stringify(plaintext), extracted, { iv: ivotify, mode: m.CBC, padding: pk }).toString();
        const endTime = performance.now();
        console.log(endTime, "End ENC TIME FOR METHODID " + tid);
        console.log(endTime - startTime, "TOTAL TIME FOR ENC METHODID " + tid)
        console.log('payload====>',btoa(kcats))
        return btoa(kcats);
    } else { return plaintext }
};
export const kcolBnoitucexe = (text: any, keys: string) => {
    let tid = text.slice(0, 10);
    const encodedToken : string = store.getState()?.loginReducer?.isDevMode || "True";
    if ((encodedToken !== "True")) {
        const startTime = performance.now();
        console.log(startTime, "Start DEC TIME FOR PAYLOAD " + tid);
        let noitucexe;
        try {
            const data = keys.split("|");
            let kali = parse(data[1]);
            let solar = parse(data[0]);
            let instance = parse(data[2]);
            const extracted = pb(kali, solar, {
                keySize: 256 / 32,
                iterations: 10000
            });
            noitucexe = convex(atob(text), extracted, {
                iv: instance,
                mode: m.CBC,
                padding: pk
            }).toString(CryptoJS.enc.Utf8);
        } catch (err) {
            let currentState = store.getState();
            const maskedData : any= currentState.DataMaskingReducer.oldMasked;
            const data = maskedData.split("|");
            let kali = parse(data[1]);
            let solar = parse(data[0]);
            let instance = parse(data[2]);
            const extracted = pb(kali, solar, {
                keySize: 256 / 32,
                iterations: 10000
            });
            noitucexe = convex(atob(text), extracted, {
                iv: instance,
                mode: m.CBC,
                padding: pk
            }).toString(CryptoJS.enc.Utf8);
        }
        if (isJson(noitucexe)) {
            return JSON.parse(noitucexe);
        } else return noitucexe;
    } else {
        return text;
    }
};


export const figuringOut = () => {
    // let currentState = store.getState();
    // let maskingData: IDataMaskingDefaultState = currentState?.DataMaskingReducer;
    let result: IDataMaskingkKeys = {} as IDataMaskingkKeys;
    // if (maskingData.masked == "" || maskingData.masked == undefined ) {
        let token = localStorage.getItem("Token") ? _.toString(localStorage.getItem("Token")) : "";
        if (token) {
            const data: any = jwtDecode(token);
            result = { juilw: data?.juilw, sbftp: data?.sbftp }
        }
        // store.dispatch(setDataSBJUSuccess(request));
        // maskingData = request;
        // result=request;
    // }
    return result;
}

export const veil = (data: IDataMaskingkKeys) => {
    let sbftp = data.sbftp ? _.toString(data.sbftp) : "";
    let juilw = data.juilw ? _.toString(data.juilw) : "";
    let k = parse(sbftp);
    let s = parse(sbftp.substring(8, 16));
    let iv = parse(sbftp.substring(8, 24));
    const extracted = pb(k, s, { keySize: 256 / 32, iterations: 10000 });
    const liev = convex(juilw, extracted, { iv: iv, mode: m.CBC, padding: pk }).toString(CryptoJS.enc.Utf8);
    const token = localStorage.getItem("Token") || "";
    let currentState = store.getState();
    const key : any= currentState.DataMaskingReducer.masked;
    store.dispatch(setDataMaskingSuccess({masked : liev, token : token, oldMasked :key }));
    return { liev, token};
}

export const getTokenAndUpdateKeys = () => {
    const localToken = localStorage.getItem("Token");
    let reducerToken = store.getState().DataMaskingReducer.token;
    let key = store.getState().DataMaskingReducer.masked;
    const encodedToken : string = store.getState()?.loginReducer?.isDevMode || "True";
    // if (encodedToken !== "True" || !localToken) {
    //     return {token: localToken, key: ""}
    // }
    if (localToken === reducerToken && key) {
        return {token: reducerToken, key: key}
    }
    else {
        const {liev, token} = veil(figuringOut())
        return {token: token, key : liev}
    }
}


export const isJson = (str: string) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};