export interface ResponseUser {
  data: User[];
  meta: Meta;
}

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  role: string;
  isActive: boolean;
}

export interface Meta {
  totalPages: number;
  currentPage: number;
  nextPage: null;
  prevPage: null;
}
