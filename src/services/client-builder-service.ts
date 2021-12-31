import {EmService} from "@/services/em-service";
import {SimpleResult} from "@/models/simple-result";
import {TranslationKey} from "@/models/translation-key";
import {NewTranslationKeyWithValues} from "@/models/new-translation-key-with-values";
import {MutationResult} from "@/models/mutation-result";
import {Language} from "@/models/language";
import {TranslationGridData} from "@/models/translation-grid-data";
import {ApplicationInstanceType} from "@/shared/enums";
import {ApplicationEndpoint} from "@/models/application-endpoint";
import {ScaffoldModule} from "@/models/scaffold-module";
import {StaticContentKey} from "@/models/static-content-key";

class ClientBuilderService extends EmService {
    constructor() {
        super(false);
    }

    public async getScaffoldModules(): Promise<Array<ScaffoldModule>> {
        return await this.getData<Array<ScaffoldModule>>('/client-builder/scaffold/modules');
    }

    public async getEndpoints(): Promise<Array<ApplicationEndpoint>> {
        return await this.getData<Array<ApplicationEndpoint>>('/client-builder/endpoints');
    }

    public async generateModuleById(moduleId: string): Promise<SimpleResult> {
        return await this.postData<SimpleResult>('/client-builder/scaffold/generate', {
            moduleId
        });
    }

    public async generateModulesByInstanceType(instanceType: ApplicationInstanceType): Promise<SimpleResult> {
        return await this.postData<SimpleResult>('/client-builder/scaffold/generate/by-instance', {
            instanceType
        });
    }

    public async generateModulesByClientId(clientId: string): Promise<SimpleResult> {
        return await this.postData<SimpleResult>('/client-builder/scaffold/generate/by-client', {
            clientId
        });
    }

    public async getLanguages(): Promise<Array<Language>> {
        return await this.getData<Array<Language>>('/client-builder/languages');
    }

    public async getTranslationsGrid(page: number, searchQuery: string): Promise<TranslationGridData> {
        return await this.getData<TranslationGridData>(`/client-builder/languages/grid-data?page=${page}&searchQuery=${searchQuery}`);
    }

    public async createOrEditLanguage(language: Language): Promise<MutationResult> {
        if (language.id) {
            return await this.putData<MutationResult>(`/client-builder/languages/${language.id}`, language);
        }
        else {
            return await this.postData<MutationResult>('/client-builder/languages', language);
        }
    }

    public async deleteLanguage(languageId: number): Promise<SimpleResult> {
        return await this.deleteData<SimpleResult>(`/client-builder/languages/${languageId}`);
    }

    public async setLanguageAsDefault(languageId: number): Promise<SimpleResult> {
        return await this.postData<SimpleResult>('/client-builder/languages/default', {
            value: languageId
        })
    }

    public async createTranslationKey(key: NewTranslationKeyWithValues): Promise<MutationResult> {
        return await this.postData<MutationResult>('/client-builder/languages/keys', key)
    }

    public async editTranslationKey(key: TranslationKey): Promise<SimpleResult> {
        return await this.putData<SimpleResult>(`/client-builder/languages/keys/${key.id}/edit`, key);
    }

    public async deleteTranslationKey(keyId: number): Promise<SimpleResult> {
        return await this.deleteData<SimpleResult>(`/client-builder/languages/keys/${keyId}`);
    }

    public async getStaticContentKeys(): Promise<Array<StaticContentKey>> {
        return await this.getData<Array<StaticContentKey>>('/client-builder/languages/content-keys');
    }

    public async getStaticContent(keyId: number): Promise<StaticContentKey> {
        return await this.getData<StaticContentKey>(`/client-builder/languages/content-keys/${keyId}`);
    }

    public async createContentKeyWithValues(keyWithValues: StaticContentKey): Promise<MutationResult> {
        return await this.postData<MutationResult>(`/client-builder/languages/content-keys`, keyWithValues);
    }

    public async editContentKey(keyId: number, keyWithValues: StaticContentKey): Promise<MutationResult> {
        return await this.putData<MutationResult>(`/client-builder/languages/content-keys/${keyId}`, keyWithValues);
    }

    public async deleteContentKey(keyId: number): Promise<SimpleResult> {
        return await this.deleteData<SimpleResult>(`/client-builder/languages/content-keys/${keyId}`);
    }
}

const clientBuilderService = new ClientBuilderService();

export default clientBuilderService;
