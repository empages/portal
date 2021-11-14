import EmPageTextRenderer from "@/components/em-pages/components/renderers/EmPageTextRenderer.vue";
import EmPageFlagRenderer from "@/components/em-pages/components/renderers/EmPageFlagRenderer.vue";
import EmPageEnumRenderer from "@/components/em-pages/components/renderers/EmPageEnumRenderer.vue";

export default {
    install: (app: any) => {
        app.component('EmPageTextRenderer', EmPageTextRenderer);
        app.component('EmPageFlagRenderer', EmPageFlagRenderer);
        app.component('EmPageEnumRenderer', EmPageEnumRenderer);
    }
}
