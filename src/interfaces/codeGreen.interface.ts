export interface ResponseCodeGreen {
    data: CodeGreen[];
    meta: Meta;
}
export interface CodeGreen {
  activeBy: string;
  createdAt: Date;
  location: string;
  event: string;
  operator: string;
}

export interface Meta {
    total:    number;
    page:     number;
    lastPage: number;
    nextPage: null;
    prevPage: null;
}
