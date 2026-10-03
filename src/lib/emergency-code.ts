import { BlueTeam, EmergencyCode } from "@/interfaces/emergencyCode.interface";

// Orden canónico: es el mismo con que se guardan y se muestran los equipos.
export const BLUE_TEAMS: { value: BlueTeam; label: string }[] = [
  { value: "EMERGENCY", label: "Urgencia" },
  { value: "ICU", label: "UCI" },
  { value: "PEDIATRIC_ICU", label: "UCI Pediátrica" },
];

export const formatBlueTeams = (teams?: BlueTeam[] | null) => {
  const selected = BLUE_TEAMS.filter(({ value }) => teams?.includes(value));
  return selected.length ? selected.map(({ label }) => label).join(", ") : "N/A";
};

// Un código verde está abierto mientras no tenga fecha de cierre.
export const isCodeClosed = (code: Pick<EmergencyCode, "closedAt">) =>
  Boolean(code.closedAt);
