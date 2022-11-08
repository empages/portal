import type { RouteRecordRaw } from "vue-router";
import {authenticatedGuard, authenticationGuard} from "@/router/guards";
import {layouts} from "@/plugins/layouts";

const routes: Array<RouteRecordRaw> = [
    {
        name: 'dashboard',
        path: '/',
        component: () => import('@/pages/DashboardPage.vue'),
        beforeEnter: authenticationGuard,
        meta: { layout: layouts.main, title: 'Dashboard' }
    },
    {
        name: 'settings',
        path: '/settings',
        component: () => import('@/pages/SettingsPage.vue'),
        meta: { layout: layouts.base, title: 'Settings' }
    },
    {
        name: 'terms',
        path: '/terms',
        component: () => import('@/pages/TermsPage.vue'),
        meta: { layout: layouts.base, title: 'Terms' }
    },
    {
        name: 'auth',
        path: '/auth',
        component: () => import('@/pages/AuthPage.vue'),
        beforeEnter: authenticatedGuard,
        meta: { layout: layouts.base, title: 'Authentication' }
    },
    {
        name: 'manage-2fa',
        path: '/manage/2fa',
        component: () => import('@/pages/ManageTwoFactorAuthenticatorPage.vue'),
        beforeEnter: authenticationGuard,
        meta: { layout: layouts.main, title: 'Manage Two Factor Authenticator' }
    },
    {
        name: 'manage-email',
        path: '/manage/email',
        component: () => import('@/pages/ManageEmailPage.vue'),
        beforeEnter: authenticationGuard,
        meta: { layout: layouts.main, title: 'Manage Email' }
    },
    {
        name: 'manage-password',
        path: '/manage/password',
        component: () => import('@/pages/ManagePasswordPage.vue'),
        beforeEnter: authenticationGuard,
        meta: { layout: layouts.main, title: 'Manage Password' }
    },
    {
        name: 'em-page',
        path: '/em/:route',
        component: () => import('@/pages/EmPage.vue'),
        beforeEnter: authenticationGuard,
        meta: { layout: layouts.main, title: 'EmPage' }
    },
    {
        name: 'not-found',
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/NotFoundPage.vue'),
        meta: { layout: layouts.base, title: 'Page Not Found' }
    },
]

export default routes;
