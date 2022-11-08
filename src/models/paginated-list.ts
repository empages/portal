export abstract class PaginatedList<T> {
    items: Array<T>;
    allItemsCount: number;
    itemsCount: number;
    pagesCount: number;
    pageSize: number;
    currentPage: number;
    startRow: number;
}
