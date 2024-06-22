export interface ResponseCodeAir {
  data: CodeAir[];
  meta: Meta;
}

export interface CodeAir {
  activeBy: string;
  createdAt: string;
  id: string;
  location: string;
  operator: string;
  emergencyDetail: string;
}

export interface Meta {
  totalPages: number;
  currentPage: number;
  nextPage: null;
  prevPage: null;
}
