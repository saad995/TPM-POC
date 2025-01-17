import config from "Config";

const baseURL = config.baseURL + "/api/";

export default {
    AUTH_SERVICE: baseURL + "auth/auth/open",
    AUTH_SERVICE_SECURE: baseURL + "auth/auth/secure",
    UPS_SERVICE: baseURL + "ups/PSID/open",
    SHRD_SERVICE: baseURL + "shrd/shrd/secure",
    ANS_SERVICE: baseURL + "ans/notify/open",
    TPM_SERVICE_OPEN: baseURL + "tpm/tpm/open",
    TPM_SERVICE_SECURE: baseURL + "tpm/tpm/secure",
    FSS_UPLOAD: baseURL + "fss/file/upload",
    FSS_READ: baseURL + "fss/file/filequery",
    FS_SERVICE: baseURL + "fss/file/secure",
    INBOX_SERVICE: baseURL + "ans/inbox/secure",
    OGA_SERVICE: baseURL + "oga/lpco/secure",
    REDIRECT_URL: "/"

    // AUTH_SERVICE: "http://localhost:4000/api/v1/auth/auth/open",
    // AUTH_SERVICE_SECURE: "http://localhost:4000/api/v1/auth/auth/secure",
    // UPS_SERVICE: "http://localhost:6100/api/ups/v1/PSID/open",
    // ANS_SERVICE: "http://localhost:3050/api/v1/ans/notify/open",
    // SHRD_SERVICE: "http://localhost:5010/api/v1/shrd/shrd/secure",
    // TPM_SERVICE_SECURE : "http://localhost:5006/api/v1/tpm/tpm/secure",
    // TPM_SERVICE_OPEN : "http://localhost:5006/api/v1/tpm/tpm/open",
    // INBOX_SERVICE: "http://localhost:3050/api/v1/ans/inbox/secure",
    // FSS_UPLOAD: "http://localhost:5004/api/v1/fss/file/upload",
    // FSS_READ: "http://localhost:5004/api/v1/fss/file/filequery",
    // FS_SERVICE: "http://localhost:5004/api/v1/fss/file/secure",
    // OGA_SERVICE: "http://localhost:5001/api/v1/oga/lpco/secure",
    // REDIRECT_URL: "/",
};
