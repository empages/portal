import {ActionModel} from "@/models/action-model";
import {BreadcrumbModelItem} from "@/models/breadcrumb-model-item";

export class EmPageViewContext {
    route: string;
    title: string;
    navbarActions: Array<ActionModel>;
    breadcrumbs: Array<BreadcrumbModelItem>;
}
