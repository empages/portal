import { EmPageViewModel } from '@/models/em-page-view-model'
import { EmPageFormInputModel } from '@/models/em-page-form-input-model'
import {SelectableCustomDataItem} from "@/models/selectable-custom-data-item";

export class EmPageFormViewModel extends EmPageViewModel {
  identifier: string;
  inputs: Array<EmPageFormInputModel>;
  nonMappedFormErrors: Array<string>;
  modelSelectableCustomDataMap: { [name: string] : Array<SelectableCustomDataItem> }
}
