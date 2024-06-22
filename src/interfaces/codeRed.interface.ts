export interface ResponseCodeRed {
  data: CodeRed[];
  meta: Meta;
}

export interface CodeRed {
  id: string;
  activeBy: string;
  createdAt: string;
  location: string;
  operator: string;
  COGRID: string;
  firefighterCalledTime: string;
}

export interface Meta {
  totalPages: number;
  currentPage: number;
  nextPage: null;
  prevPage: null;
}
