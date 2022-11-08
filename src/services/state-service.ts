import {HttpService} from "@/services/http-service";
import type {Application} from "@/models/application";
import type {PortalGatewayState} from "@/models/portal-gateway-state";
import gateway from "@/gateway";

class StateService extends HttpService {

    constructor() {
        super(true);
    }

    public async getState(application: Application): Promise<PortalGatewayState> {
        this.setApplication(application);
        return await this.getData<PortalGatewayState>(gateway.stateGetState.route, {});
    }

    async checkAuthState(): Promise<void> {
        return await this.getData(gateway.stateCheckAuthState.route);
    }
}

const stateService = new StateService();

export default stateService;
