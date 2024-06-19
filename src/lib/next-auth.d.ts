import NextAuth from 'next-auth/next';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
    interface Session {
      user: User;
      token: string;
      refreshToken: string;
      expiresIn: number;
    }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
    token: string;
    refreshToken: string;
    expiresIn: number;
  }
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
