export class AdminAuthResponse {
    succeeded: boolean;
    message: string;
    accessToken: string | null;
    postAuthenticationToken: string | null;
    requiresAdditionalAuthenticationFactor: boolean;
}
