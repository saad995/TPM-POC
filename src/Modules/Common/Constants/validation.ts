export default {
    NTN: {
        message: "Please enter valid 7 digits NTN number.",
        length: 7,
        regex: /^[0-9]*$/
    },
    SECP: {
        message: "Please enter valid 7 digits number.",
        length: 7,
        regex: /^[0-9]*$/
    },
    Cell: {
        message:
            "Please enter 13 characters without special characters. e.g.+921231231231",
        length: 10,
        regex: /^[+0-9]*$/
    },
    Email: {
        message: "Please enter valid email.",
        minLength: 7,
        maxLength: 35,
        regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    CNIC: {
        message: "Please enter 13 characters without special characters.",
        length: 13,
        regex: /^[0-9]*$/
    },
    ApplicationId: {
        message: "Please enter valid application ID.",
        minLength: 3,
        maxLength: 10,
        regex: /^[0-9]*$/
    },
    UserName: {
        message: "Please enter valid username.",
        minLength: 4,
        maxLength: 25,
        regex: /^[-a-zA-Z0-9]*$/
    },
    UserId: {
        message: "Please enter valid User ID",
        minLength: 4,
        maxLength: 25,
        regex: /^[-a-zA-Z0-9]*$/
    },
    Password: {
        message: "Please enter valid password.",
        length: 4
    },
    emailOTP: {
        message: "Please enter valid email OTP",
        length: 6,
        regex: /^[0-9]*$/
    },
    cellOTP: {
        message: "Please enter valid mobile OTP",
        length: 6,
        regex: /^[0-9]*$/
    },
    cellEmailOTP: {
        message: "Please enter valid Mobile/Email OTP",
        length: 6,
        regex: /^[0-9]*$/
    },
    IBAN: {
        message:
            "Please provide a valid IBAN number e.g. XX12XXXX1234560123456789",
        length: 24,
        regex: /^[A-Z0-9]*$/
    },
    CNICAndPassport: {
        message: "Please enter minimum 9 and maximum 13 characters without special characters.",
        minLength: 9,
        maxLength: 13,
        regex: /^[A-Z0-9]*$/
    },
};
