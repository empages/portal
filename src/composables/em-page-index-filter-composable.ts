import {useRoute, useRouter} from "vue-router";
import {computed, ComputedRef, Ref, ref} from "vue";
import {EmPageTableViewModel} from "@/models/em-page-table-view-model";
import {EmPageIndexViewModel} from "@/models/em-page-index-view-model";

export interface EmPageIndexFilter {
    page: Ref<number>;
    searchQuery: Ref<string>;
    orderBy: Ref<string>;
    orderByType: Ref<string>;
    orderByProperties: ComputedRef<Array<{ key: string, value: string }>>;
    orderByTypes: Array<string>;
    loadQueryParams: () => void;
    resetQueryStringParams: () => void;
    preventInvalidProperties: () => void;
}

export const useEmPageFilter = function (viewModel: Ref<EmPageIndexViewModel | null>): EmPageIndexFilter {
    const route = useRoute();

    const orderByTypes = ['asc', 'desc'];
    const page = ref(1);
    const searchQuery = ref('');
    const orderBy: Ref<string> = ref('');
    const orderByType: Ref<string> = ref(orderByTypes[0]);

    const orderByProperties = computed(() => {
        const propertyDictionary = viewModel.value?.tableViewModel?.orderProperties;
        if (!propertyDictionary) {
            return [];
        }

        const keys = Object.keys(propertyDictionary);
        return keys.map(x => {
            return {
                key: x,
                value: propertyDictionary[x]
            }
        });
    })

    const loadQueryParams = () => {
        page.value = (route.query.page || 1) as number;
        searchQuery.value = (route.query.searchQuery || '') as string;
        orderBy.value = (route.query.orderBy || '') as string;
        orderByType.value = (route.query.orderType || orderByTypes[0]) as string;
    }

    const preventInvalidProperties = () => {
        if (orderBy.value && (orderByProperties.value.length && !orderByProperties.value.some(x => x.key === orderBy.value))) {
            orderBy.value = ''
        }

        if (orderByType.value && !orderByTypes.includes(orderByType.value)) {
            orderByType.value = orderByTypes[0];
        }
    }

    const resetQueryStringParams = () => {
        page.value = 1;
        searchQuery.value = '';
        orderBy.value = '';
        orderByType.value = orderByTypes[0];
    }

    return {
        page,
        searchQuery,
        orderBy,
        orderByType,
        orderByProperties,
        orderByTypes,
        loadQueryParams,
        resetQueryStringParams,
        preventInvalidProperties
    }
}
