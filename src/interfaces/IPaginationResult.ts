interface IPaginationResultNoItems {
  totalCount: number,
  pageNumber: number,
  maxPageNumber: number,
  pageSize: number,
}

interface IPaginationResult<T> extends IPaginationResultNoItems {
  items: T[]
}

const defaultPaginationResultNoItems : IPaginationResultNoItems = {
  maxPageNumber: 1,
  pageNumber: 1,
  pageSize: 5,
  totalCount: 0,
}

export {
  defaultPaginationResultNoItems
}

export type {
  IPaginationResult,
  IPaginationResultNoItems
}