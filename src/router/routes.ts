import { RouteRecordRaw } from "vue-router";
import {adminAuthenticatedGuard, adminGuard} from "@/router/guards";

const routes: Array<RouteRecordRaw> = [
    { name: 'home', path: '/', component: () => import('@/pages/HomePage.vue') },
    { name: 'settings', path: '/settings', component: () => import('@/pages/SettingsPage.vue') },
    { name: 'admin-dashboard', path: '/admin', component: () => import('@/pages/AdminDashboardPage.vue'), beforeEnter: adminGuard },
    { name: 'admin-auth', path: '/admin/auth', component: () => import('@/pages/AdminAuthPage.vue'), beforeEnter: adminAuthenticatedGuard },
    { name: 'admin-manage-2fa', path: '/admin/manage/2fa', component: () => import('@/pages/AdminManageTwoFactorAuthenticationPage.vue') },
    { name: 'admin-manage-email', path: '/admin/manage/email', component: () => import('@/pages/AdminManageEmailPage.vue'), beforeEnter: adminGuard },
    { name: 'admin-manage-password', path: '/admin/manage/password', component: () => import('@/pages/AdminManagePasswordPage.vue'), beforeEnter: adminGuard },
    { name: 'admin-table-view-em-page', path: '/admin/:route', component: () => import('@/pages/AdminTableViewEmPage.vue'), beforeEnter: adminGuard },
    { name: 'admin-details-view-em-page', path: '/admin/:route/:id', component: () => import('@/pages/AdminDetailsViewEmPage.vue'), beforeEnter: adminGuard },
    { name: 'admin-create-form-view-em-page', path: '/admin/:route/create', component: () => import('@/pages/AdminCreateFormViewEmPage.vue'), beforeEnter: adminGuard },
    { name: 'admin-edit-form-view-em-page', path: '/admin/:route/:id/edit', component: () => import('@/pages/AdminEditFormViewEmPage.vue'), beforeEnter: adminGuard },
    { name: 'admin-feature-view-em-page', path: '/admin/:route/:id/:feature', component: () => import('@/pages/AdminFeatureViewEmPage.vue'), beforeEnter: adminGuard },
    { name: 'client-builder', path: '/client-builder', redirect: '/client-builder/scaffold' },
    { name: 'client-builder-scaffold', path: '/client-builder/scaffold', component: () => import('@/pages/ClientBuilderScaffoldPage.vue') },
    { name: 'client-builder-endpoints', path: '/client-builder/endpoints', component: () => import('@/pages/ClientBuilderEndpointsPage.vue') },
    { name: 'client-builder-languages', path: '/client-builder/languages', component: () => import('@/pages/ClientBuilderLanguagesPage.vue') },
    { name: 'client-builder-translations', path: '/client-builder/translations', component: () => import('@/pages/ClientBuilderTranslationsPage.vue') },
    { name: 'client-builder-static-content', path: '/client-builder/static-content', component: () => import('@/pages/ClientBuilderStaticContentPage.vue') },
    { name: 'not-found', path: '/:pathMatch(.*)*', component: () => import('@/pages/NotFoundPage.vue') },
]

export default routes;
