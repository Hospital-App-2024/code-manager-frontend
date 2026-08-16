export type CodeType = "GREEN" | "BLUE" | "AIR" | "RED" | "LEAK";

export interface ResponseEmergencyCode {
  data: EmergencyCode[];
  meta: Meta;
}

export interface EmergencyCode {
  id: string;
  type: CodeType;
  activeBy: string;
  createdAt: string; // The @default(now()) from db
  activationTime: string; // The manual date sent by operator
  location: string;
  operatorId: string;
  observations?: string | null;
  operator: Operator;

  // Code Green Fields
  event?: string | null;
  police?: boolean | null;
  isClosed?: boolean | null;
  closedBy?: string | null;
  closedAt?: string | null;

  // Code Blue Fields
  team?: string | null;

  // Code Air Fields
  emergencyDetail?: string | null;

  // Code Red Fields
  COGRID?: boolean | null;
  firefighterCalledTime?: string | null;

  // Code Leak Fields
  patientName?: string | null;
  patientDescription?: string | null;
}

export interface Operator {
  id: string;
  name: string;
}

export interface Meta {
  lastPage: number;
  page: number;
  total: number;
}
