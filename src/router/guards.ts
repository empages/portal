import store from '@/store'
import type {NavigationGuardNext, RouteLocationNormalized} from "vue-router";
import {notificationService} from "@/services/notification-service";
import stateService from "@/services/state-service";

export const authenticationGuard = async function (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    try {
        if (!store.getters['settingsModule/applications'].length) {
            next({ name: 'settings' });
            notificationService.showWarningToast('Emerald Pages Portal requires registration of at least one application');
            return;
        }

        await stateService.checkAuthState();
    }
    catch (e) {
        const currentIdentityRecord = store.getters['identityModule/currentIdentityRecord'];
        if (currentIdentityRecord) {
            store.commit('identityModule/removeIdentity', currentIdentityRecord);
        }

        next({ name: 'auth' });
        return;
    }

    next();
}

export const authenticatedGuard = async function (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    if (!store.getters['settingsModule/applications'].length) {
        next({ name: 'settings' });
        return;
    }

    if (store.getters['identityModule/authenticated']) {
        next({ name: 'dashboard' });
        return;
    }

    next();
}
