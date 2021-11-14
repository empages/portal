import {EmPageViewContext} from "@/models/em-page-view-context";
import {PropertyMap} from "@/models/property-map";
import {EmPageComponent} from "@/models/em-page-component";
import {Parameter} from "@/models/parameter";
import {EnumValueItem} from "@/models/enum-value-item";

export abstract class EmPageViewModel {
    context: EmPageViewContext;
    propertyComponentMap: Array<PropertyMap<EmPageComponent>>;
    propertyParametersMap: Array<PropertyMap<Array<Parameter>>>;
    propertyOrderMap: Array<PropertyMap<number>>
    modelEnumerations: { [name: string] : Array<EnumValueItem> }
}
