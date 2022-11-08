import type {IdentityStorageRecord} from "@/models/identity-storage-record";
import storageService from "@/services/storage-service";
import {validateAccessTokenExpiration} from "@/shared/helpers";
import jwtDecode from "jwt-decode";
import type {JwtPayload} from "jwt-decode";

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
        authenticated(state: IdentityModuleState, getters: any) {
            return getters.currentIdentityRecord && validateAccessTokenExpiration(getters.currentIdentityRecord.accessToken);
        },
        currentIdentityRecord(state: IdentityModuleState)  {
            const selectedApplicationId = storageService.getSelectedApplicationId();
            return state.identityRecords.find(x => x.applicationId === selectedApplicationId);
        },
        decodedIdentity(state: IdentityModuleState, getters: any) {
            if (!getters.currentIdentityRecord) {
                return null;
            }

            return jwtDecode<JwtPayload>(getters.currentIdentityRecord.accessToken);
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
        },
        removeIdentity(state: IdentityModuleState, identityRecord: IdentityStorageRecord) {
            const oldIdentityRecord = state.identityRecords.find(x => x.applicationId === identityRecord.applicationId);
            if (oldIdentityRecord) {
                const oldIdentityRecordIndex = state.identityRecords.indexOf(oldIdentityRecord);
                state.identityRecords.splice(oldIdentityRecordIndex, 1);
            }

            saveIdentity(state);
        }
    },
    actions: {

    }
}

function saveIdentity(identityState: IdentityModuleState): void {
    storageService.saveIdentityRecords(identityState.identityRecords);
}
