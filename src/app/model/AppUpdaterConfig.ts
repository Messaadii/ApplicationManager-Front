import { ApplicationFile } from "./ApplicationFile";
import { Command } from "./Command";
import { ToBeDeployed } from "./ToBeDeployed";
import { DeployOn } from "./deployOn";

export interface AppUpdaterConfig {
    name: string;
    beforeUpdateCommands: Command[];
    afterUpdateCommands: Command[];
    applicationFiles: ApplicationFile[];
    toBeDeployed: ToBeDeployed;
    deployOn: DeployOn;
    result: any;
}
