import {EmService} from "@/services/em-service";
import {LoginRequest} from "@/models/login-request";
import {AdminAuthResponse} from "@/models/admin-auth-response";
import {LoginWithTwoFactorAuthenticationRequest} from "@/models/login-with-two-factor-authentication-request";
import {SidebarSchema} from "@/models/sidebar-schema";
import {EmPageTableViewModel} from "@/models/em-page-table-view-model";
import {EmPageDetailsViewModel} from "@/models/em-page-details-view-model";
import {EmPageIndexViewModel} from "@/models/em-page-index-view-model";
import {EmPageViewContext} from "@/models/em-page-view-context";
import {PropertyMap} from "@/models/property-map";
import {EmPageComponent} from "@/models/em-page-component";
import {Parameter} from "@/models/parameter";
import {EnumValueItem} from "@/models/enum-value-item";
import {EmPageViewModel} from "@/models/em-page-view-model";

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

    public async getIndexViewModel(route: string): Promise<EmPageIndexViewModel> {
        const viewModel = await this.getData<EmPageIndexViewModel>(`/admin/em-pages/index/${route}`);

        const assignIndexProps = (targetViewModel: EmPageViewModel) => {
            targetViewModel.context = viewModel?.context;
            targetViewModel.propertyComponentMap = viewModel?.propertyComponentMap;
            targetViewModel.propertyParametersMap = viewModel?.propertyParametersMap;
            targetViewModel.propertyOrderMap = viewModel?.propertyOrderMap;
            targetViewModel.modelEnumerations = viewModel?.modelEnumerations;
        }

        if (viewModel?.tableViewModel) {
            assignIndexProps(viewModel.tableViewModel);
        }

        if (viewModel?.customViewModel) {
            assignIndexProps(viewModel.customViewModel);
        }

        return viewModel;
    }

    public async getDetailsViewModel(route: string, modelId: string): Promise<EmPageDetailsViewModel> {
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
