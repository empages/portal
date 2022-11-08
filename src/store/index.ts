import {ActionContext, createStore, Store} from "vuex";
import settingsModule from "@/store/modules/settings-module";
import generalModule from "@/store/modules/general-module";
import identityModule from "@/store/modules/identity-module";
import sidebarModule from "@/store/modules/sidebar-module";
import navActionsModule from "@/store/modules/nav-actions-module";
import configurationService from "@/services/configuration-service";
import {notificationProvider} from "@/services/notification-provider";

const store: Store<MainState> = createStore({
    state (): MainState {
        return {

        }
    },
    mutations: {},
    getters: {},
    actions: {
        reloadState(context: ActionContext<MainState, MainState>) {
            const application = context.getters["settingsModule/selectedApplication"];
            if (!application) {
                notificationProvider.showWarningToast('There is no registered application to connect with');
                context.commit('settingsModule/setIsSelectedApplicationConnected', false);
                context.commit('settingsModule/setConfiguration', null);
                return;
            }

            configurationService.getConfiguration(application)
                .then(config => {
                    context.commit('settingsModule/setIsSelectedApplicationConnected', true);
                    context.commit('settingsModule/setConfiguration', config);
                    notificationProvider.showSuccessToast(`Emerald Pages Portal has been connected with **${application.name}**`);
                })
                .catch(() => {
                    context.commit('settingsModule/setIsSelectedApplicationConnected', false);
                    context.commit('settingsModule/setConfiguration', null);
                    notificationProvider.showErrorToast(`Emerald Pages Portal cannot initialize a connection with **${application.name}**`);
                })
        }
    },
    modules: {
        settingsModule,
        generalModule,
        identityModule,
        sidebarModule,
        navActionsModule
    }
})

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MainState {}

export default store;
