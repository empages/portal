import { RouteRecordRaw } from "vue-router";
import {adminAuthenticatedGuard, adminGuard, settingsGuard} from "@/router/guards";
import {layouts} from "@/plugins/layouts";

const routes: Array<RouteRecordRaw> = [
    { name: 'home', path: '/', component: () => import('@/pages/HomePage.vue'), meta: { layout: layouts.base } },
    { name: 'settings', path: '/settings', component: () => import('@/pages/SettingsPage.vue'), meta: { layout: layouts.base } },
    ...getAdminRoutes(),
    ...getClientBuilderRoutes(),
    { name: 'not-found', path: '/:pathMatch(.*)*', component: () => import('@/pages/NotFoundPage.vue'), meta: { layout: layouts.base } },
]

function getAdminRoutes(): Array<RouteRecordRaw> {
    const beforeEnter = adminGuard;
    const layout = layouts.admin;

    return [
        { name: 'admin-dashboard', path: '/admin', component: () => import('@/pages/AdminDashboardPage.vue'), beforeEnter, meta: { layout } },
        { name: 'admin-auth', path: '/admin/auth', component: () => import('@/pages/AdminAuthPage.vue'), beforeEnter: adminAuthenticatedGuard, meta: { layout: layouts.adminSimple } },
        { name: 'admin-manage-2fa', path: '/admin/manage/2fa', component: () => import('@/pages/AdminManageTwoFactorAuthenticationPage.vue'), meta: { layout } },
        { name: 'admin-manage-email', path: '/admin/manage/email', component: () => import('@/pages/AdminManageEmailPage.vue'), beforeEnter, meta: { layout } },
        { name: 'admin-manage-password', path: '/admin/manage/password', component: () => import('@/pages/AdminManagePasswordPage.vue'), beforeEnter, meta: { layout } },
        { name: 'admin-table-view-em-page', path: '/admin/:route', component: () => import('@/pages/AdminTableViewEmPage.vue'), beforeEnter, meta: { layout } },
        { name: 'admin-details-view-em-page', path: '/admin/:route/:id', component: () => import('@/pages/AdminDetailsViewEmPage.vue'), beforeEnter, meta: { layout } },
        { name: 'admin-create-form-view-em-page', path: '/admin/:route/create', component: () => import('@/pages/AdminCreateFormViewEmPage.vue'), beforeEnter, meta: { layout } },
        { name: 'admin-edit-form-view-em-page', path: '/admin/:route/:id/edit', component: () => import('@/pages/AdminEditFormViewEmPage.vue'), beforeEnter, meta: { layout } },
        { name: 'admin-feature-view-em-page', path: '/admin/:route/:id/:feature', component: () => import('@/pages/AdminFeatureViewEmPage.vue'), beforeEnter, meta: { layout } },
    ]
}

function getClientBuilderRoutes(): Array<RouteRecordRaw> {
    const beforeEnter = settingsGuard;
    const layout = layouts.clientBuilder;
    return [
        { name: 'client-builder', path: '/client-builder', redirect: '/client-builder/scaffold', beforeEnter, meta: { layout: layouts.clientBuilder } },
        { name: 'client-builder-scaffold', path: '/client-builder/scaffold', component: () => import('@/pages/ClientBuilderScaffoldPage.vue'), beforeEnter, meta: { layout } },
        { name: 'client-builder-endpoints', path: '/client-builder/endpoints', component: () => import('@/pages/ClientBuilderEndpointsPage.vue'), beforeEnter, meta: { layout } },
        { name: 'client-builder-languages', path: '/client-builder/languages', component: () => import('@/pages/ClientBuilderLanguagesPage.vue'), beforeEnter, meta: { layout } },
        { name: 'client-builder-translations', path: '/client-builder/translations', component: () => import('@/pages/ClientBuilderTranslationsPage.vue'), beforeEnter, meta: { layout } },
        { name: 'client-builder-static-content', path: '/client-builder/static-content', component: () => import('@/pages/ClientBuilderStaticContentPage.vue'), beforeEnter, meta: { layout } }
    ]
}

export default routes;
