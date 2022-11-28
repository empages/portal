import type {Ref} from "vue";
import type {EmResponseModel} from "@/core/types";
import {inject} from "vue";

export const emPageResponseInjectionKey = "emPageResponse";

export function useEmPageResponse(): Ref<EmResponseModel | null> | undefined {
    return inject<Ref<EmResponseModel | null>>(emPageResponseInjectionKey);
}
