import config from "Config";
export default class Logger {
    static log(message?: any, ...optionalParams: any[]): void {
        if (config.customLogger.infoEnabled)
           console.info(message, ...optionalParams);
    }

    static info(message?: any, ...optionalParams: any[]): void {
        if (config.customLogger.infoEnabled)
            console.info(message, ...optionalParams);
    }

    static error(message?: any, ...optionalParams: any[]): void {
        if (config.customLogger.errorEnabled)
            console.error(message, ...optionalParams);
    }

    static debug(message?: any, ...optionalParams: any[]): void {
        if (config.customLogger.debugEnabled)
            console.debug(message, ...optionalParams);
    }
}
