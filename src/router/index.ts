import {createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized} from 'vue-router'
import routes from "@/router/routes";
import store from '@/store'
const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to: RouteLocationNormalized) => {
    store.commit('generalModule/setLoaded', false);
    store.commit('generalModule/setPageTitle', { main: to.meta.title });
})

router.afterEach(()  => {
    setTimeout(() => {
        store.commit('generalModule/setLoaded', true);
    }, 250);
})

export default router;
