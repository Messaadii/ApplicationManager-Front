import { vm } from "./vm";

export interface VirtualMachineResource {
    type: "VirtualMachineResource";
    earPath: string;
    virtualMachine: vm;
}