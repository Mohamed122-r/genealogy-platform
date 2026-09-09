export type PersonStatus = "ALIVE" | "DECEASED" | "DISCONNECTED" | "UNKNOWN";
export type Gender = "MALE" | "FEMALE";

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
  horizontalSpacing?: number;
  verticalSpacing?: number;
}

export const STATUS_COLORS: Record<PersonStatus, string> = {
  ALIVE: "#228B22",
  DECEASED: "#8B4513",
  DISCONNECTED: "#696969",
  UNKNOWN: "#D3D3D3",
};

export const STATUS_LABELS: Record<PersonStatus, string> = {
  ALIVE: "حي",
  DECEASED: "متوفى",
  DISCONNECTED: "منقطع",
  UNKNOWN: "غير معروف",
};
