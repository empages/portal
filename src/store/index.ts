import {createStore, Store} from "vuex";
import type {ActionContext} from "vuex";
import settingsModule from "@/store/modules/settings-module";
import generalModule from "@/store/modules/general-module";
import identityModule from "@/store/modules/identity-module";
import navActionsModule from "@/store/modules/nav-actions-module";
import stateService from "@/services/state-service";
import {notificationService} from "@/services/notification-service";

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
                notificationService.showWarningToast('There is no registered application to connect with');
                context.commit('settingsModule/setIsSelectedApplicationConnected', false);
                context.commit('settingsModule/setConfiguration', null);
                return;
            }

            stateService.getState(application)
                .then(state => {
                    context.commit('settingsModule/setIsSelectedApplicationConnected', true);
                    context.commit('settingsModule/setGatewayState', state);
                    notificationService.showSuccessToast(`Emerald Pages Portal has been connected with **${application.name}**`);
                })
                .catch(() => {
                    context.commit('settingsModule/setIsSelectedApplicationConnected', false);
                    context.commit('settingsModule/setGatewayState', null);
                    notificationService.showErrorToast(`Emerald Pages Portal cannot initialize a connection with **${application.name}**`);
                })
        }
    },
    modules: {
        settingsModule,
        generalModule,
        identityModule,
        navActionsModule
    }
})

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MainState {}

export default store;
