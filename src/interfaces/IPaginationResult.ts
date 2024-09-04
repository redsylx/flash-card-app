interface IPaginationResultNoItems {
  totalCount: number,
  pageNumber: number,
  maxPageNumber: number,
  pageSize: number,
  isChange: boolean,
}

interface IPaginationResult<T> extends IPaginationResultNoItems {
  items: T[]
}

const defaultPaginationResultNoItems : IPaginationResultNoItems = {
  maxPageNumber: 1,
  pageNumber: 1,
  pageSize: 10,
  totalCount: 0,
  isChange: false,
}

export {
  defaultPaginationResultNoItems
}

export type {
  IPaginationResult,
  IPaginationResultNoItems
}