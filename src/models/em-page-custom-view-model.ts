import {EmPageViewModel} from "@/models/em-page-view-model";
import {PropertyMap} from "@/models/property-map";

export class EmPageCustomViewModel extends EmPageViewModel {
    componentName: string;
    parameters: Array<PropertyMap<any>>;
}
