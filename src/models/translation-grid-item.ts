import {TranslationLanguageValue} from "@/models/translation-language-value";

export interface TranslationGridItem {
    keyId: number;
    key: string;
    languageValues: Array<TranslationLanguageValue>
}
