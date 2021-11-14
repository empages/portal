export class PaginationModel {
    currentPage: number;
    nextPage: number | null;
    previousPage: number | null;
    nextPagesCount: number;
    previousPagesCount: number;
    previousPages: Array<number>;
    nextPages: Array<number>;
}
