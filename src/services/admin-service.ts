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
import {EmPageSimpleModel} from "@/models/em-page-simple-model";
import {HttpMethod, HttpMethods} from "@/models/http-method";
import {ActionResponse} from "@/models/action-response";
import {AdminTwoFactorDescriptionModel} from "@/models/admin-two-factor-description-model";
import {SimpleResult} from "@/models/simple-result";

class AdminService extends EmService {
    constructor() {
        super(true);
    }

    public async checkAuthorization(): Promise<void> {
        return await this.postData<void>('/admin/identity/check', {});
    }

    public async login(loginRequest: LoginRequest): Promise<AdminAuthResponse> {
        return await this.postData<AdminAuthResponse>('/admin/identity/auth/login', loginRequest);
    }

    public async loginWithTwoFactor(loginRequest: LoginWithTwoFactorAuthenticationRequest, postAuthenticationToken: string): Promise<AdminAuthResponse> {
        return await this.postData<AdminAuthResponse>('/admin/identity/auth/login-2fa', loginRequest, {
            headers: {
                'Post-Authentication-Token': postAuthenticationToken,
            }
        });
    }

    public async requestTwoFactorAuthenticationDescription(): Promise<AdminTwoFactorDescriptionModel> {
        return await this.getData<AdminTwoFactorDescriptionModel>('/admin/identity/manage/request-2fa-description');
    }

    public async resetTwoFactorAuthenticator(): Promise<SimpleResult> {
        return await this.postData<SimpleResult>('/admin/identity/manage/reset-2fa-authenticator', {});
    }

    public async activateTwoFactorAuthentication(code: string): Promise<SimpleResult> {
        return await this.postData<SimpleResult>('/admin/identity/manage/activate-2fa', { code });
    }

    public async changeEmail(newEmail: string): Promise<SimpleResult> {
        return await this.postData<SimpleResult>('/admin/identity/manage/change-email', { newEmail });
    }

    public async changePassword(currentPassword: string, newPassword: string, confirmedPassword: string): Promise<SimpleResult> {
        return await this.postData<SimpleResult>('/admin/identity/manage/change-password', {
            currentPassword,
            newPassword,
            confirmedPassword
        })
    }

    public async getAdminMenus(): Promise<SidebarSchema> {
        return await this.getData<SidebarSchema>('/admin/general/admin-menus');
    }

    public async uploadFile(file: any): Promise<{ tempFileId: string }> {
        const formData = new FormData();
        formData.append("file", file);
        return await this.postData<{ tempFileId: string }>('/admin/general/files/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    public async getEmPagesList(): Promise<Array<EmPageSimpleModel>> {
        return await this.getData<Array<EmPageSimpleModel>>('/admin/em-pages');
    }

    public async getIndexViewModel(route: string, page: number, searchQuery: string, orderBy: string, orderType: string): Promise<EmPageIndexViewModel> {
        const viewModel = await this.getData<EmPageIndexViewModel>(`/admin/em-pages/index/${route}?page=${page}&searchQuery=${searchQuery}&orderBy=${orderBy}&orderType=${orderType}`);

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

    public async executeAction(method: HttpMethod, actionUrl: string): Promise<ActionResponse> {
        this.serviceGuard();
        let response = null;

        if (method.method === HttpMethods.POST) {
            response = await this.httpClient?.post(actionUrl,{});
        }
        else if (method.method === HttpMethods.PUT) {
            response = await this.httpClient?.put(actionUrl, {});
        }
        else if (method.method === HttpMethods.DELETE) {
            response = await this.httpClient?.delete(actionUrl);
        }

        return response?.data as ActionResponse || {
            succeeded: false,
            message: "Action execution failed"
        };
    }
}

const adminService = new AdminService();

export default adminService;
