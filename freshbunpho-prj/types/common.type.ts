export type BaseResponseType<T> = {
  status: boolean;
  message: string;
  statusCode: number;
  data: T;
};

export type ListResponseType<T> = {
  data: T[];
  meta: MetaType;
};

export type MetaType = {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type CommonType = {
  createdBy: string;
  createdDate: string;
  updatedBy: string;
  updatedDate: string;
};