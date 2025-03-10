export type BaseResponseType<T = any> = {
  messages: string[];
  statusCode: number;
  isSuccess: boolean;
  data: T;
};

export type ListResponseType<T> = {
  data: T[];
  meta: MetaType;
};

export type ResultType<T = any> = {
  type: 'success' | 'error';
  result: BaseResponseType<T>;
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

export type ActionType =
  | 'add'
  | 'edit'
  | 'delete'
  | 'updatePrice'
  | 'approve'
  | 'search'
  | 'update-status'
  | 'update-password'
  | 'reset-password'
  | '';

export type ExportExcelType = 'page' | 'all';
