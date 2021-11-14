import {LinkModel} from "@/models/link-model";

export class BreadcrumbModelItem extends LinkModel {
    order: number;
    isActive: boolean;
}
