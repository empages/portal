import type {EmToastNotification} from "@/shared/types/em-toast-notification";
import {newGuid} from "@/shared/helpers";

export interface NotificationServiceContract {
    showToast: (notification: EmToastNotification) => void;
    showSuccessToast: (message: string) => void;
    showErrorToast: (message: string) => void;
    showWarningToast: (message: string) => void;
    showInfoToast: (message: string) => void;
    showExecutionToast: (succeeded: boolean, message: string) => void;
}

class NotificationService implements NotificationServiceContract {

    private notifications: EmToastNotification[] = [];
    private triggerFunc: () => void = () => { console.log('initialize') };

    getNotifications(): EmToastNotification[] {
        return this.notifications;
    }

    setTrigger(triggerFunc: () => void) {
        this.triggerFunc = triggerFunc;
    }

    removeToast(toastId: string) {
        const toastForRemoval = this.notifications.find(x => x.id == toastId);
        if (!toastForRemoval) {
            return;
        }

        const targetIndex = this.notifications.indexOf(toastForRemoval);
        this.notifications.splice(targetIndex, 1);
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
        notification.id = newGuid();
        this.notifications.push(notification);
        this.triggerFunc();
    }

    showWarningToast(message: string): void {
        this.showToast({
            message,
            toastClass: 'bg-warning bg-gradient text-white',
            closeClass: 'btn-close-white'
        } as EmToastNotification)
    }

    public handlers: NotificationServiceContract = {
        showInfoToast: this.showInfoToast.bind(this),
        showWarningToast: this.showWarningToast.bind(this),
        showSuccessToast: this.showSuccessToast.bind(this),
        showErrorToast: this.showErrorToast.bind(this),
        showExecutionToast: this.showExecutionToast.bind(this),
        showToast: this.showToast.bind(this)
    }
}

export const notificationService = new NotificationService();
