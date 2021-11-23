import {TranslationKeyValue} from "@/models/translation-key-value";

export class TranslationKey {
    id: number;
    key: string;
    values: Array<TranslationKeyValue>;
}
