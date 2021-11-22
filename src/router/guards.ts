import store from '@/store'
import {NavigationGuardNext, RouteLocationNormalized} from "vue-router";
import adminService from "@/services/admin-service";

export const settingsGuard = function (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    if (!store.getters['settingsModule/applications'].length) {
        next({ name: 'settings' });
        return;
    }

    next();
}

export const adminGuard = async function (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    try {
        if (!store.getters['settingsModule/applications'].length) {
            next({ name: 'settings' });
            return;
        }

        await adminService.checkAuthorization();
    }
    catch (e) {
        const currentIdentityRecord = store.getters['identityModule/currentIdentityRecord'];
        if (currentIdentityRecord) {
            store.commit('identityModule/removeIdentity', currentIdentityRecord);
        }

        next({ name: 'admin-auth' });
        return;
    }

    next();
}

export const adminAuthenticatedGuard = async function (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    if (!store.getters['settingsModule/applications'].length) {
        next({ name: 'settings' });
        return;
    }

    if (store.getters['identityModule/authenticated']) {
        next({ name: 'admin-dashboard' });
        return;
    }

    next();
}
