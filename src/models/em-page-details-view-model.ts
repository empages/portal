import {EmPageViewModel} from "@/models/em-page-view-model";
import {EmPageDetailsFieldModel} from "@/models/em-page-details-field-model";
import {EmPageDetailsFeatureModel} from "@/models/em-page-details-feature-model";

export class EmPageDetailsViewModel extends EmPageViewModel{
    fields: Array<EmPageDetailsFieldModel>;
    features: Array<EmPageDetailsFeatureModel>;
}
