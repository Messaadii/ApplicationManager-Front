import { AppUpdaterConfig } from "./AppUpdaterConfig";

export interface Result {
    executionDate: string;
    log: string;
    status: string;
    appUpdaterConfig: AppUpdaterConfig;
}