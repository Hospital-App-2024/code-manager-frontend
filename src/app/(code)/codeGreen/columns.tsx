import { CodeGreen } from "@/interfaces/codeGreen.interface";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<CodeGreen>[] = [
  {
    accessorKey: "createdAt",
    header: "Fecha",
  },
  {
    accessorKey: "operator",
    header: "Operador",
  },
  {
    accessorKey: "activeBy",
    header: "Activo por",
  },
  {
    accessorKey: "location",
    header: "Ubicación",
  },
  {
    accessorKey: "event",
    header: "Evento",
  },
];
