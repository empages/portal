import { useStore } from "vuex";
import {ToastNotification} from "@/models/notification";

export interface NotificationProvider {
    showToast: (notification: ToastNotification) => void;
    showSuccessToast: (message: string) => void;
    showErrorToast: (message: string) => void;
    showWarningToast: (message: string) => void;
    showInfoToast: (message: string) => void;
}

export const useNotifications = function (): NotificationProvider {
    const store = useStore();

    const showToast = (notification: ToastNotification): void => {
        store.commit('notificationModule/addNotification', notification);
    }

    const showSuccessToast = (message: string): void => {
        showToast({
            message,
            toastClass: 'bg-success bg-gradient text-white',
            closeClass: 'btn-close-white'
        } as ToastNotification)
    }

    const showErrorToast = (message: string): void => {
        showToast({
            message,
            toastClass: 'bg-danger bg-gradient text-white',
            closeClass: 'btn-close-white'
        } as ToastNotification)
    }

    const showInfoToast = (message: string): void => {
        showToast({
            message,
            toastClass: 'bg-info bg-gradient text-white',
            closeClass: 'btn-close-white'
        } as ToastNotification)
    }

    const showWarningToast = (message: string): void => {
        showToast({
            message,
            toastClass: 'bg-warning bg-gradient text-white',
            closeClass: 'btn-close-white'
        } as ToastNotification)
    }

    return {
        showToast,
        showSuccessToast,
        showErrorToast,
        showWarningToast,
        showInfoToast
    }
}
