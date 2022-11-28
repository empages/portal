import EmTablePage from "@/core/pages/table/EmTablePage.vue";
import EmDetailsPage from "@/core/pages/details/EmDetailsPage.vue";
import EmFormPage from "@/core/pages/form/EmFormPage.vue";
import EmEnumRenderer from "@/core/components/renderers/EmEnumRenderer.vue";
import EmFlagRenderer from "@/core/components/renderers/EmFlagRenderer.vue";
import EmHtmlRenderer from "@/core/components/renderers/EmHtmlRenderer.vue";
import EmImageRenderer from "@/core/components/renderers/EmImageRenderer.vue";
import EmTextRenderer from "@/core/components/renderers/EmTextRenderer.vue";
import EmDateMutator from "@/core/components/mutators/EmDateMutator.vue";
import EmDateTimeMutator from "@/core/components/mutators/EmDateTimeMutator.vue";
import EmFileMutator from "@/core/components/mutators/EmFileMutator.vue";
import EmFlagMutator from "@/core/components/mutators/EmFlagMutator.vue";
import EmHtmlMutator from "@/core/components/mutators/EmHtmlMutator.vue";
import EmMultiChoiceMutator from "@/core/components/mutators/EmMultiChoiceMutator.vue";
import EmTextMutator from "@/core/components/mutators/EmTextMutator.vue";
import EmTimeMutator from "@/core/components/mutators/EmTimeMutator.vue";

export default {
    install: (app: any) => {
        // Pages
        app.component("EmTablePage", EmTablePage);
        app.component("EmDetailsPage", EmDetailsPage);
        app.component("EmFormPage", EmFormPage);

        // Components
        app.component("EmEnumRenderer", EmEnumRenderer);
        app.component("EmFlagRenderer", EmFlagRenderer);
        app.component("EmHtmlRenderer", EmHtmlRenderer);
        app.component("EmImageRenderer", EmImageRenderer);
        app.component("EmTextRenderer", EmTextRenderer);
        app.component("EmDateMutator", EmDateMutator);
        app.component("EmDateTimeMutator", EmDateTimeMutator);
        app.component("EmFileMutator", EmFileMutator);
        app.component("EmFlagMutator", EmFlagMutator);
        app.component("EmHtmlMutator", EmHtmlMutator);
        app.component("EmMultiChoiceMutator", EmMultiChoiceMutator);
        app.component("EmTextMutator", EmTextMutator);
        app.component("EmTimeMutator", EmTimeMutator);
    }
}
