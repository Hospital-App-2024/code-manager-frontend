export interface ResponseOperator {
  data: Operator[];
  meta: Meta;
}

export interface Operator {
  id: string;
  name: string;
}

export interface Meta {
  totalPages: number;
  currentPage: number;
  nextPage: null;
  prevPage: null;
}
