export default {
    MandatoryField: {
        message: "Field is mandatory",
    },
    Cell: {
        message: "Please enter 13 characters without special characters. e.g.+921231231231",
        length: 10,
        regex: /^[+0-9]*$/
    },
    Phone: {
        message: "Please enter 11 characters without special characters. e.g.02131234567",
        length: 11,
        regex: /^[0-9]*$/
    },
    Email: {
        message: "Please enter valid email.",
        minLength: 7,
        maxLength: 256,
        regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    Name: {
        message: "Please enter valid Name",
        minLength: 3,
        maxLength: 70,
        regex: /^[ a-zA-Z]*$/
    },
    Address: {
        message: "Please enter valid Address",
        minLength: 3,
        maxLength: 70,
        regex: /d{1,5}\s\w.\s(\b\w*\b\s){1,2}\w*/
        //\d{1,5}\s\w.\s(\b\w*\b\s){1,2}\w*\
    },
    Fax: {
        message: "Please enter valid Fax Number",
        minLength: 2,
        maxLength: 15,
        regex: /^[-0-9]*$/
    },
    HSCode: {
        message: "Please enter valid HS Code",
        length: 9,
        regex: /^[.0-9]*$/
    },
    PCTCode: {
        message: "Please enter valid PCT Code",
        length: 4,
        regex: /^[0-9]*$/
    },
    ExporterName: {
        message: "Please enter valid Name",
        minLength: 3,
        maxLength: 70,
        regex: /^[ a-zA-Z0-9&.,-@()]*$/
    },
    CellNo: {
        message: "Please enter valid Phone Number, e.g. 923001234567",
        minLength: 11,
        maxLength: 16,
        regex: /^[+0-9]*$/
    },
    hsCode: {
        message: "Please enter valid value",
        length: 14,
        regex: /^[A-Z0-9]*$/ //not working
    },
    hint70: {
        message: "Valid length",
        maxlength: 70
        // regex: /^[A-Z0-9]*$/ //not working
    },
    hint100: {
        message: "Valid length",
        maxlength: 100
        // regex: /^[A-Z0-9]*$/ //not working
    },
    hint250: {
        message: "Valid length",
        maxlength: 250
        // regex: /^[A-Z0-9]*$/ //not working
    },
    hint300: {
        message: "Valid length",
        maxlength: 300
        // regex: /^[A-Z0-9]*$/ //not working
    },
    hint500: {
        message: "Valid length",
        maxlength: 500
        // regex: /^[A-Z0-9]*$/ //not working
    },
    hint512: {
        message: "Valid length",
        maxlength: 512
    },
    hint1000: {
        message: "Valid length",
        maxlength: 1000
    },
    ExaminedPercentage: {
        message: "Enter valid percentage from 0.01% to 100%",
        minLimit: 0.01,
        maxLimit: 100
        // regex: /^[ a-zA-Z0-9-&._,:#@']*$/
    },
    InfestedPercentage: {
        message: "Enter valid percentage",
        minLimit: 0.01,
        maxLimit: 100
        // regex: /^[ a-zA-Z0-9-&._,:#@']*$/
    },
    DeclarationTitle: {
        message: "Please enter valid Title",
        minLength: 3,
        maxLength: 255,
        regex: /^[ a-zA-Z0-9&.,-@()]*$/
    },
    NTN: {
        message: "Please enter valid NTN.",
        message_ftn: "Please enter valid FTN.",
        length: 7,
        regex: /^[0-9a-zA-Z]+$/
    },
    validation_smallInt: {
        message: "Maximum Accepted value is 65,500",
        greaterThanVal: 32767
    },
    validation_smallInt_negitive: {
        message: "Manimum Accepted value is -65,500",
        greaterThanVal: -65500
    },
    validation_decimal_Value: {
        message: "Only whole numbers are allowed.",
    },
    DeclareDescription: {
        message: "Please enter valid Declare Description",
        minLength: 3,
        maxLength: 255,
        regex: /^[ a-zA-Z0-9&.,-@()]*$/
    },
    AllowedQuantity: {
        message: "The quantity cannot be amended being beyond the prescribed limit as per provisions of PQR 2019.",
        minLengthMessage: "The quantity cannot be less than the allowed quantity.",
        minLength: 3,
        maxLength: 255,
        regex: /^\d+(\.\d{1,7})?$/,
        cipAllowedQuantityMessage:
            "Entered Quantity Exceeds the quantity allowed by Department of Plant Protection. Maximum Quantity allowed to be imported  for Screening/ Research/ Trail is ",
        lessThanZero: "The quantity cannot be less than 0."
    },
    ExtensionDateValidation: {
        message: "Extension Date cannot be less than Current Expiry Date and more than maximum date."
    },
    SealedNumber: {
        message: "Please enter valid Sealed Number",
        maxLength: 24,
        regex: /^([a-zA-Z0-9-]+)$/
    },
    Date: {
        message: "Please enter a valid Date",
    },
};
