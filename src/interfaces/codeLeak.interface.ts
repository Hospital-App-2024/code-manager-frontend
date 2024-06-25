export interface ResponseCodeLeak {
  data: CodeLeak[];
  meta: Meta;
}

export interface CodeLeak {
  id: string;
  activeBy: string;
  createdAt: string;
  location: string;
  operator: string;
  patientDescription: string;
}

export interface Meta {
  totalPages: number;
  currentPage: number;
  nextPage: null;
  prevPage: null;
}
