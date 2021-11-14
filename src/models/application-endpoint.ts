export interface ApplicationEndpoint {
    id: string;
    controllerName: string;
    actionName: string;
    route: string;
    authorized: boolean;
    methodName: string;
}
