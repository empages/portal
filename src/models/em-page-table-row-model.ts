import {EmPageTableCellModel} from "@/models/em-page-table-cell-model";
import {ActionModel} from "@/models/action-model";

export class EmPageTableRowModel {
    identifier: string;
    cells: Array<EmPageTableCellModel>;
    actions: Array<ActionModel>;
}
