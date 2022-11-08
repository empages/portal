import type {Application} from "@/models/application";
import axios from "axios";
import type {AxiosInstance, AxiosRequestConfig} from "axios";
import storageService from "@/services/storage-service";
import {gatewayHeaderKey} from "@/config";

export abstract class HttpService {
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

            this.httpClient.defaults.headers.common[gatewayHeaderKey] = this.application.gatewayId;

            if (this.requiresAccessToken) {
                this.httpClient.interceptors.request.use(function(config) {
                    const identityRecords = storageService.getIdentityRecords();
                    const accessToken = identityRecords.find(x => x.applicationId === application.id)?.accessToken;
                    if (accessToken) {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
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
        const response = await this.httpClient?.get(route, config);
        return response?.data as TResponse;
    }

    protected async postData<TResponse>(route: string, body: any, config?: AxiosRequestConfig | undefined): Promise<TResponse> {
        this.serviceGuard();
        const response = await this.httpClient?.post(route, body, config);
        return response?.data as TResponse;
    }

    protected async putData<TResponse>(route: string, body: any, config?: AxiosRequestConfig | undefined): Promise<TResponse> {
        this.serviceGuard();
        const response = await this.httpClient?.put(route, body, config);
        return response?.data as TResponse;
    }

    protected async deleteData<TResponse>(route: string, config?: AxiosRequestConfig | undefined): Promise<TResponse> {
        this.serviceGuard();
        const response = await this.httpClient?.delete(route, config);
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
