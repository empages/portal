import {ToastNotification} from "@/models/notification";
import * as _ from 'lodash'

interface NotificationModuleState {
    notificationStack: Array<ToastNotification>;
}

export default {
    namespaced: true,
    state(): NotificationModuleState {
        return {
            notificationStack: []
        }
    },
    getters: {
        notifications(state: NotificationModuleState): Array<ToastNotification> {
            return state.notificationStack;
        }
    },
    mutations: {
        addNotification(state: NotificationModuleState, notification: ToastNotification) {
            notification.id = _.uniqueId("notification_");
            state.notificationStack.push(notification);
        },
        clearNotification(state: NotificationModuleState, id: string) {
            const elementForRemove: ToastNotification | undefined = state.notificationStack.find(x => x.id === id);
            if (elementForRemove) {
                const index = state.notificationStack.indexOf(elementForRemove);
                state.notificationStack.splice(index, 1);
            }
        }
    },
    actions: {

    }
}
