import EmPageTextRenderer from "@/components/em-pages/components/renderers/EmPageTextRenderer.vue";
import EmPageFlagRenderer from "@/components/em-pages/components/renderers/EmPageFlagRenderer.vue";
import EmPageEnumRenderer from "@/components/em-pages/components/renderers/EmPageEnumRenderer.vue";
import EmPageHtmlRenderer from "@/components/em-pages/components/renderers/EmPageHtmlRenderer.vue";
import EmPageImageRenderer from "@/components/em-pages/components/renderers/EmPageImageRenderer.vue";

export default {
    install: (app: any) => {
        app.component('EmPageTextRenderer', EmPageTextRenderer);
        app.component('EmPageFlagRenderer', EmPageFlagRenderer);
        app.component('EmPageEnumRenderer', EmPageEnumRenderer);
        app.component('EmPageHtmlRenderer', EmPageHtmlRenderer);
        app.component('EmPageImageRenderer', EmPageImageRenderer);
    }
}
