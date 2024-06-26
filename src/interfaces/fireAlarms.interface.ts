export interface INodo {
  id: string;
  nodo: number;
  building: string;
}

export interface ITypeDevice {
  id: string;
  type: string;
}

export interface ResponseDevice {
  data: IDevice[];
  meta: Meta;
}

export interface IDevice {
  id: string;
  lazo: string;
  location: string;
  device: string;
  operative: boolean;
  observations: null;
  nodo: string;
  typeDevice: string;
}

export interface Meta {
  totalPages: number;
  currentPage: number;
  nextPage: null;
  prevPage: null;
}
