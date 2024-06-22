export interface ResponseCodeBlue {
  data: CodeBlue[];
  meta: Meta;
}

export interface CodeBlue {
  activeBy: string;
  createdAt: string;
  id: string;
  location: string;
  operator: string;
  team: string;
}

export interface Meta {
  totalPages: number;
  currentPage: number;
  nextPage: number;
  prevPage: null;
}
