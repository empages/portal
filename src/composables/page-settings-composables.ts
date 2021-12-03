import {useStore} from "vuex";
import {useRouter} from "vue-router";

export interface PageSettings {
    setTitle(title: string, parentTitle: string): void;
    throwEmPageError(error: string): Promise<void>;
    throwEmPageRequestError(requestError: any): Promise<void>;
}

export const usePageSettings = function (): PageSettings {
    const store = useStore();
    const router = useRouter();

    function setTitle(title: string, parentTitle: string) {
        store.commit('generalModule/setPageTitle', { main: title, parent: parentTitle });
    }

    async function throwEmPageError(error: string): Promise<void> {
        store.commit('generalModule/setPageError', error);
        await router.push({ name: 'admin-em-page-error' });
    }

    async function throwEmPageRequestError(requestError: any): Promise<void> {
        const responseObject = requestError.response.data?.errors || requestError.response.data;
        let error = 'An unexpected error occurred.';
        if (responseObject && responseObject.detail) {
            error = `${responseObject.detail}.`;
        }

        error = `${error} Please recheck the URL that you are trying to access. 
        In case you think the page you are trying to access is valid - please check the EmPage schema configuration in your application.`

        await throwEmPageError(error);
    }

    return {
        setTitle,
        throwEmPageError,
        throwEmPageRequestError
    }
}
