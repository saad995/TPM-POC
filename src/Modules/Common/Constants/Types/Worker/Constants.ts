export enum PSWModules {
    AuthorizedDelearIntegration = "ADI",
    UnifiedPaymentSystem = "UPS",
}

export const ADIWorkerRequests= [
    { name: "Share Financial Instrument Import", code: "1301" },
    { name: "Share Financial Instrument Export", code: "1302" },
    { name: "Cancel Financilal Instrument", code: "1307" },
    { name: "Share Financial Instrument Settlemnet", code: "1305" },
    { name: "Share BDA", code: "1401" },
    { name: "Share BCA", code: "1402" },
    { name: "Share BDA/BCA Reversal", code: "1403" },
    { name: "Share GD Import", code: "101" },
    { name: "Share GD Export", code: "102" },
    { name: "Share GD Clearance", code: "1031" },
    { name: "COB - Share With Weboc", code: "1308" },
    { name: "COB - Share GD And Fin Info With New Bank", code: "307" },
    { name: "COB - Share Approval/Rejection With Old Bank", code: "308" },
    { name: "Get OneCustom GD Info from Weboc", code: "1701" }
];
