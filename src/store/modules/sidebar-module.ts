import {SidebarSchema} from "@/models/sidebar-schema";
import {SidebarMenuSection} from "@/models/sidebar-menu-section";
import {SidebarMenuLink} from "@/models/sidebar-menu-link";
import {normalizeRoute} from "@/shared/helpers";
import {ActionContext} from "vuex";
import {MainState} from "@/store";
import adminService from "@/services/admin-service";

interface SidebarModuleState {
    sidebarSchema: SidebarSchema | null;
}

export default {
    namespaced: true,
    state(): SidebarModuleState {
        return {
            sidebarSchema: null
        }
    },
    getters: {
        sidebarSchema(state: SidebarModuleState): SidebarSchema | null {
            return state.sidebarSchema;
        }
    },
    mutations: {
        reloadSidebarSchema(state: SidebarModuleState, currentRoute: string): void {
            if (state.sidebarSchema) {
                reloadSchemaState(state.sidebarSchema, currentRoute);
            }
        },
        setSidebarSchema(state: SidebarModuleState, schema: SidebarSchema): void {
            state.sidebarSchema = schema;
        }
    },
    actions: {
        async loadSidebarSchema(context: ActionContext<SidebarModuleState, MainState>) {
            const sidebarSchema = await adminService.getAdminMenus();
            context.commit('setSidebarSchema', sidebarSchema);
        }
    }
}

function reloadSchemaState(sidebarSchema: SidebarSchema, currentRoute: string): void {
    if (sidebarSchema && sidebarSchema?.sections && sidebarSchema?.sections.length) {
        // eslint-disable-next-line no-unsafe-optional-chaining
        for (const menu of sidebarSchema?.sections) {
            reloadSectionState(menu, currentRoute);
        }
    }
}

function reloadSectionState(section: SidebarMenuSection, currentRoute: string): void {
    if (section.children && section.children.length) {
        for (const childLink of section.children) {
            reloadLinkState(childLink, currentRoute);
        }

        if (section.children.length > 1) {
            section.isDropdown = true;
        }

        section.isActive = section.children.some(x => x.isActive);
    }
}

function reloadLinkState(link: SidebarMenuLink, currentRoute: string): void {
    if (link.routes && link.routes.length) {
        link.routes = link.routes.map(x => normalizeRoute(x));
        const normalizedCurrentRoute = normalizeRoute(currentRoute);
        link.isActive = link.routes.includes(normalizedCurrentRoute);
        if (!link.isActive) {
            for (const route of link.routes) {
                const normalizedRoute = normalizeRoute(route);
                if (normalizedRoute.endsWith('{*}') &&
                    normalizedCurrentRoute.startsWith(normalizedRoute.substr(0, normalizedRoute.length - 3))) {
                    link.isActive = true;
                    break;
                }
            }
        }
    }
}
