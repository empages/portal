import {Application} from "@/models/application";
import {newGuid} from "@/utils/helpers";
import storageService from "@/services/storage-service";

interface SettingsModuleState {
    applications: Array<Application>;
    selectedApplicationId: string | null
    isSelectedApplicationConnected: boolean;
}

export default {
    namespaced: true,
    state (): SettingsModuleState {
        return buildInitialSettings();
    },
    mutations: {
        selectApplication(state: SettingsModuleState, applicationId: string): void {
            if (state.applications.some(x => x.id === applicationId)) {
                state.selectedApplicationId =  applicationId;
                saveSettings(state);
            }
        },
        setIsSelectedApplicationConnected(state: SettingsModuleState, connected: boolean): void {
          state.isSelectedApplicationConnected = connected;
        },
        addApplication(state: SettingsModuleState, application: Application): void {
            application.id = newGuid();
            state.applications.push(application);
            saveSettings(state);
        },
        editApplication(state: SettingsModuleState, application: Application): void {
            const applicationForEdit = state.applications.find(x => x.id === application.id);
            if (applicationForEdit) {
                const indexForEdit = state.applications.indexOf(applicationForEdit);
                state.applications.splice(indexForEdit, 1, application);
                saveSettings(state);
            }
        },
        removeApplication(state: SettingsModuleState, applicationId: string): void {
            const applicationForRemove = state.applications.find(x => x.id === applicationId);
            if (applicationForRemove) {
                const indexForRemove = state.applications.indexOf(applicationForRemove);
                state.applications.splice(indexForRemove, 1);
                saveSettings(state);
            }
        },
        reload(state: SettingsModuleState) {
            const settings = buildInitialSettings();
            state.applications = settings.applications;
        }
    },
    getters: {
        applications(state: SettingsModuleState): Array<Application> {
            return state.applications;
        },
        selectedApplication(state: SettingsModuleState): Application | null {
            let selectedApplication = state.applications.find((x: Application) => x.id === state.selectedApplicationId) || null;
            if (!selectedApplication && state.applications.length > 0) {
                selectedApplication = state.applications[0];
            }

            return selectedApplication;
        },
        isSelectedApplicationConnected(state: SettingsModuleState): boolean {
            return state.isSelectedApplicationConnected;
        }
    },
    actions: {},
}

function saveSettings(settings: SettingsModuleState): void {
    storageService.saveApplications(settings.applications);
    storageService.saveSelectedApplicationId(settings.selectedApplicationId);
}

function buildInitialSettings() {
    const applications: Array<Application> = storageService.getApplications();
    let selectedApplicationId = storageService.getSelectedApplicationId();
    if (!selectedApplicationId || !applications.some((x: Application) => x.id === selectedApplicationId)) {
        selectedApplicationId = null;
    }

    if (selectedApplicationId == null && applications.length) {
        selectedApplicationId = applications[0].id;
    }

    const settings: SettingsModuleState = {
        applications,
        selectedApplicationId,
        isSelectedApplicationConnected: false
    };

    saveSettings(settings);

    return settings;
}
