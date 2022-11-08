import {useStore} from "vuex";

export interface AdminLayoutReloadOptions {
    navbarActions: Array<any>;
}

export interface AdminLayout {
    reload(options: AdminLayoutReloadOptions): void;
    reset(): void
}

export const useAdminLayout = function (): AdminLayout {
    const store = useStore();

    function reload(options: AdminLayoutReloadOptions): void {
        if (options.navbarActions) {
            store.commit('navActionsModule/setActions', options.navbarActions);
        }
    }

    function reset() {
        store.commit('navActionsModule/setActions', []);
    }

    return {
        reload,
        reset
    }
}
