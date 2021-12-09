import {EmToastNotification} from "@/shared/types/em-toast-notification";
import {Store} from "vuex";
import store from '@/store'

export interface NotificationProviderContract {
    showToast: (notification: EmToastNotification) => void;
    showSuccessToast: (message: string) => void;
    showErrorToast: (message: string) => void;
    showWarningToast: (message: string) => void;
    showInfoToast: (message: string) => void;
    showExecutionToast: (succeeded: boolean, message: string) => void;
}

class NotificationProvider implements NotificationProviderContract {

    private store: Store<any>
    constructor() {
        this.store = store;
    }

    showErrorToast(message: string): void {
        this.showToast({
            message,
            toastClass: 'bg-danger bg-gradient text-white',
            closeClass: 'btn-close-white'
        } as EmToastNotification)
    }

    showExecutionToast(succeeded: boolean, message: string): void {
        if (succeeded) {
            this.showSuccessToast(message);
        }
        else {
            this.showErrorToast(message);
        }
    }

    showInfoToast(message: string): void {
        this.showToast({
            message,
            toastClass: 'bg-info bg-gradient text-white',
            closeClass: 'btn-close-white'
        } as EmToastNotification)
    }

    showSuccessToast(message: string): void {
        this.showToast({
            message,
            toastClass: 'bg-success bg-gradient text-white',
            closeClass: 'btn-close-white'
        } as EmToastNotification)
    }

    showToast(notification: EmToastNotification): void {
        this.store.commit('notificationModule/addNotification', notification);
    }

    showWarningToast(message: string): void {
        this.showToast({
            message,
            toastClass: 'bg-warning bg-gradient text-white',
            closeClass: 'btn-close-white'
        } as EmToastNotification)
    }

    public handlers: NotificationProviderContract = {
        showInfoToast: this.showInfoToast.bind(this),
        showWarningToast: this.showWarningToast.bind(this),
        showSuccessToast: this.showSuccessToast.bind(this),
        showErrorToast: this.showErrorToast.bind(this),
        showExecutionToast: this.showExecutionToast.bind(this),
        showToast: this.showToast.bind(this)
    }
}

export const notificationProvider = new NotificationProvider();
