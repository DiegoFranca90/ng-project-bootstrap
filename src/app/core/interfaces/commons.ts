export interface BaseEntity {
  id: number;
}

export interface Pagination<T> {
  data: Array<T>;
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  filters?: Array<{ name: string; field: string; values: { [key: string]: string } }>;
}
