import {ActionModel} from "@/models/action-model";

interface NavActionsModuleState {
    actions: Array<ActionModel>;
}

export default {
    namespaced: true,
    state(): NavActionsModuleState {
        return {
            actions: []
        }
    },
    getters: {
        actions(state: NavActionsModuleState): Array<ActionModel> {
            return state.actions;
        }
    },
    mutations: {
        setActions(state: NavActionsModuleState, actions: Array<ActionModel>): void {
            state.actions = actions;
        }
    },
    actions: {

    }
}
