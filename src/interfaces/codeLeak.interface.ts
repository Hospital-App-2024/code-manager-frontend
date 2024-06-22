export interface ResponseCodeLeak {
  data: CodeLeak[];
  meta: Meta;
}

export interface CodeLeak {
  id: string;
  activeBy: string;
  createdAt: string;
  location: string;
  operator: Operator;
  patientDescription: string;
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
