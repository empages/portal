import store from '@/store'
import {NavigationGuardNext, RouteLocationNormalized} from "vue-router";
import {notificationProvider} from "@/services/notification-provider";

export const authenticationGuard = async function (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    try {
        if (!store.getters['settingsModule/applications'].length) {
            next({ name: 'settings' });
            notificationProvider.showWarningToast('Emeraude Portal requires registration of at least one application');
            return;
        }

        store.getters['settingsModule/configuration']?.identity.currentUser
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
