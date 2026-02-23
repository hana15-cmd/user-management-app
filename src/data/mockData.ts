import { faker } from "@faker-js/faker";
import type { User, AuthUser } from "../types";

export const mockAuthUsers: AuthUser[] = [
  { id: 1, name: "Admin User", role: "admin" },
  { id: 2, name: "Viewer User", role: "viewer" },
];

export const generateDummyUsers = (): User[] => {
  return Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: faker.helpers.arrayElement(["admin", "viewer"]) as "admin" | "viewer",
    status: faker.helpers.arrayElement(["Active", "Inactive"]) as "Active" | "Inactive",
    createdAt: faker.date.past({ years: 2 }).toISOString().split('T')[0],
  }));
};
