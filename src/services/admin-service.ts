import {EmService} from "@/services/em-service";
import {LoginRequest} from "@/models/login-request";
import {AdminAuthResponse} from "@/models/admin-auth-response";
import {LoginWithTwoFactorAuthenticationRequest} from "@/models/login-with-two-factor-authentication-request";
import {SidebarSchema} from "@/models/sidebar-schema";
import {EmPageTableViewModel} from "@/models/em-page-table-view-model";
import {EmPageDetailsViewModel} from "@/models/em-page-details-view-model";

class AdminService extends EmService {
    constructor() {
        super(true);
    }

    public async checkAuthorization(): Promise<void> {
        return await this.postData<void>('/admin/auth/check', {});
    }

    public async login(loginRequest: LoginRequest): Promise<AdminAuthResponse> {
        return await this.postData<AdminAuthResponse>('/admin/auth/login', loginRequest);
    }

    public async loginWithTwoFactor(loginRequest: LoginWithTwoFactorAuthenticationRequest, postAuthenticationToken: string): Promise<AdminAuthResponse> {
        return await this.postData<AdminAuthResponse>('/admin/auth/login-2fa', loginRequest, {
            headers: {
                'Post-Authentication-Token': postAuthenticationToken,
            }
        });
    }

    public async getAdminMenus(): Promise<SidebarSchema> {
        return await this.getData<SidebarSchema>('/admin/general/admin-menus');
    }

    public async getTableViewModel(route: any): Promise<EmPageTableViewModel> {
        return await this.getData<EmPageTableViewModel>(`/admin/em-pages/table/${route}`);
    }

    public async getDetailsViewModel(route: any, modelId: string): Promise<EmPageDetailsViewModel> {
        return await this.getData<EmPageDetailsViewModel>(`/admin/em-pages/details/${route}/${modelId}`);
    }

    public async getFormViewModel(route: any, modelId: string | null): Promise<any> {
        return await this.getData<any>(`/admin/em-pages/form/${route}/${modelId}`);
    }

    public async getFeatureTableViewModel(route: any, modelId: string, feature: string): Promise<any> {
        return await this.getData<any>(`/admin/em-pages/feature/${route}/${modelId}/${feature}`);
    }
}

const adminService = new AdminService();

export default adminService;
