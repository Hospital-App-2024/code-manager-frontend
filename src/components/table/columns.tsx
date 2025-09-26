import { ColumnDef } from "@tanstack/react-table";
import { CodeBlue } from "@/interfaces/codeBlue.interface";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { EllipsisIcon, EllipsisVerticalIcon, EyeIcon, SquarePenIcon } from "lucide-react";

export const codeBlueColumns: ColumnDef<CodeBlue>[] = [
  {
    accessorKey: "team",
    header: "Equipo",
  },
  {
    accessorKey: "location",
    header: "Ubicación",
    cell: ({ row }) => {
      return <div className="text-wrap">{row.original.location}</div>;
    },
  },
  {
    accessorKey: "activeBy",
    header: "Activado por",
  },
  {
    accessorKey: "operator",
    header: "Operador",
  },
  {
    accessorKey: "createdAt",
    header: "Fecha de creación",
    cell: ({ row }) => {
      return <div>{new Date(row.original.createdAt).toLocaleString()}</div>;
    },
  },
  {
    accessorKey: "Acciones",
    header: "Acciones",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
                <EllipsisVerticalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem><SquarePenIcon /> Editar</DropdownMenuItem>
            <DropdownMenuItem><EyeIcon />Ver</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
