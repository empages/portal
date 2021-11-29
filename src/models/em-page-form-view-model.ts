import { EmPageViewModel } from '@/models/em-page-view-model'
import { EmPageFormInputModel } from '@/models/em-page-form-input-model'

export class EmPageFormViewModel extends EmPageViewModel {
  identifier: string;
  inputs: Array<EmPageFormInputModel>;
  nonMappedFormErrors: Array<string>;
}
