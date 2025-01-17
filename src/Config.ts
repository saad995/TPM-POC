export default {
    //baseURL: "https://309130eb-2ab9-4b4b-ba54-2b98a54456f4.mock.pstmn.io/",//kashan
    baseURL: window.location.origin, //"dev.psw.gov.pk/api/", //"https://c5e3efbf-ee59-429a-b7ef-5ddd33752459.mock.pstmn.io/", //lareb,
    // baseURL: "http://localhost:3000",
    serviceName: "",

    Token_Exp_Time_Minutes: 999,
    GOOGLE: {
        reCaptchav2: "6LcK1uMZAAAAAOkobJBftyrzq2GHektq4eWzmWXt",
        //reCaptchav3: "6LfEGusZAAAAADlTNpZE0fDnmb9RGtmyyQMD3jZR"
        reCaptchav3: "6LdzWxQaAAAAAMtsG8r7YoDJB5ShYWwOs4gmQ_Ff"
    },
    clientId: "psw.client.spa",
    grid: {
        skip: 0,
        take: 15,
        pageable: {
            buttonCount: 4,
            pageSizes: [15, 25, 50, 100, 500]
        }
    },
    gridConfig: {
        buttonCount: 5,
        info: true,
        type: "numeric",
        pageSizes: true,
        previousNext: true
    },
    textAreaSize: 200,
    // timer for subscription information send otp ticks
    timer: 10000, //999999999 // 10 seconds = 10000 , for 3mins  = 180000
    AlertBarEnable: true,
    timer_otp: 10000,
    timer_otp_for_update_profile: 30000,
    DateFormat: "DD-MM-YYYY",
    DateTimeFormat: "DD-MM-YYYY hh:mm A",
    uploadFileLimit: 10,
    customLogger: {
        infoEnabled: false,
        errorEnabled: false,
        debugEnabled: false
    },
    minimumFileSize: 5000,
    physicalVerificationRequiredAlertTimer: 15000,
    importConditionCheckBox:"I hereby declare that the import conditions related to the commodity to be imported have been thoroughly studied and I will comply with the conditions therein. In case of non-compliance, the Department of Plant Protection may take necessary actions as per provisions of the Plant Quarantine Act 1976 and rules 2019.",
    isDevMode:true
};
