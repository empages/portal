export abstract class PaginatedList<Type> {
    items: Array<Type>;
    allItemsCount: number;
    itemsCount: number;
    pagesCount: number;
    pageSize: number;
    currentPage: number;
    startRow: number;
}
