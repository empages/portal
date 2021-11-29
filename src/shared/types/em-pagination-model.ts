export interface EmPaginationModel {
    currentPage: number;
    nextPage: number | null;
    previousPage: number | null;
    nextPagesCount: number;
    previousPagesCount: number;
}
