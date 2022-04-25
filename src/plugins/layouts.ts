import EmLayout from '@/components/layouts/EmLayout.vue';
import EmBaseLayout from '@/components/layouts/EmBaseLayout.vue';

export const layouts = {
    main: 'EmLayout',
    base: 'EmBaseLayout',
}

export default {
    install: (app: any) => {
        app.component(layouts.main, EmLayout);
        app.component(layouts.base, EmBaseLayout);
    }
}
