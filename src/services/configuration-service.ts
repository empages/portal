import {EmService} from "@/services/em-service";
import {Application} from "@/models/application";
import {EmConfiguration} from "@/models/em-configuration";

class ConfigurationService extends EmService {
    constructor() {
        super(false);
    }

    public async getConfiguration(application: Application): Promise<EmConfiguration> {
        this.setApplication(application);
        return await this.getData<EmConfiguration>('/config', {});
    }
}

const configurationService = new ConfigurationService();

export default configurationService;
