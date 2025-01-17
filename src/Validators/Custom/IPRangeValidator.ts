import _ from "lodash";

// Converts an IP Address to a 32bit integer value.
export const ConverIPToInt = (address: string) => {
    const parts = address.split(".");
    return ((+parts[0] * 256 + +parts[1]) * 256 + +parts[2]) * 256 + +parts[3];
};

// Converts an 32bit integer to IP string.
export const ConverIntToIP = (ipInt: number) => {
    let ipString = (ipInt % 256).toString();
    for (let i = 3; i > 0; i--) {
        ipInt = Math.floor(ipInt / 256);
        ipString = (ipInt % 256) + "." + ipString;
    }
    return ipString;
};

// Validates IP range
export const isValidIPRange = (from: string, to: string) => {
    let fromIP = ConverIPToInt(from);
    let toIP = ConverIPToInt(to);

    return fromIP > 0 && toIP > 0 && toIP > fromIP;
};

export const isIPInRange = (ip: string, from: string, to: string = "") => {
    let fromIP = ConverIPToInt(from);
    let ipToValidate = ConverIPToInt(ip);

    if (_.isEmpty(to)) {
        return ipToValidate === fromIP;
    }

    let toIP = ConverIPToInt(to);

    return ipToValidate >= fromIP && ipToValidate <= toIP;
};

// Formats IP if by removing leading 0s from IP parts, e.g 192.11.01.04 => 192.11.1.4
export const formatIP = (ip: string) => {
    let ipInt = ConverIPToInt(ip);
    return ConverIntToIP(ipInt);
};
