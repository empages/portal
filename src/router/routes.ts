import { RouteRecordRaw } from "vue-router";
import {adminAuthenticatedGuard, adminGuard, settingsGuard} from "@/router/guards";
import {layouts} from "@/plugins/layouts";

const routes: Array<RouteRecordRaw> = [
    { name: 'home', path: '/', component: () => import('@/pages/HomePage.vue'), meta: { layout: layouts.base, title: 'Outstanding Management Experience' } },
    { name: 'settings', path: '/settings', component: () => import('@/pages/SettingsPage.vue'), meta: { layout: layouts.base, title: 'Settings' } },
    { name: 'terms', path: '/terms', component: () => import('@/pages/TermsPage.vue'), meta: { layout: layouts.base, title: 'Terms' } },
    { name: 'privacy', path: '/privacy', component: () => import('@/pages/PrivacyPage.vue'), meta: { layout: layouts.base, title: 'Privacy' } },
    ...getAdminRoutes(),
    ...getClientBuilderRoutes(),
    { name: 'not-found', path: '/:pathMatch(.*)*', component: () => import('@/pages/NotFoundPage.vue'), meta: { layout: layouts.base, title: 'Page Not Found' } },
]

function getAdminRoutes(): Array<RouteRecordRaw> {
    const beforeEnter = adminGuard;
    const layout = layouts.admin;
    const parentTitle = 'Admin';

    return [
        { name: 'admin-dashboard', path: '/admin', component: () => import('@/pages/AdminDashboardPage.vue'), beforeEnter, meta: { layout, title: 'Dashboard', parentTitle } },
        { name: 'admin-auth', path: '/admin/auth', component: () => import('@/pages/AdminAuthPage.vue'), beforeEnter: adminAuthenticatedGuard, meta: { layout: layouts.adminSimple, title: 'Authentication', parentTitle } },
        { name: 'admin-manage-2fa', path: '/admin/manage/2fa', component: () => import('@/pages/AdminManageTwoFactorAuthenticationPage.vue'), beforeEnter, meta: { layout, title: 'Manage Two Factor Authentication', parentTitle } },
        { name: 'admin-manage-email', path: '/admin/manage/email', component: () => import('@/pages/AdminManageEmailPage.vue'), beforeEnter, meta: { layout, title: 'Manage Email', parentTitle } },
        { name: 'admin-manage-password', path: '/admin/manage/password', component: () => import('@/pages/AdminManagePasswordPage.vue'), beforeEnter, meta: { layout, title: 'Manage Password', parentTitle } },
        { name: 'admin-em-page-error', path: '/admin/error', component: () => import('@/pages/AdminEmPageErrorPage.vue'), beforeEnter, meta: { layout: layouts.admin, title: 'Error', parentTitle } },
        { name: 'admin-em-page-index-view', path: '/admin/:route', component: () => import('@/pages/AdminEmPageIndexViewPage.vue'), beforeEnter, meta: { layout, title: 'EmPage Index', parentTitle } },
        { name: 'admin-em-page-details-view', path: '/admin/:route/:id', component: () => import('@/pages/AdminEmPageDetailsViewPage.vue'), beforeEnter, meta: { layout, title: 'EmPage Details', parentTitle } },
        { name: 'admin-em-page-create-form-view', path: '/admin/:route/create', component: () => import('@/pages/AdminEmPageCreateFormViewPage.vue'), beforeEnter, meta: { layout, title: 'EmPage Create', parentTitle } },
        { name: 'admin-em-page-edit-form-view', path: '/admin/:route/:id/edit', component: () => import('@/pages/AdminEmPageEditFormPage.vue'), beforeEnter, meta: { layout, title: 'EmPage Edit', parentTitle } },
        { name: 'admin-em-page-feature-view', path: '/admin/:route/:id/:feature', component: () => import('@/pages/AdminEmPageFeatureViewPage.vue'), beforeEnter, meta: { layout, title: 'EmPage Feature', parentTitle } },
    ]
}

function getClientBuilderRoutes(): Array<RouteRecordRaw> {
    const beforeEnter = settingsGuard;
    const layout = layouts.clientBuilder;
    const parentTitle = 'Client Builder';
    return [
        { name: 'client-builder', path: '/client-builder', redirect: '/client-builder/scaffold', beforeEnter },
        { name: 'client-builder-scaffold', path: '/client-builder/scaffold', component: () => import('@/pages/ClientBuilderScaffoldPage.vue'), beforeEnter, meta: { layout, title: 'Scaffold', parentTitle } },
        { name: 'client-builder-endpoints', path: '/client-builder/endpoints', component: () => import('@/pages/ClientBuilderEndpointsPage.vue'), beforeEnter, meta: { layout, title: 'Endpoints', parentTitle } },
        { name: 'client-builder-languages', path: '/client-builder/languages', component: () => import('@/pages/ClientBuilderLanguagesPage.vue'), beforeEnter, meta: { layout, title: 'Languages', parentTitle } },
        { name: 'client-builder-translations', path: '/client-builder/translations', component: () => import('@/pages/ClientBuilderTranslationsPage.vue'), beforeEnter, meta: { layout, title: 'Translations', parentTitle } },
        { name: 'client-builder-static-content', path: '/client-builder/static-content', component: () => import('@/pages/ClientBuilderStaticContentPage.vue'), beforeEnter, meta: { layout, title: 'Static Content', parentTitle } }
    ]
}

export default routes;
