import {TranslationKeyValue} from "@/models/translation-key-value";

export interface TranslationKey {
    id: number;
    key: string;
    values: Array<TranslationKeyValue>;
}
