export interface ResponseAuth {
    user:  User;
    token: string;
}

export interface User {
    id:        string;
    email:     string;
    name:      string;
    createdAt: Date;
    updatedAt: Date;
    role:      string;
    isActive:  boolean;
}