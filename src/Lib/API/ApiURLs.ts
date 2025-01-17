import config from "Config";
const baseURL = config.baseURL + "/api/";

export default {
    USER_SERVICE_OPEN: baseURL + "auth/user/open",
    TOKEN_SERVICE: config.baseURL + "/auth/connect/token",
    TOKEN_INTROSPECT: config.baseURL + "/auth/connect/introspect",
    USER_SERVICE_SECURE: baseURL + "auth/user/secure",
    WFS_SERVICE_SECURE: baseURL + "wfs/Workflow/secure",
    TPM_SERVICE_SECURE : baseURL + "tpm/tpm/secure",
    TPM_SERVICE_OPEN : baseURL + "tpm/tpm/open",
    FSS_UPLOAD: baseURL + "fss/file/upload",
    FSS_READ: baseURL + "fss/file/filequery",
    FS_SERVICE: baseURL + "fss/file/secure",// SD_SERVICE_FILE: baseURL +"sd/file/upload",
    INBOX_SERVICE: baseURL + "ans/inbox/secure",
    OGA_SERVICE: baseURL + "oga/lpco/secure",

    // USER_SERVICE_OPEN: "http://localhost:4000/api/v1/auth/user/open",
    // TOKEN_SERVICE: "http://localhost:4000/connect/token",
    // TOKEN_INTROSPECT: "http://localhost:4000/connect/introspect",
    // USER_SERVICE_SECURE: "http://localhost:4000/api/v1/auth/user/secure",
    // WFS_SERVICE_SECURE: "http://localhost:6201/api/v1/wfs/Workflow/secure",
    // TPM_SERVICE_SECURE : "http://localhost:5006/api/v1/tpm/tpm/secure",
    // TPM_SERVICE_OPEN : "http://localhost:5006/api/v1/tpm/tpm/open",
    // FSS_UPLOAD: "http://localhost:5004/api/v1/fss/file/upload",
    // FSS_READ: "http://localhost:5004/api/v1/fss/file/filequery",
    // INBOX_SERVICE: "http://localhost:3050/api/v1/ans/inbox/secure",
    // FS_SERVICE: "http://localhost:5004/api/v1/fss/file/secure",
    // OGA_SERVICE: "http://localhost:5001/api/v1/oga/lpco/secure",
    // REDIRECT_URL: "/"
};
