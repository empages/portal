import {useStore} from "vuex";

export const useUrlBuilder = function () {
    const store = useStore();
    const selectedApplication = store.getters['settingsModule/selectedApplication'];
    let baseUrl = '';
    if (selectedApplication) {
        baseUrl = selectedApplication.url;
    }

    if (baseUrl.endsWith('/')) {
        baseUrl.substr(0, baseUrl.length - 1);
    }

    const getApplicationUrl = (route: string) => `${baseUrl}${route}`;

    return {
        getApplicationUrl
    }
}
