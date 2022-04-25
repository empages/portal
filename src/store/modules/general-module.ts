import {RouteLocationRaw} from "vue-router";
import {strings} from "@/shared/strings";

interface GeneralModuleState {
    pageTitle: string;
    pageActions: PageAction[];
    loaded: boolean;
    pageError: string;
    executionResult: { variant: string, message: string } | null;
}

export const enum PageActionType {
    Function = 0,
    Route = 1,
    Url = 2
}

export interface PageAction {
    name: string,
    icon: string,
    action: (() => void) | (() => Promise<void>) | RouteLocationRaw | string,
    type: PageActionType
}

export default {
    namespaced: true,
    state(): GeneralModuleState {
        return {
            pageTitle: '',
            pageActions: [],
            loaded: false,
            pageError: '',
            executionResult: null
        }
    },
    getters: {
        pageTitle(state: GeneralModuleState): string {
            return state.pageTitle;
        },
        pageActions(state: GeneralModuleState): Array<PageAction> {
            return state.pageActions;
        },
        loaded(state: GeneralModuleState): boolean {
            return state.loaded;
        },
        pageError(state: GeneralModuleState): string {
            return state.pageError;
        },
        executionResult(state: GeneralModuleState): { variant: string, message: string } | null {
            return state.executionResult;
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
        setPageActions(state: GeneralModuleState, actions: PageAction[]): void {
          state.pageActions = actions;
        },
        setLoaded(state: GeneralModuleState, value: boolean) {
            state.loaded = value;
        },
        setPageError(state: GeneralModuleState, value: string) {
            state.pageError = value;
        },
        setExecutionResult(state: GeneralModuleState, result: { variant: string, message: string } | null) {
            state.executionResult = result;
        }
    },
    actions: {

    }
}
