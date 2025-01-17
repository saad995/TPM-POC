export default {
    NTN: {
        message: "Please enter valid NTN.",
        message_ftn: "Please enter valid FTN.",
        length: 7,
        regex: /^[0-9a-zA-Z]+$/
    },
    FTN: {
        message: "Please select FTN Holder.",
        message_ntn: "Please select NTN Holder.",
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
        // length:7,
        regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    CNIC: {
        message: "Please enter 13 characters without special characters.",
        length: 13,
        regex: /^[0-9]*$/
    },
    ApplicationId: {
        message:
            "Please enter valid application ID.",
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
    challanNumber: {
        message: "Please enter valid Challan Number",
        length: 20,
        regex: /^[a-zA-Z0-9]*$/
    },
    collectorate: {
        message: "Please enter valid collectorate code",
        length: 20,
        regex: /^[a-zA-Z0-9]*$/
    },
    LicenseNumber: {
        message: "Please enter valid License Number.",
        length: 7,
        regex: /^[0-9]*$/
    },
    ParenCollectorate: {
        message: "Please enter valid Parent Collectorate.",
        length: 4,
        regex: /^[a-zA-Z0-9]*$/
    },
    IBAN: {
        message:
            "Please provide a valid IBAN number e.g. XX12XXXX12345612345678",
        length: 24,
        regex: /^[A-Z0-9]*$/
    },
    Passport: {
        message: "Please provide valid Passport number",
        length: 7,
        minLength:7,
        maxLength:15,
        regex: /^[0-9a-zA-Z]+$/
    }
};
