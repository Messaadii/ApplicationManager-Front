import { vm } from "./vm";

export interface DeployOn {
    type: "VirtualMachineResource";
    earPath: string;
    tempPath: string;
    backupFolderPath: string;
    virtualMachine: vm;
}