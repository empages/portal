import {useStore} from "vuex";
import {BreadcrumbModelItem} from "@/models/breadcrumb-model-item";
import {ActionModel} from "@/models/action-model";

export interface AdminLayoutReloadOptions {
    breadcrumbs: Array<BreadcrumbModelItem>;
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

        if (options.breadcrumbs) {
            store.commit('breadcrumbsModule/setBreadcrumbs', options.breadcrumbs);
        }
    }

    function reset() {
        store.commit('navActionsModule/setActions', []);
        store.commit('breadcrumbsModule/setBreadcrumbs', []);
    }

    return {
        reload,
        reset
    }
}
