
interface GeneralModuleState {
    pageTitle: string;
    loaded: boolean;
    pageError: string;
}

export default {
    namespaced: true,
    state(): GeneralModuleState {
        return {
            pageTitle: '',
            loaded: false,
            pageError: ''
        }
    },
    getters: {
        pageTitle(state: GeneralModuleState): string {
            return state.pageTitle;
        },
        loaded(state: GeneralModuleState): boolean {
            return state.loaded;
        },
        pageError(state: GeneralModuleState): string {
            return state.pageError;
        }
    },
    mutations: {
        setPageTitle(state: GeneralModuleState, titles: {main: string, parent: string}): void {
            state.pageTitle = titles.main;
            let documentTitle = titles.main;
            if (titles.parent) {
                documentTitle = `${titles.main} | ${titles.parent}`;
            }

            document.title = `${documentTitle} | Emeraude Portal`;
        },
        setLoaded(state: GeneralModuleState, value: boolean) {
            state.loaded = value;
        },
        setPageError(state: GeneralModuleState, value: string) {
            state.pageError = value;
        }
    },
    actions: {

    }
}
