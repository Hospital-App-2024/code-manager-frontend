export interface ResponseCodeGreen {
  data: CodeGreen[];
  meta: Meta;
}

export interface CodeGreen {
  activeBy: string;
  createdAt: string;
  event: string;
  id: string;
  location: string;
  operator: string;
  police: string;
  isClosed: string;
  observations?: string;
  closedBy?: string;
  closedAt?: string;
}

export interface Meta {
  totalPages: number;
  currentPage: number;
  nextPage: null;
  prevPage: null;
}

export interface CodeGreenByID {
  id: string;
  activeBy: string;
  createdAt: Date;
  location: string;
  event: string;
  operatorId: string;
  police: boolean;
  observations: null;
  isClosed: boolean;
  closedBy: null | string;
  closedAt: null | Date;
  operator: Operator;
}

export interface Operator {
  id: string;
  name: string;
}
