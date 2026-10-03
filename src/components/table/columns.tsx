"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { 
  CheckCircle2, 
  Clock, 
  EllipsisVerticalIcon, 
  EyeIcon, 
  Lock,
  SquarePenIcon 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { cn } from "@/lib/utils";

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

// Los textos libres se recortan a 2 líneas para no ensanchar ni alargar la tabla;
// el texto completo se ve en "Ver detalles".
const TruncatedText = ({ children }: { children?: React.ReactNode }) => (
  <div className="max-w-xs whitespace-normal break-words line-clamp-2">
    {children || "N/A"}
  </div>
);

const DetailRow = ({
  label,
  children,
  valueClassName,
}: {
  label: string;
  children: React.ReactNode;
  valueClassName?: string;
}) => (
  <div className="grid grid-cols-3 items-start gap-2 border-b pb-2">
    <span className="font-semibold text-muted-foreground">{label}</span>
    <span className={cn("col-span-2 break-words", valueClassName)}>{children}</span>
  </div>
);

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
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [closeOpen, setCloseOpen] = useState(false);
  // Solo los códigos verdes poseen ciclo de cierre.
  const canClose = codeType === "GREEN" && !isClosed;

  return (
    <div className="flex items-center gap-1.5 justify-end">
      {/* Los diálogos viven fuera del menú: al elegir una acción el menú se cierra
          y el diálogo se abre controlado por estado. */}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost" className="h-8 w-8" aria-label="Acciones">
            <EllipsisVerticalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setDetailsOpen(true)}>
            <EyeIcon className="mr-2 h-4 w-4" /> Ver detalles
          </DropdownMenuItem>
          <DropdownMenuItem disabled={isClosed} onSelect={() => setEditOpen(true)}>
            <SquarePenIcon className="mr-2 h-4 w-4" /> Editar
          </DropdownMenuItem>
          {canClose && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => setCloseOpen(true)}
                className="text-amber-600 focus:text-amber-600 dark:text-amber-500"
              >
                <Lock className="mr-2 h-4 w-4 text-amber-600" /> Finalizar
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {canClose && (
        <CloseCodeModal item={item} open={closeOpen} onOpenChange={setCloseOpen} />
      )}

      {/* VIEW DETAILS */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-[480px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalles del Código {codeType}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 py-3 text-sm">
            <DetailRow label="ID:" valueClassName="font-mono text-xs truncate">
              {item.id}
            </DetailRow>
            <DetailRow label="Ubicación:" valueClassName="font-medium">
              {item.location}
            </DetailRow>
            <DetailRow label="Activado por:">{item.activeBy || "N/A"}</DetailRow>
            <DetailRow label="Operador:">{item.operator?.name || "N/A"}</DetailRow>
            <DetailRow label="Hora Activación:">{formatDate(item.activationTime)}</DetailRow>

            {/* Specific Fields */}
            {codeType === "GREEN" && (
              <>
                <DetailRow label="Evento:">{item.event || "N/A"}</DetailRow>
                <DetailRow label="Carabineros:">{item.police ? "Sí" : "No"}</DetailRow>
                <DetailRow label="Estado:">
                  {isClosed
                    ? `Finalizado por ${item.closedBy || "Anónimo"} (${formatDate(item.closedAt)})`
                    : "En curso / Activo"}
                </DetailRow>
                {isClosed && (
                  <DetailRow label="Cierre registrado por:">
                    {item.closedByOperator?.name || "N/A"}
                  </DetailRow>
                )}
              </>
            )}

            {codeType === "BLUE" && (
              <DetailRow label="Equipos Médicos:">{formatBlueTeams(item.teams)}</DetailRow>
            )}

            {codeType === "AIR" && (
              <DetailRow label="Detalle Emergencia:">{item.emergencyDetail || "N/A"}</DetailRow>
            )}

            {codeType === "RED" && (
              <>
                <DetailRow label="COGRID:">{item.cogridNotified ? "Sí" : "No"}</DetailRow>
                {item.cogridNotified && (
                  <DetailRow label="Hora COGRID:">{formatDate(item.cogridNotifiedAt)}</DetailRow>
                )}
                <DetailRow label="Bomberos:">
                  {item.firefighterCalledTime ? formatDate(item.firefighterCalledTime) : "N/A"}
                </DetailRow>
              </>
            )}

            {codeType === "LEAK" && (
              <>
                <DetailRow label="Paciente:">{item.patientName || "N/A"}</DetailRow>
                <DetailRow label="Descripción:">{item.patientDescription || "N/A"}</DetailRow>
              </>
            )}

            {item.observations && (
              <div className="grid grid-cols-3 items-start gap-2 pt-1">
                <span className="font-semibold text-muted-foreground">Observaciones:</span>
                <span className="col-span-2 break-words text-muted-foreground italic">
                  {item.observations}
                </span>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* EDIT */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Código de Emergencia</DialogTitle>
            <DialogDescription>
              Modifique los parámetros del evento seleccionado.
            </DialogDescription>
          </DialogHeader>
          <EmergencyCodeForm
            type={codeType}
            initialData={item}
            onSuccess={() => setEditOpen(false)}
          />
        </DialogContent>
      </Dialog>
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
    cell: ({ row }) => <TruncatedText>{row.original.location}</TruncatedText>,
  },
  {
    accessorKey: "activeBy",
    header: "Activado por",
    cell: ({ row }) => <TruncatedText>{row.original.activeBy}</TruncatedText>,
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
  {
    accessorKey: "location",
    header: "Ubicación",
    cell: ({ row }) => <TruncatedText>{row.original.location}</TruncatedText>,
  },
  {
    accessorKey: "event",
    header: "Evento",
    cell: ({ row }) => <TruncatedText>{row.original.event}</TruncatedText>,
  },
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
    cell: ({ row }) => <TruncatedText>{row.original.location}</TruncatedText>,
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
    cell: ({ row }) => <TruncatedText>{row.original.location}</TruncatedText>,
  },
  {
    accessorKey: "emergencyDetail",
    header: "Detalle Emergencia",
    cell: ({ row }) => (
      <TruncatedText>{row.original.emergencyDetail}</TruncatedText>
    ),
  },
  {
    accessorKey: "activeBy",
    header: "Activado por",
    cell: ({ row }) => <TruncatedText>{row.original.activeBy}</TruncatedText>,
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
    cell: ({ row }) => <TruncatedText>{row.original.patientName}</TruncatedText>,
  },
  {
    accessorKey: "location",
    header: "Ubicación",
    cell: ({ row }) => <TruncatedText>{row.original.location}</TruncatedText>,
  },
  {
    accessorKey: "patientDescription",
    header: "Descripción",
    cell: ({ row }) => (
      <TruncatedText>{row.original.patientDescription}</TruncatedText>
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
