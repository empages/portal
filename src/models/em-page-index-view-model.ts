import {EmPageViewModel} from "@/models/em-page-view-model";
import {EmPageTableViewModel} from "@/models/em-page-table-view-model";
import {EmPageCustomViewModel} from "@/models/em-page-custom-view-model";

export class EmPageIndexViewModel extends EmPageViewModel {
    tableViewModel: EmPageTableViewModel;
    customViewModel: EmPageCustomViewModel;
}
