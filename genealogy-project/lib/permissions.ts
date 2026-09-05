import { Role } from "@prisma/client";

export const canManagePeople = (role: Role) => {
  return ["SUPER_ADMIN", "ADMIN", "EDITOR"].includes(role);
};

export const canManageSystem = (role: Role) => {
  return ["SUPER_ADMIN", "ADMIN"].includes(role);
};