import {useRoute} from "vue-router";
import {computed, ComputedRef} from "vue";

export interface EmPageArgs {
    route: ComputedRef<string | null>;
    identifier: ComputedRef<string | null>;
}

export const useEmPageArgs = function (): EmPageArgs {
    const routeInstance = useRoute();

    const route = computed(() => {
        if (!routeInstance.params || !routeInstance.params.route) {
            return null;
        }

        return routeInstance.params.route.toString();
    });

    const identifier = computed(() => {
        if (!routeInstance.params || !routeInstance.params.id) {
            return null;
        }

        return routeInstance.params.id.toString();
    });

    return {
        route,
        identifier
    }
}
