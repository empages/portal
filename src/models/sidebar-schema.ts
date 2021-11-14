import {SidebarMenuSection} from "@/models/sidebar-menu-section";
import {SidebarEssentialLink} from "@/models/sidebar-essential-link";

export class SidebarSchema {
    sections: Array<SidebarMenuSection>;
    essentialLinks: Array<SidebarEssentialLink>;
}
