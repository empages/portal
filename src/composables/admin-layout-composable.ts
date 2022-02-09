import {useStore} from "vuex";
import {ActionModel} from "@/models/action-model";

export interface AdminLayoutReloadOptions {
    navbarActions: Array<ActionModel>;
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
