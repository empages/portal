import {Application} from "@/models/application";
import {IdentityStorageRecord} from "@/models/identity-storage-record";
import {validateAccessTokenExpiration} from "@/shared/helpers";

export class StorageService {
    private applicationsListKey = "_em_apps_list";
    private selectedApplicationIdKey = "_em_sel_app_id";
    private identityRecordsKey = "_em_identity_records";

    constructor() {
        this.clearExpiredIdentityRecords();
    }

    public getApplications(): Array<Application> {
        try {
            let applications: Array<Application> = [];
            const serializedApplicationsList = localStorage.getItem(this.applicationsListKey);
            if (serializedApplicationsList) {
                applications = JSON.parse(serializedApplicationsList) as Array<Application>;
            }

            return applications;
        }
        catch (e) {
            localStorage.removeItem(this.applicationsListKey);
            localStorage.setItem(this.applicationsListKey, JSON.stringify([]));
            return [];
        }
    }

    public getSelectedApplicationId(): string | null {
        try {
            const selectedApplicationId = localStorage.getItem(this.selectedApplicationIdKey);
            if (!this.getApplications().some(x => x.id === selectedApplicationId)) {
                localStorage.removeItem(this.selectedApplicationIdKey);
                return null;
            }

            return selectedApplicationId;
        }
        catch (e) {
            localStorage.removeItem(this.selectedApplicationIdKey);
            return null;
        }
    }

    public getIdentityRecords(): Array<IdentityStorageRecord> {
        try {
            const serializedIdentityRecords = localStorage.getItem(this.identityRecordsKey);
            if (!serializedIdentityRecords) {
                return [];
            }

            return JSON.parse(serializedIdentityRecords) as Array<IdentityStorageRecord>;
        }
        catch (e) {
            localStorage.removeItem(this.identityRecordsKey);
            localStorage.setItem(this.identityRecordsKey, JSON.stringify([]));
            return [];
        }
    }

    public saveApplications(applications: Array<Application>): void {
        localStorage.setItem(this.applicationsListKey, JSON.stringify(applications));
    }

    public saveSelectedApplicationId(applicationId: string | null): void {
        if (applicationId) {
            localStorage.setItem(this.selectedApplicationIdKey, applicationId);
        }
        else {
            localStorage.removeItem(this.selectedApplicationIdKey);
        }
    }

    public saveIdentityRecords(identityRecords: Array<IdentityStorageRecord>): void {
        localStorage.setItem(this.identityRecordsKey, JSON.stringify(identityRecords));
    }

    private clearExpiredIdentityRecords(): void {
        const identityRecords = this.getIdentityRecords();
        const validIdentityRecords = identityRecords.filter(x => validateAccessTokenExpiration(x.accessToken));
        this.saveIdentityRecords(validIdentityRecords);
    }
}

const storageService = new StorageService();
export default storageService;
