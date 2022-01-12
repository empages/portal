import { EmPageViewItemContextModel } from '@/models/em-page-view-item-context-model'

export class EmPageFormInputModel extends EmPageViewItemContextModel {
  label: string;
  required: boolean;
  hidden: boolean;
  readonly: boolean;
  allowNullValue: boolean;
  validationErrors: Array<string>;
}
