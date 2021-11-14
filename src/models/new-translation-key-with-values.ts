import {NewKeyTranslationValue} from "@/models/new-key-translation-value";

export interface NewTranslationKeyWithValues {
    key: string;
    values: Array<NewKeyTranslationValue>
}
