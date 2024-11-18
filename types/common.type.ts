export type BaseResponseType<T = any> = {
  status: boolean;
  message: string;
  statusCode: number;
  data: T;
};

export type ListResponseType<T> = {
  data: T[];
  meta: MetaType;
};

export type ErrorResponseType = {
  data: any;
  message: string;
  code: number;
};

export type ResultType<T = any> = {
  type: 'success' | 'error';
  result: T;
};

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

export type MetaType = {
  page: number;
  take: number;
  itemCount?: number;
  pageCount?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
};

export type CommonType = {
  createdBy: string;
  createdDate: string;
  updatedBy: string;
  updatedDate: string;
};

export type CommonCodeType = {
  code: string;
  name: string;
  isActive: boolean;
};
