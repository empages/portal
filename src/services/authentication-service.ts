import {HttpService} from "@/services/http-service";
import type {AuthResult} from "@/models/auth-result";
import gateway from "@/gateway";

export class AuthenticationService extends HttpService {
    constructor() {
        super(false);
    }

    async login(email: string, password: string): Promise<AuthResult> {
        return await this.postData<AuthResult>(gateway.identityAuthLogin.route, {
            email,
            password
        });
    }
}

const authenticationService = new AuthenticationService();
export default authenticationService;
