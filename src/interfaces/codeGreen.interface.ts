export interface ResponseCodeGreen {
    data: CodeGreen[];
    meta: Meta;
}
export interface CodeGreen {
  id: string;
  activeBy: string;
  createdAt: Date;
  location: string;
  event: string;
  operator: string;
  police: boolean;
}

export interface Meta {
    total:    number;
    page:     number;
    lastPage: number;
    nextPage: null;
    prevPage: null;
}
