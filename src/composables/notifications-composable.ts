import { useStore } from "vuex";
import {EmToastNotification} from "@/shared/types/em-toast-notification"

export interface NotificationProvider {
    showToast: (notification: EmToastNotification) => void;
    showSuccessToast: (message: string) => void;
    showErrorToast: (message: string) => void;
    showWarningToast: (message: string) => void;
    showInfoToast: (message: string) => void;
}

export const useNotifications = function (): NotificationProvider {
    const store = useStore();

    const showToast = (notification: EmToastNotification): void => {
        store.commit('notificationModule/addNotification', notification);
    }

    const showSuccessToast = (message: string): void => {
        showToast({
            message,
            toastClass: 'bg-success bg-gradient text-white',
            closeClass: 'btn-close-white'
        } as EmToastNotification)
    }

    const showErrorToast = (message: string): void => {
        showToast({
            message,
            toastClass: 'bg-danger bg-gradient text-white',
            closeClass: 'btn-close-white'
        } as EmToastNotification)
    }

    const showInfoToast = (message: string): void => {
        showToast({
            message,
            toastClass: 'bg-info bg-gradient text-white',
            closeClass: 'btn-close-white'
        } as EmToastNotification)
    }

    const showWarningToast = (message: string): void => {
        showToast({
            message,
            toastClass: 'bg-warning bg-gradient text-white',
            closeClass: 'btn-close-white'
        } as EmToastNotification)
    }

    return {
        showToast,
        showSuccessToast,
        showErrorToast,
        showWarningToast,
        showInfoToast
    }
}
