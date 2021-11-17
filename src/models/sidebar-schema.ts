import {SidebarMenuSection} from "@/models/sidebar-menu-section";
import {SidebarShortcutLink} from "@/models/sidebar-shortcut-link";

export class SidebarSchema {
    sections: Array<SidebarMenuSection>;
    shortcutsLinks: Array<SidebarShortcutLink>;
}
