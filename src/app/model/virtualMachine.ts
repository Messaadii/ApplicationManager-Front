import { Command } from "./Command";

export interface VirtualMachine {
    name: string;
    user: string;
    host: string;
    password: string;
    port: number;
    commands: Command [];

}