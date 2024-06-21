export interface ResponseCodeBlue {
    data: CodeBlue[];
    meta: Meta;
}

export interface CodeBlue {
    id:        string;
    activeBy:  string;
    createdAt: string;
    location:  string;
    operator:  string;
    team:      string;
}

export interface Meta {
    total:    number;
    page:     number;
    lastPage: number;
    nextPage: null;
    prevPage: null;
}
