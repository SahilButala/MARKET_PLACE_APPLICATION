class PaginationResponse<T = unknown> {
    currentPage?: number;
    totalPages?: number;
    totalCount?: number;
    data?: T;

    constructor(currentPage = 0, totalPages = 0, totalCount = 0, data?: T) {
        if (currentPage || totalCount || totalPages || data) {
            this.currentPage = currentPage;
            this.totalPages = totalPages;
            this.totalCount = totalCount;
            this.data = data;
        }
    }
}

export default PaginationResponse;