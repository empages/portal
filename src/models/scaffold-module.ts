import {ApplicationInstanceType} from "@/shared/enums";
import {ScaffoldModuleFile} from "@/models/scaffold-module-file";
import {ScaffoldModuleFolder} from "@/models/scaffold-module-folder";

export interface ScaffoldModule {
    id: string;
    order: number;
    name: string;
    iconUrl: string;
    scaffoldTypeName: string;
    type: ApplicationInstanceType;
    clientId: string;
    generated: boolean;
    locked: boolean;
    files: Array<ScaffoldModuleFile>;
    folders: Array<ScaffoldModuleFolder>;
}
