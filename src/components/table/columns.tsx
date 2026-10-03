"use client";

import { ColumnDef } from "@tanstack/react-table";
import { 
  CheckCircle2, 
  Clock, 
  EllipsisVerticalIcon, 
  EyeIcon, 
  SquarePenIcon 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmergencyCodeForm } from "@/app/(code)/components/form/EmergencyCodeForm";
import { CloseCodeModal } from "@/app/(code)/components/modal/CloseCodeModal";
import { UserStatusToggle } from "@/app/admin/components/form/UserStatusToggle";

import { EmergencyCode } from "@/interfaces/emergencyCode.interface";
import { User } from "@/interfaces/user.interface";
import { Operator } from "@/interfaces/operator.interface";
import { formatBlueTeams, isCodeClosed } from "@/lib/emergency-code";

// Utility for formatting dates
const formatDate = (isoStr?: string | null) => {
  if (!isoStr) return "N/A";
  return new Date(isoStr).toLocaleString("es-CL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Helper to render the Action Cell
const ActionCell = ({
  row,
  codeType,
}: {
  row: any;
  codeType: "GREEN" | "BLUE" | "AIR" | "RED" | "LEAK";
}) => {
  const item = row.original as EmergencyCode;
  const isClosed = isCodeClosed(item);

  return (
    <div className="flex items-center gap-1.5 justify-end">
      {/* Solo los códigos verdes poseen ciclo de cierre. */}
      {!isClosed && codeType === "GREEN" && (
        <CloseCodeModal item={item} />
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost" className="h-8 w-8">
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
            <DialogContent className="sm:max-w-[480px]">
              <DialogHeader>
                <DialogTitle>Detalles del Código {codeType}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-3 py-3 text-sm">
                <div className="grid grid-cols-3 items-center gap-2 border-b pb-2">
                  <span className="font-semibold text-muted-foreground">ID:</span>
                  <span className="col-span-2 font-mono text-xs truncate">{item.id}</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-2 border-b pb-2">
                  <span className="font-semibold text-muted-foreground">Ubicación:</span>
                  <span className="col-span-2 font-medium">{item.location}</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-2 border-b pb-2">
                  <span className="font-semibold text-muted-foreground">Activado por:</span>
                  <span className="col-span-2">{item.activeBy || "N/A"}</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-2 border-b pb-2">
                  <span className="font-semibold text-muted-foreground">Operador:</span>
                  <span className="col-span-2">{item.operator?.name || "N/A"}</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-2 border-b pb-2">
                  <span className="font-semibold text-muted-foreground">Hora Activación:</span>
                  <span className="col-span-2">{formatDate(item.activationTime)}</span>
                </div>

                {/* Specific Fields */}
                {codeType === "GREEN" && (
                  <>
                    <div className="grid grid-cols-3 items-center gap-2 border-b pb-2">
                      <span className="font-semibold text-muted-foreground">Evento:</span>
                      <span className="col-span-2">{item.event || "N/A"}</span>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-2 border-b pb-2">
                      <span className="font-semibold text-muted-foreground">Carabineros:</span>
                      <span className="col-span-2">{item.police ? "Sí" : "No"}</span>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-2 border-b pb-2">
                      <span className="font-semibold text-muted-foreground">Estado:</span>
                      <span className="col-span-2">
                        {isClosed
                          ? `Finalizado por ${item.closedBy || "Anónimo"} (${formatDate(item.closedAt)})`
                          : "En curso / Activo"}
                      </span>
                    </div>
                    {isClosed && (
                      <div className="grid grid-cols-3 items-center gap-2 border-b pb-2">
                        <span className="font-semibold text-muted-foreground">Cierre registrado por:</span>
                        <span className="col-span-2">{item.closedByOperator?.name || "N/A"}</span>
                      </div>
                    )}
                  </>
                )}

                {codeType === "BLUE" && (
                  <div className="grid grid-cols-3 items-center gap-2 border-b pb-2">
                    <span className="font-semibold text-muted-foreground">Equipos Médicos:</span>
                    <span className="col-span-2">{formatBlueTeams(item.teams)}</span>
                  </div>
                )}

                {codeType === "AIR" && (
                  <div className="grid grid-cols-3 items-center gap-2 border-b pb-2">
                    <span className="font-semibold text-muted-foreground">Detalle Emergencia:</span>
                    <span className="col-span-2">{item.emergencyDetail || "N/A"}</span>
                  </div>
                )}

                {codeType === "RED" && (
                  <>
                    <div className="grid grid-cols-3 items-center gap-2 border-b pb-2">
                      <span className="font-semibold text-muted-foreground">COGRID:</span>
                      <span className="col-span-2">{item.cogridNotified ? "Sí" : "No"}</span>
                    </div>
                    {item.cogridNotified && (
                      <div className="grid grid-cols-3 items-center gap-2 border-b pb-2">
                        <span className="font-semibold text-muted-foreground">Hora COGRID:</span>
                        <span className="col-span-2">{formatDate(item.cogridNotifiedAt)}</span>
                      </div>
                    )}
                    <div className="grid grid-cols-3 items-center gap-2 border-b pb-2">
                      <span className="font-semibold text-muted-foreground">Bomberos:</span>
                      <span className="col-span-2">
                        {item.firefighterCalledTime ? formatDate(item.firefighterCalledTime) : "N/A"}
                      </span>
                    </div>
                  </>
                )}

                {codeType === "LEAK" && (
                  <>
                    <div className="grid grid-cols-3 items-center gap-2 border-b pb-2">
                      <span className="font-semibold text-muted-foreground">Paciente:</span>
                      <span className="col-span-2">{item.patientName || "N/A"}</span>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-2 border-b pb-2">
                      <span className="font-semibold text-muted-foreground">Descripción:</span>
                      <span className="col-span-2">{item.patientDescription || "N/A"}</span>
                    </div>
                  </>
                )}

                {item.observations && (
                  <div className="grid grid-cols-3 items-start gap-2 pt-1">
                    <span className="font-semibold text-muted-foreground">Observaciones:</span>
                    <span className="col-span-2 text-muted-foreground italic">
                      {item.observations}
                    </span>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>

          {/* EDIT */}
          <Dialog>
            <DialogTrigger asChild>
              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                disabled={isClosed}
              >
                <SquarePenIcon className="mr-2 h-4 w-4" /> Editar
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Editar Código de Emergencia</DialogTitle>
                <DialogDescription>
                  Modifique los parámetros del evento seleccionado.
                </DialogDescription>
              </DialogHeader>
              <EmergencyCodeForm type={codeType} initialData={item} />
            </DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const codeBlueColumns: ColumnDef<EmergencyCode>[] = [
  {
    accessorKey: "activationTime",
    header: "Hora Activación",
    cell: ({ row }) => (
      <span className="font-medium text-xs md:text-sm">
        {formatDate(row.original.activationTime)}
      </span>
    ),
  },
  {
    accessorKey: "teams",
    header: "Equipos de Reanimación",
    cell: ({ row }) => <span>{formatBlueTeams(row.original.teams)}</span>,
  },
  {
    accessorKey: "location",
    header: "Ubicación",
    cell: ({ row }) => <div className="text-wrap">{row.original.location}</div>,
  },
  {
    accessorKey: "activeBy",
    header: "Activado por",
  },
  {
    accessorKey: "Acciones",
    header: () => <div className="text-right">Acciones</div>,
    cell: ({ row }) => <ActionCell row={row} codeType="BLUE" />,
  },
];

export const codeGreenColumns: ColumnDef<EmergencyCode>[] = [
  {
    accessorKey: "activationTime",
    header: "Hora Activación",
    cell: ({ row }) => (
      <span className="font-medium text-xs md:text-sm">
        {formatDate(row.original.activationTime)}
      </span>
    ),
  },
  { accessorKey: "location", header: "Ubicación" },
  { accessorKey: "event", header: "Evento" },
  {
    accessorKey: "police",
    header: "Carabineros",
    cell: ({ row }) => (
      <span
        className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
          row.original.police
            ? "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {row.original.police ? "Sí" : "No"}
      </span>
    ),
  },
  {
    accessorKey: "closedAt",
    header: "Estado",
    cell: ({ row }) => {
      const isClosed = isCodeClosed(row.original);
      return (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
            isClosed
              ? "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
              : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 animate-pulse"
          }`}
        >
          {isClosed ? (
            <>
              <CheckCircle2 className="w-3 h-3 text-slate-500" />
              Finalizado
            </>
          ) : (
            <>
              <Clock className="w-3 h-3 text-emerald-600" />
              En curso
            </>
          )}
        </span>
      );
    },
  },
  {
    accessorKey: "Acciones",
    header: () => <div className="text-right">Acciones</div>,
    cell: ({ row }) => <ActionCell row={row} codeType="GREEN" />,
  },
];

export const codeRedColumns: ColumnDef<EmergencyCode>[] = [
  {
    accessorKey: "activationTime",
    header: "Hora Activación",
    cell: ({ row }) => (
      <span className="font-medium text-xs md:text-sm">
        {formatDate(row.original.activationTime)}
      </span>
    ),
  },
  {
    accessorKey: "cogridNotified",
    header: "COGRID",
    cell: ({ row }) => (
      <div className="flex flex-col items-start gap-1">
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
            row.original.cogridNotified
              ? "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {row.original.cogridNotified ? "Sí" : "No"}
        </span>
        {row.original.cogridNotified && row.original.cogridNotifiedAt && (
          <span className="text-xs text-muted-foreground">
            {formatDate(row.original.cogridNotifiedAt)}
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "firefighterCalledTime",
    header: "Llamado Bomberos",
    cell: ({ row }) => (
      <span className="text-xs">
        {formatDate(row.original.firefighterCalledTime)}
      </span>
    ),
  },
  {
    accessorKey: "location",
    header: "Ubicación",
    cell: ({ row }) => <div className="text-wrap">{row.original.location}</div>,
  },
  {
    accessorKey: "Acciones",
    header: () => <div className="text-right">Acciones</div>,
    cell: ({ row }) => <ActionCell row={row} codeType="RED" />,
  },
];

export const codeAirColumns: ColumnDef<EmergencyCode>[] = [
  {
    accessorKey: "activationTime",
    header: "Hora Activación",
    cell: ({ row }) => (
      <span className="font-medium text-xs md:text-sm">
        {formatDate(row.original.activationTime)}
      </span>
    ),
  },
  {
    accessorKey: "location",
    header: "Ubicación",
    cell: ({ row }) => <div className="text-wrap">{row.original.location}</div>,
  },
  {
    accessorKey: "emergencyDetail",
    header: "Detalle Emergencia",
    cell: ({ row }) => (
      <div className="text-wrap max-w-xs">{row.original.emergencyDetail || "N/A"}</div>
    ),
  },
  {
    accessorKey: "activeBy",
    header: "Activado por",
  },
  {
    accessorKey: "Acciones",
    header: () => <div className="text-right">Acciones</div>,
    cell: ({ row }) => <ActionCell row={row} codeType="AIR" />,
  },
];

export const codeLeakColumns: ColumnDef<EmergencyCode>[] = [
  {
    accessorKey: "activationTime",
    header: "Hora Activación",
    cell: ({ row }) => (
      <span className="font-medium text-xs md:text-sm">
        {formatDate(row.original.activationTime)}
      </span>
    ),
  },
  {
    accessorKey: "patientName",
    header: "Paciente",
    cell: ({ row }) => <span>{row.original.patientName || "N/A"}</span>,
  },
  {
    accessorKey: "location",
    header: "Ubicación",
    cell: ({ row }) => <div className="text-wrap">{row.original.location}</div>,
  },
  {
    accessorKey: "patientDescription",
    header: "Descripción",
    cell: ({ row }) => (
      <div className="text-wrap max-w-xs">{row.original.patientDescription || "N/A"}</div>
    ),
  },
  {
    accessorKey: "Acciones",
    header: () => <div className="text-right">Acciones</div>,
    cell: ({ row }) => <ActionCell row={row} codeType="LEAK" />,
  },
];

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "createdAt",
    header: "Fecha Creación",
    cell: ({ row }) => <div>{formatDate(String(row.original.createdAt))}</div>,
  },
  { accessorKey: "name", header: "Nombre" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Rol" },
  {
    accessorKey: "isActive",
    header: "Activo",
    cell: ({ row }) => (
      <UserStatusToggle value={row.original.isActive} userId={row.original.id} />
    ),
  },
];

export const operatorColumns: ColumnDef<Operator>[] = [
  { accessorKey: "id", header: "ID", cell: ({ row }) => <span className="font-mono text-xs">{row.original.id}</span> },
  { accessorKey: "name", header: "Nombre Operador" },
];
