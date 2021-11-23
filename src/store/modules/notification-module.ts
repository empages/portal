
import * as _ from 'lodash'
import { EmToastNotification } from '@/shared/types/em-toast-notification'

interface NotificationModuleState {
    notificationStack: Array<EmToastNotification>;
}

export default {
    namespaced: true,
    state(): NotificationModuleState {
        return {
            notificationStack: []
        }
    },
    getters: {
        notifications(state: NotificationModuleState): Array<EmToastNotification> {
            return state.notificationStack;
        }
    },
    mutations: {
        addNotification(state: NotificationModuleState, notification: EmToastNotification) {
            notification.id = _.uniqueId("notification_");
            state.notificationStack.push(notification);
        },
        clearNotification(state: NotificationModuleState, id: string) {
            const elementForRemove: EmToastNotification | undefined = state.notificationStack.find(x => x.id === id);
            if (elementForRemove) {
                const index = state.notificationStack.indexOf(elementForRemove);
                state.notificationStack.splice(index, 1);
            }
        }
    },
    actions: {

    }
}
