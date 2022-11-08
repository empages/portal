export interface EmConfiguration {
    framework: EmConfigurationFramework;
    source: EmConfigurationSource;
    identity: EmConfigurationIdentity;
}

interface EmConfigurationFramework {
    name: string;
    version: string;
}

interface EmConfigurationIdentity {
    isAuthenticated: boolean;
    currentUser?: EmConfigurationIdentityUser;
}

interface EmConfigurationIdentityUser {
    email: string
}

interface EmConfigurationSource {
    baseUrl: string;
    environment: string;
    endpoints: EmConfigurationSourceEndpoint[];
}

interface EmConfigurationSourceEndpoint {
    id: string;
    route: string;
}
