interface NavActionsModuleState {
    actions: Array<any>;
}

export default {
    namespaced: true,
    state(): NavActionsModuleState {
        return {
            actions: []
        }
    },
    getters: {
        actions(state: NavActionsModuleState): Array<any> {
            return state.actions;
        }
    },
    mutations: {
        setActions(state: NavActionsModuleState, actions: Array<any>): void {
            state.actions = actions;
        }
    },
    actions: {

    }
}
