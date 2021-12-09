import store from '@/store'
import {NavigationGuardNext, RouteLocationNormalized} from "vue-router";
import adminService from "@/services/admin-service";
import {notificationProvider} from "@/services/notification-provider";

export const clientBuilderGuard = async function (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    if (!store.getters['settingsModule/applications'].length) {
        next({ name: 'settings' });
        notificationProvider.showWarningToast('Client Builder requires registration of application');
        return;
    }

    if (!store.getters['settingsModule/selectedApplication'].isDevelopment) {
        next({ name: 'home' });
        notificationProvider.showWarningToast('Client Builder can be accessible only in development environment');
    }

    next();
}

export const adminGuard = async function (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    try {
        if (!store.getters['settingsModule/applications'].length) {
            next({ name: 'settings' });
            notificationProvider.showWarningToast('Admin requires registration of application');
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
