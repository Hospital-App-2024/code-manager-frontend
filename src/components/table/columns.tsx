"use client";
import { ColumnDef } from "@tanstack/react-table";
import { EmergencyCode } from "@/interfaces/emergencyCode.interface";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { EllipsisVerticalIcon, EyeIcon, SquarePenIcon } from "lucide-react";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { MdOutlineModeEdit } from "react-icons/md";
import { EmergencyCodeForm } from "@/app/(code)/components/form/EmergencyCodeForm";
import { UserStatusToggle } from "@/app/admin/components/form/UserStatusToggle";
import { User } from "@/interfaces/user.interface";
import { Operator } from "@/interfaces/operator.interface";

// Utility for formatting dates if needed
const formatDate = (isoStr: string) => new Date(isoStr).toLocaleString();

// Helper to render the Action Cell
const ActionCell = ({ row, codeType }: { row: any; codeType: "GREEN" | "BLUE" | "AIR" | "RED" | "LEAK" }) => {
  const item = row.original as EmergencyCode;
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <EllipsisVerticalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* VIEW DETAILS */}
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <EyeIcon className="mr-2 h-4 w-4" /> Ver detalles
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Detalles del Código {codeType}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4 border-b pb-2">
                <span className="font-bold text-sm">ID:</span>
                <span className="col-span-3 text-sm font-mono truncate">{item.id}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4 border-b pb-2">
                <span className="font-bold text-sm">Ubicación:</span>
                <span className="col-span-3 text-sm">{item.location}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4 border-b pb-2">
                <span className="font-bold text-sm">Activado por:</span>
                <span className="col-span-3 text-sm">{item.activeBy || 'N/A'}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4 border-b pb-2">
                <span className="font-bold text-sm">Operador:</span>
                <span className="col-span-3 text-sm">{item.operator?.name || 'N/A'}</span>
              </div>
              
              {/* Type specific details */}
              {codeType === "GREEN" && (
                <>
                  <div className="grid grid-cols-4 items-center gap-4 border-b pb-2">
                    <span className="font-bold text-sm">Evento:</span>
                    <span className="col-span-3 text-sm">{item.event}</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 border-b pb-2">
                    <span className="font-bold text-sm">Carabineros:</span>
                    <span className="col-span-3 text-sm">{item.police ? "Sí" : "No"}</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 border-b pb-2">
                    <span className="font-bold text-sm">Estado:</span>
                    <span className="col-span-3 text-sm">{item.isClosed ? `Cerrado por ${item.closedBy}` : 'Abierto'}</span>
                  </div>
                </>
              )}
              {codeType === "BLUE" && (
                <div className="grid grid-cols-4 items-center gap-4 border-b pb-2">
                  <span className="font-bold text-sm">Equipo:</span>
                  <span className="col-span-3 text-sm">{item.team}</span>
                </div>
              )}
              {codeType === "AIR" && (
                <div className="grid grid-cols-4 items-center gap-4 border-b pb-2">
                  <span className="font-bold text-sm">Emergencia:</span>
                  <span className="col-span-3 text-sm">{item.emergencyDetail}</span>
                </div>
              )}
              {codeType === "RED" && (
                <>
                  <div className="grid grid-cols-4 items-center gap-4 border-b pb-2">
                    <span className="font-bold text-sm">COGRID:</span>
                    <span className="col-span-3 text-sm">{item.COGRID ? "Sí" : "No"}</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 border-b pb-2">
                    <span className="font-bold text-sm">Bomberos:</span>
                    <span className="col-span-3 text-sm">{item.firefighterCalledTime ? formatDate(item.firefighterCalledTime) : "N/A"}</span>
                  </div>
                </>
              )}
              {codeType === "LEAK" && (
                <>
                  <div className="grid grid-cols-4 items-center gap-4 border-b pb-2">
                    <span className="font-bold text-sm">Paciente:</span>
                    <span className="col-span-3 text-sm">{item.patientName || "N/A"}</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 border-b pb-2">
                    <span className="font-bold text-sm">Descripción:</span>
                    <span className="col-span-3 text-sm">{item.patientDescription}</span>
                  </div>
                </>
              )}


              <div className="grid grid-cols-4 items-center gap-4 border-b pb-2">
                <span className="font-bold text-sm">Hora Activación:</span>
                <span className="col-span-3 text-sm">{formatDate(item.activationTime)}</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* EDIT */}
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()} disabled={item.isClosed || false}>
              <MdOutlineModeEdit className="mr-2 h-4 w-4" /> Editar
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Editar Código</DialogTitle>
              <DialogDescription>Modifique los datos del código de emergencia</DialogDescription>
            </DialogHeader>
            <EmergencyCodeForm type={codeType} initialData={item} />
          </DialogContent>
        </Dialog>

      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const codeBlueColumns: ColumnDef<EmergencyCode>[] = [
  { accessorKey: "team", header: "Equipo" },
  { accessorKey: "location", header: "Ubicación", cell: ({ row }) => <div className="text-wrap">{row.original.location}</div> },
  { accessorKey: "activationTime", header: "Hora Activación", cell: ({ row }) => <div>{formatDate(row.original.activationTime)}</div> },
  { accessorKey: "Acciones", header: "Acciones", cell: ({ row }) => <ActionCell row={row} codeType="BLUE" /> },
];

export const codeGreenColumns: ColumnDef<EmergencyCode>[] = [
  { accessorKey: "activationTime", header: "Hora Activación", cell: ({ row }) => <div>{formatDate(row.original.activationTime)}</div> },
  { accessorKey: "location", header: "Ubicación" },
  { accessorKey: "event", header: "Evento" },
  { accessorKey: "Acciones", header: "Acciones", cell: ({ row }) => <ActionCell row={row} codeType="GREEN" /> },
];

export const codeRedColumns: ColumnDef<EmergencyCode>[] = [
  { accessorKey: "activationTime", header: "Hora Activación", cell: ({ row }) => <div>{formatDate(row.original.activationTime)}</div> },
  { accessorKey: "COGRID", header: "COGRID", cell: ({ row }) => <div>{row.original.COGRID ? "Sí" : "No"}</div> },
  { accessorKey: "location", header: "Ubicación", maxSize: 100, cell: ({ row }) => <div className="text-wrap">{row.original.location}</div> },
  { accessorKey: "Acciones", header: "Acciones", cell: ({ row }) => <ActionCell row={row} codeType="RED" /> },
];

export const codeAirColumns: ColumnDef<EmergencyCode>[] = [
  { accessorKey: "activationTime", header: "Hora Activación", cell: ({ row }) => <div>{formatDate(row.original.activationTime)}</div> },
  { accessorKey: "location", header: "Ubicación", cell: ({ row }) => <div className="text-wrap">{row.original.location}</div> },
  { accessorKey: "emergencyDetail", header: "Detalle", cell: ({ row }) => <div className="text-wrap">{row.original.emergencyDetail}</div> },
  { accessorKey: "Acciones", header: "Acciones", cell: ({ row }) => <ActionCell row={row} codeType="AIR" /> },
];

export const codeLeakColumns: ColumnDef<EmergencyCode>[] = [
  { accessorKey: "activationTime", header: "Hora Activación", cell: ({ row }) => <div>{formatDate(row.original.activationTime)}</div> },
  { accessorKey: "location", header: "Ubicación", maxSize: 100, cell: ({ row }) => <div className="text-wrap">{row.original.location}</div> },
  { accessorKey: "patientName", header: "Paciente" },
  { accessorKey: "patientDescription", header: "Descripción", cell: ({ row }) => <div className="text-wrap">{row.original.patientDescription}</div> },
  { accessorKey: "Acciones", header: "Acciones", cell: ({ row }) => <ActionCell row={row} codeType="LEAK" /> },
];

export const userColumns: ColumnDef<User>[] = [
  { accessorKey: "createdAt", header: "Fecha/Hora", cell: ({ row }) => <div>{String(row.original.createdAt)}</div> },
  { accessorKey: "name", header: "Nombre" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Rol" },
  { accessorKey: "isActive", header: "Activo", cell: ({ row }) => <UserStatusToggle value={row.original.isActive} userId={row.original.id} /> },
];

export const operatorColumns: ColumnDef<Operator>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Nombre" },
];
