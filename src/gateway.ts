import {gatewayApiPrefix} from "@/config";

class GatewayPort {
    route: string;

    constructor(route: string) {
        this.route = `${gatewayApiPrefix}${route}`;
    }
}

const gateway = {
    stateGetState: new GatewayPort('/state'),
    stateCheckAuthState: new GatewayPort('/state/auth'),
    identityAuthLogin: new GatewayPort('/identity/auth/login'),
    identityAuthLoginMfa: new GatewayPort('/identity/auth/login-mfa'),
    identityManageChangePassword: new GatewayPort('/identity/manage/change-password'),
    identityManageChangeEmail: new GatewayPort('/identity/manage/change-email'),
    identityManageMfaDescription: new GatewayPort('/identity/manage/mfa-description'),
    identityManageMfaActivate: new GatewayPort('/identity/manage/mfa-activate'),
    identityManageMfaReset: new GatewayPort('/identity/manage/mfa-reset'),
    pageRetrieve: new GatewayPort('/page/retrieve'),
    pageCommand: new GatewayPort('/page/command'),
}

export default gateway;
