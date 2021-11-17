import {BreadcrumbModelItem} from "@/models/breadcrumb-model-item";

interface BreadcrumbsModuleState {
    breadcrumbs: Array<BreadcrumbModelItem>;
}

export default {
    namespaced: true,
    state(): BreadcrumbsModuleState {
        return {
            breadcrumbs: []
        }
    },
    getters: {
        breadcrumbs(state: BreadcrumbsModuleState): Array<BreadcrumbModelItem> {
            return state.breadcrumbs;
        }
    },
    mutations: {
        setBreadcrumbs(state: BreadcrumbsModuleState, breadcrumbs: Array<BreadcrumbModelItem>): void {
            state.breadcrumbs = breadcrumbs;
        }
    },
    actions: {

    }
}
