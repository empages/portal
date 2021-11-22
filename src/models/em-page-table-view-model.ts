import {EmPageTableHeadModel} from "@/models/em-page-table-head-model";
import {ActionModel} from "@/models/action-model";
import {EmPageTableRowModel} from "@/models/em-page-table-row-model";
import {PaginationModel} from "@/models/pagination-model";
import {EmPageViewModel} from "@/models/em-page-view-model";

export class EmPageTableViewModel extends EmPageViewModel {
    headModel: EmPageTableHeadModel;
    hasActions: boolean;
    rowActions: Array<ActionModel>;
    rows: Array<EmPageTableRowModel>;
    paginationModel: PaginationModel;
}
