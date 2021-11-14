import {EmPageComponentType} from "@/shared/enums";

export abstract class EmPageComponent {
    sourceName: string;
    type: EmPageComponentType;
    sourceTypeName: string;
    isNullable: boolean;
}
