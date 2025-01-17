import config from "Config";

const baseURL = config.baseURL + "/api/";

export default {
    AUTH_SERVICE: baseURL + "auth/auth/open",
    UPS_SERVICE: baseURL + "ups/PSID/secure",
    TARP_SERVICE: baseURL + "tarp/tarp/secure",
    SD_SERVICE: baseURL + "sd/edi/secure",
    UMS_SERVICE: baseURL + "auth/ums/secure",
    OGA_SERVICE: baseURL + "oga/lpco/secure",
    TARP_OPEN_SERVICE: baseURL + "tarp/tarp/open",
    SHRD_SERVICE: baseURL + "shrd/shrd/secure",
    TPM_SERVICE_SECURE : baseURL + "tpm/tpm/secure",
    FSS_UPLOAD: baseURL + "fss/file/upload",
    FSS_READ: baseURL + "fss/file/filequery",
    FS_SERVICE: baseURL + "fss/file/secure",
    INBOX_SERVICE: baseURL + "ans/inbox/secure",
    ITT_OPEN_SERVICE: baseURL + "itt/Integration/open",
    ITT_SERVICE: baseURL + "itt/itt/secure",
    
    // AUTH_SERVICE: "http://localhost:4000/api/v1/auth/auth/open",
    // OGA_SERVICE: "http://localhost:5001/api/v1/oga/lpco/secure",
    // UPS_SERVICE: "http://localhost:6100/api/ups/v1/PSID/secure",
    // SD_SERVICE: "http://localhost:7200/api/v1/sd/edi/secure",
    // TARP_SERVICE: "http://localhost:5002/api/v1/tarp/tarp/secure",
    // TARP_OPEN_SERVICE: "http://localhost:5002/api/v1/tarp/tarp/open",
    // SHRD_SERVICE: "http://localhost:5010/api/v1/shrd/shrd/secure",
    // UMS_SERVICE: "http://localhost:4000/api/v1/auth/ums/secure",
    // TPM_SERVICE_SECURE : "http://localhost:5006/api/v1/tpm/tpm/secure",
    // INBOX_SERVICE: "http://localhost:3050/api/v1/ans/inbox/secure",
    //     FSS_UPLOAD: "http://localhost:5004/api/v1/fss/file/upload",
    // FSS_READ: "http://localhost:5004/api/v1/fss/file/filequery",
    // FS_SERVICE: "http://localhost:5004/api/v1/fss/file/secure",
    //ITT_OPEN_SERVICE: "http://localhost:2200/api/v1/itt/Integration/open"
    //ITT_OPEN_SERVICE: "http://localhost:2200/api/v1/itt/Integration/open",

};
