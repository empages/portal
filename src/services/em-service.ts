import {Application} from "@/models/application";
import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import storageService from "@/services/storage-service";

export abstract class EmService {
    protected readonly apiBaseRoutePrefix = '/__em';
    protected application: Application | null;
    protected httpClient: AxiosInstance | null;

    protected constructor(private readonly requiresAccessToken: boolean) {
        this.requiresAccessToken = requiresAccessToken;
        this.init();
    }

    public setApplication(application: Application | null): void {
        if (application) {
            this.application = application;
            this.httpClient = axios.create({
                baseURL: this.application.url
            });

            this.httpClient.defaults.headers.common['X-Em-Portal-Gateway-Id'] = this.application.gatewayId;

            if (this.requiresAccessToken) {
                this.httpClient.interceptors.request.use(function(config) {
                    const identityRecords = storageService.getIdentityRecords();
                    const accessToken = identityRecords.find(x => x.applicationId === application.id)?.accessToken;
                    if (accessToken) {
                        config.headers.Authorization = `Bearer ${accessToken}`;
                    }

                    return config;
                }, function(error) {
                    return Promise.reject(error);
                });
            }
        }
        else {
            this.application = null;
            this.httpClient = null;
        }
    }

    protected async getData<TResponse>(route: string, config?: AxiosRequestConfig | undefined): Promise<TResponse> {
        this.serviceGuard();
        const response = await this.httpClient?.get(`${this.apiBaseRoutePrefix}${route}`, config);
        return response?.data as TResponse;
    }

    protected async postData<TResponse>(route: string, body: any, config?: AxiosRequestConfig | undefined): Promise<TResponse> {
        this.serviceGuard();
        const response = await this.httpClient?.post(`${this.apiBaseRoutePrefix}${route}`, body, config);
        return response?.data as TResponse;
    }

    protected async putData<TResponse>(route: string, body: any, config?: AxiosRequestConfig | undefined): Promise<TResponse> {
        this.serviceGuard();
        const response = await this.httpClient?.put(`${this.apiBaseRoutePrefix}${route}`, body, config);
        return response?.data as TResponse;
    }

    protected async deleteData<TResponse>(route: string, config?: AxiosRequestConfig | undefined): Promise<TResponse> {
        this.serviceGuard();
        const response = await this.httpClient?.delete(`${this.apiBaseRoutePrefix}${route}`, config);
        return response?.data as TResponse;
    }

    protected serviceGuard() {
        if (!this.application || !this.httpClient) {
            const error = 'Application has not been configured correctly'
            console.log(error);
            throw new Error(error);
        }
    }

    private init() {
        const applications = storageService.getApplications();
        const selectedApplicationId = storageService.getSelectedApplicationId();
        if (applications && applications.length) {
            let selectedApplication = applications.find(x => x.id === selectedApplicationId);
            if (!selectedApplication) {
                selectedApplication = applications[0];
            }

            this.setApplication(selectedApplication);
        }
    }
}
