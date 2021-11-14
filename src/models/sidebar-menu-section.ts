import {SidebarMenuLink} from "@/models/sidebar-menu-link";

export class SidebarMenuSection {
    title: string;
    icon: string;
    isDropdown: boolean;
    isSingle: boolean;
    isActive: boolean;
    children: Array<SidebarMenuLink>;
    singleLink: SidebarMenuLink | null;
}
