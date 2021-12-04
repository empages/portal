import EmAdminLayout from '@/components/layouts/EmAdminLayout.vue';
import EmAdminSimpleLayout from '@/components/layouts/EmAdminSimpleLayout.vue';
import EmBaseLayout from '@/components/layouts/EmBaseLayout.vue';
import EmClientBuilderLayout from '@/components/layouts/EmClientBuilderLayout.vue';
import EmSettingsLayout from '@/components/layouts/EmSettingsLayout.vue';

export const layouts = {
    admin: 'EmAdminLayout',
    adminSimple: 'EmAdminSimpleLayout',
    base: 'EmBaseLayout',
    clientBuilder: 'EmClientBuilderLayout',
    settings: 'EmSettingsLayout'
}

export default {
    install: (app: any) => {
        app.component(layouts.admin, EmAdminLayout);
        app.component(layouts.adminSimple, EmAdminSimpleLayout);
        app.component(layouts.base, EmBaseLayout);
        app.component(layouts.clientBuilder, EmClientBuilderLayout);
        app.component(layouts.settings, EmSettingsLayout);
    }
}
