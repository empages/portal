import {createStore, Store} from "vuex";
import settingsModule from "@/store/modules/settings-module";
import notificationModule from "@/store/modules/notification-module";
import identityModule from "@/store/modules/identity-module";
import sidebarModule from "@/store/modules/sidebar-module";
import breadcrumbsModule from "@/store/modules/breadcrumbs-module";
import navActionsModule from "@/store/modules/nav-actions-module";

const store: Store<MainState> = createStore({
    state (): MainState {
        return {

        }
    },
    mutations: {},
    getters: {},
    actions: {},
    modules: {
        settingsModule,
        notificationModule,
        identityModule,
        sidebarModule,
        breadcrumbsModule,
        navActionsModule
    }
})

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MainState {}

export default store;
