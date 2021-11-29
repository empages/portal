import {EmService} from "@/services/em-service";
import {LoginRequest} from "@/models/login-request";
import {AdminAuthResponse} from "@/models/admin-auth-response";
import {LoginWithTwoFactorAuthenticationRequest} from "@/models/login-with-two-factor-authentication-request";
import {SidebarSchema} from "@/models/sidebar-schema";
import {EmPageDetailsViewModel} from "@/models/em-page-details-view-model";
import {EmPageIndexViewModel} from "@/models/em-page-index-view-model";
import {EmPageViewModel} from "@/models/em-page-view-model";
import { EmPageFormViewModel } from '@/models/em-page-form-view-model'
import {EmPageFormType} from "@/shared/enums";
import {EmPageFormSubmissionResponse} from "@/models/em-page-form-submission-response";
import {getModelFromFormViewModel, getPropertyNameFromOrigin} from "@/shared/helpers";

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

    public async getIndexViewModel(route: string, page: number, searchQuery: string): Promise<EmPageIndexViewModel> {
        const viewModel = await this.getData<EmPageIndexViewModel>(`/admin/em-pages/index/${route}?page=${page}&searchQuery=${searchQuery}`);

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

    public async getFormViewModel(route: any, modelId: string | null): Promise<EmPageFormViewModel> {
        return await this.getData<EmPageFormViewModel>(`/admin/em-pages/form/${route}/${modelId}`);
    }

    public async submitFormModel(route: string, type: EmPageFormType, model: any | null) {
        return await this.postData<EmPageFormSubmissionResponse>(`/admin/em-pages/form/${route}/${type}`, model);
    }

    public async getFeatureIndexViewModel(route: any, modelId: string, feature: string): Promise<EmPageIndexViewModel> {
        return await this.getData<EmPageIndexViewModel>(`/admin/em-pages/feature/${route}/${modelId}/${feature}`);
    }
}

const adminService = new AdminService();

export default adminService;
