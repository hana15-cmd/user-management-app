export type UserRole = "admin" | "viewer";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: "Active" | "Inactive";
  createdAt: string;
}

export interface AuthUser {
  id: number;
  name: string;
  role: UserRole;
}