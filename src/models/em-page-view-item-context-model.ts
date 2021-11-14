import {EmPageComponent} from "@/models/em-page-component";
import {Parameter} from "@/models/parameter";

export abstract class EmPageViewItemContextModel {
    property: string;
    order: number;
    value: any;
    component: EmPageComponent;
    parameters: Array<Parameter>;
}
