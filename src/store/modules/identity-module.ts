import {IdentityStorageRecord} from "@/models/identity-storage-record";
import storageService from "@/services/storage-service";
import {validateAccessTokenExpiration} from "@/utils/helpers";

interface IdentityModuleState {
    identityRecords: Array<IdentityStorageRecord>;
    authenticated: boolean;
}

export default {
    namespaced: true,
    state(): IdentityModuleState {
        return {
            identityRecords: storageService.getIdentityRecords(),
            authenticated: false
        }
    },
    getters: {
        identityRecords(state: IdentityModuleState) {
            return state.identityRecords;
        },
        authenticated(state: IdentityModuleState) {
            const selectedApplicationId = storageService.getSelectedApplicationId();
            const identityRecord = state.identityRecords.find(x => x.applicationId === selectedApplicationId);
            return identityRecord && validateAccessTokenExpiration(identityRecord.accessToken);
        }
    },
    mutations: {
        storeIdentity(state: IdentityModuleState, identityRecord: IdentityStorageRecord) {
            const oldIdentityRecord = state.identityRecords.find(x => x.applicationId === identityRecord.applicationId);
            if (oldIdentityRecord) {
                const oldIdentityRecordIndex = state.identityRecords.indexOf(oldIdentityRecord);
                state.identityRecords.splice(oldIdentityRecordIndex, 1);
            }

            state.identityRecords.push(identityRecord);
            saveIdentity(state);
        }
    },
    actions: {

    }
}

function saveIdentity(identityState: IdentityModuleState): void {
    storageService.saveIdentityRecords(identityState.identityRecords);
}
