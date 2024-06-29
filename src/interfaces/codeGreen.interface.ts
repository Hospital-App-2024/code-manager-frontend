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
