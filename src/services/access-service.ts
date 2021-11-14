import {EmService} from "@/services/em-service";
import {GatewayResponse} from "@/models/gateway-response";
import {Application} from "@/models/application";

class AccessService extends EmService {
    constructor() {
        super(false);
    }

    public async verifyPortalAccess(application: Application): Promise<GatewayResponse> {
        this.setApplication(application);
        return await this.postData<GatewayResponse>('/access/verify', {});
    }
}

const accessService = new AccessService();

export default accessService;
