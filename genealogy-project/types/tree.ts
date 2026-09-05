import { PersonStatus, Gender } from "@prisma/client";

export interface PersonNode {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  gender: Gender;
  status: PersonStatus;
  fatherId: string | null;
  branchId: string | null;
  birthDate: Date | null;
  deathDate: Date | null;
}

export interface LayoutNode extends PersonNode {
  x: number;
  y: number;
  width: number;
  height: number;
  depth: number;
}

export interface TreeLayoutOptions {
  width?: number;
  height?: number;
}