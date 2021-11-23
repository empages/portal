import EmPageTextRenderer from "@/components/em-pages/components/renderers/EmPageTextRenderer.vue";
import EmPageFlagRenderer from "@/components/em-pages/components/renderers/EmPageFlagRenderer.vue";
import EmPageEnumRenderer from "@/components/em-pages/components/renderers/EmPageEnumRenderer.vue";
import EmPageHtmlRenderer from "@/components/em-pages/components/renderers/EmPageHtmlRenderer.vue";
import EmPageImageRenderer from "@/components/em-pages/components/renderers/EmPageImageRenderer.vue";

import EmPageTextMutator from "@/components/em-pages/components/mutators/EmPageTextMutator.vue";
import EmPageDateMutator from "@/components/em-pages/components/mutators/EmPageDateMutator.vue";
import EmPageTimeMutator from "@/components/em-pages/components/mutators/EmPageTimeMutator.vue";
import EmPageEnumMutator from "@/components/em-pages/components/mutators/EmPageEnumMutator.vue";
import EmPageFlagMutator from "@/components/em-pages/components/mutators/EmPageFlagMutator.vue";
import EmPageHtmlMutator from "@/components/em-pages/components/mutators/EmPageHtmlMutator.vue";
import EmPageEntityMutator from "@/components/em-pages/components/mutators/EmPageEntityMutator.vue";
import EmPageCustomMutator from "@/components/em-pages/components/mutators/EmPageCustomMutator.vue";

export default {
    install: (app: any) => {
        // renderers
        app.component('EmPageTextRenderer', EmPageTextRenderer);
        app.component('EmPageFlagRenderer', EmPageFlagRenderer);
        app.component('EmPageEnumRenderer', EmPageEnumRenderer);
        app.component('EmPageHtmlRenderer', EmPageHtmlRenderer);
        app.component('EmPageImageRenderer', EmPageImageRenderer);

        // mutators
        app.component('EmPageTextMutator', EmPageTextMutator);
        app.component('EmPageDateMutator', EmPageDateMutator);
        app.component('EmPageTimeMutator', EmPageTimeMutator);
        app.component('EmPageEnumMutator', EmPageEnumMutator);
        app.component('EmPageFlagMutator', EmPageFlagMutator);
        app.component('EmPageHtmlMutator', EmPageHtmlMutator);
        app.component('EmPageEntityMutator', EmPageEntityMutator);
        app.component('EmPageCustomMutator', EmPageCustomMutator);
    }
}
