import { ColumnDef } from "@tanstack/react-table";
import { CodeBlue } from "@/interfaces/codeBlue.interface";
import { CodeGreen } from "@/interfaces/codeGreen.interface";
import { CodeRed } from "@/interfaces/codeRed.interface";
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
import { CloseCodeGreenForm } from "@/app/(code)/components/form/CloseCodeGreenForm";
import { CodeGreenForm } from "@/app/(code)/components/form/CodeGreenForm";
import { CodeRedForm } from "@/app/(code)/components/form/CodeRedForm";
import { CodeAir } from "@/interfaces/codeAir.interface";
import { CodeAirForm } from "@/app/(code)/components/form/CodeAirForm";
import { CodeLeak } from "@/interfaces/codeLeak.interface";
import { CodeLeakForm } from "@/app/(code)/components/form/CodeLeakForm";
import { IDevice } from "@/interfaces/fireAlarms.interface";
import { User } from "@/interfaces/user.interface";
import { Operator } from "@/interfaces/operator.interface";
import { UserStatusToggle } from "@/app/admin/components/form/UserStatusToggle";

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
    accessorKey: "createdAt",
    header: "Fecha",
    cell: ({ row }) => {
      return <div>{String(row.original.createdAt)}</div>;
    },
  },
  {
    accessorKey: "Acciones",
    header: "Acciones",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <EllipsisVerticalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <EyeIcon className="mr-2 h-4 w-4" /> Ver detalles
                </DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuItem disabled>
                <SquarePenIcon className="mr-2 h-4 w-4" /> Editar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Detalles del Código Azul</DialogTitle>
              <DialogDescription>
                Información completa del registro de código azul.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4 border-b pb-2">
                <span className="font-bold text-sm">ID:</span>
                <span className="col-span-3 text-sm font-mono truncate">{item.id}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4 border-b pb-2">
                <span className="font-bold text-sm">Equipo:</span>
                <span className="col-span-3 text-sm">{item.team}</span>
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
                <span className="col-span-3 text-sm">{item.operator || 'N/A'}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-bold text-sm">Fecha:</span>
                <span className="col-span-3 text-sm">{String(item.createdAt)}</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
];

export const codeGreenColumns: ColumnDef<CodeGreen>[] = [
  {
    accessorKey: "createdAtDate",
    header: "Fecha",
    cell: ({ row }) => {
      return <div>{row.original.createdAt.split(",")[0]}</div>;
    },
  },
  {
    accessorKey: "createdAtTime",
    header: "Hora",
    cell: ({ row }) => {
      return <div>{row.original.createdAt.split(",")[1]}</div>;
    },
  },
  {
    accessorKey: "location",
    header: "Ubicación",
  },
  {
    accessorKey: "event",
    header: "Evento",
  },
  {
    accessorKey: "Acciones",
    header: "Acciones",
    cell: ({ row }) => {
      const item = row.original;
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
            
            {/* Ver Detalles */}
            <Dialog>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <EyeIcon className="mr-2 h-4 w-4" /> Ver detalles
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Detalles del Código Verde</DialogTitle>
                  <DialogDescription>
                    Información completa del registro de código verde.
                  </DialogDescription>
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
                    <span className="font-bold text-sm">Evento:</span>
                    <span className="col-span-3 text-sm">{item.event}</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 border-b pb-2">
                    <span className="font-bold text-sm">Activado por:</span>
                    <span className="col-span-3 text-sm">{item.activeBy}</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 border-b pb-2">
                    <span className="font-bold text-sm">Carabineros:</span>
                    <span className="col-span-3 text-sm">{item.police}</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 border-b pb-2">
                    <span className="font-bold text-sm">Operador:</span>
                    <span className="col-span-3 text-sm">{item.operator}</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 border-b pb-2">
                    <span className="font-bold text-sm">Estado:</span>
                    <span className="col-span-3 text-sm">{item.closedBy ? `Cerrado por ${item.closedBy}` : 'Abierto'}</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <span className="font-bold text-sm">Fecha:</span>
                    <span className="col-span-3 text-sm">{item.createdAt}</span>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Cerrar */}
            <Dialog>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()} disabled={!!item.closedBy}>
                  <HiOutlineLockClosed className="mr-2 h-4 w-4" /> Cerrar
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Cerrar código verde</DialogTitle>
                  <DialogDescription>Ingrese los datos para cerrar el código verde</DialogDescription>
                </DialogHeader>
                <CloseCodeGreenForm codeGreenId={item.id} />
              </DialogContent>
            </Dialog>

            {/* Editar */}
            <Dialog>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()} disabled={!!item.closedBy}>
                  <MdOutlineModeEdit className="mr-2 h-4 w-4" /> Editar
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Editar código verde</DialogTitle>
                  <DialogDescription>Ingrese los datos para editar el código verde</DialogDescription>
                </DialogHeader>
                <CodeGreenForm codeGreenId={item.id} />
              </DialogContent>
            </Dialog>

          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const codeRedColumns: ColumnDef<CodeRed>[] = [
  {
    accessorKey: "createdAt",
    header: "Fecha",
  },
  {
    accessorKey: "COGRID",
    header: "COGRID",
    cell: ({ row }) => {
      return <div>{row.original.COGRID ? "Sí" : "No"}</div>;
    },
  },
  {
    accessorKey: "location",
    header: "Ubicación",
    maxSize: 100,
    cell: ({ row }) => {
      return <div className="text-wrap">{row.original.location}</div>;
    },
  },
  {
    accessorKey: "Acciones",
    header: "Acciones",
    cell: ({ row }) => {
      const item = row.original;
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
            
            <Dialog>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <EyeIcon className="mr-2 h-4 w-4" /> Ver detalles
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Detalles del Código Rojo</DialogTitle>
                  <DialogDescription>
                    Información completa del registro de código rojo.
                  </DialogDescription>
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
                    <span className="font-bold text-sm">COGRID:</span>
                    <span className="col-span-3 text-sm">{item.COGRID ? "Sí" : "No"}</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 border-b pb-2">
                    <span className="font-bold text-sm">Llamado Bomberos:</span>
                    <span className="col-span-3 text-sm">{item.firefighterCalledTime || "N/A"}</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 border-b pb-2">
                    <span className="font-bold text-sm">Activado por:</span>
                    <span className="col-span-3 text-sm">{item.activeBy}</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 border-b pb-2">
                    <span className="font-bold text-sm">Operador:</span>
                    <span className="col-span-3 text-sm">{item.operator}</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <span className="font-bold text-sm">Fecha:</span>
                    <span className="col-span-3 text-sm">{item.createdAt}</span>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <MdOutlineModeEdit className="mr-2 h-4 w-4" /> Editar
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Editar código rojo</DialogTitle>
                  <DialogDescription>Ingrese los datos para editar el código rojo</DialogDescription>
                </DialogHeader>
                <CodeRedForm />
              </DialogContent>
            </Dialog>

          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const codeAirColumns: ColumnDef<CodeAir>[] = [
  {
    accessorKey: "createdAt",
    header: "Fecha",
  },
  {
    accessorKey: "location",
    header: "Ubicación",
    cell: ({ row }) => {
      return <div className="text-wrap">{row.original.location}</div>;
    },
  },
  {
    accessorKey: "emergencyDetail",
    header: "Detalle",
    cell: ({ row }) => {
      return <div className="text-wrap">{row.original.emergencyDetail}</div>;
    },
  },
  {
    accessorKey: "Acciones",
    header: "Acciones",
    cell: ({ row }) => {
      const item = row.original;
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
            
            <Dialog>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <EyeIcon className="mr-2 h-4 w-4" /> Ver detalles
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Detalles del Código Aéreo</DialogTitle>
                  <DialogDescription>
                    Información completa del registro de código aéreo.
                  </DialogDescription>
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
                    <span className="font-bold text-sm">Emergencia:</span>
                    <span className="col-span-3 text-sm">{item.emergencyDetail}</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 border-b pb-2">
                    <span className="font-bold text-sm">Activado por:</span>
                    <span className="col-span-3 text-sm">{item.activeBy}</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 border-b pb-2">
                    <span className="font-bold text-sm">Operador:</span>
                    <span className="col-span-3 text-sm">{item.operator}</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <span className="font-bold text-sm">Fecha:</span>
                    <span className="col-span-3 text-sm">{item.createdAt}</span>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <MdOutlineModeEdit className="mr-2 h-4 w-4" /> Editar
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Editar código aéreo</DialogTitle>
                  <DialogDescription>Ingrese los datos para editar el código aéreo</DialogDescription>
                </DialogHeader>
                <CodeAirForm />
              </DialogContent>
            </Dialog>

          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const codeLeakColumns: ColumnDef<CodeLeak>[] = [
  {
    accessorKey: "createdAt",
    header: "Fecha",
  },
  {
    accessorKey: "location",
    header: "Ubicación",
    maxSize: 100,
    cell: ({ row }) => {
      return <div className="text-wrap">{row.original.location}</div>;
    },
  },
  {
    accessorKey: "patientName",
    header: "Paciente",
  },
  {
    accessorKey: "patientDescription",
    header: "Descripción",
    cell: ({ row }) => {
      return <div className="text-wrap">{row.original.patientDescription}</div>;
    },
  },
  {
    accessorKey: "Acciones",
    header: "Acciones",
    cell: ({ row }) => {
      const item = row.original;
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
            
            <Dialog>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <EyeIcon className="mr-2 h-4 w-4" /> Ver detalles
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Detalles del Código de Fuga</DialogTitle>
                  <DialogDescription>
                    Información completa del registro de código de fuga.
                  </DialogDescription>
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
                    <span className="font-bold text-sm">Descripción:</span>
                    <span className="col-span-3 text-sm">{item.patientDescription}</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 border-b pb-2">
                    <span className="font-bold text-sm">Activado por:</span>
                    <span className="col-span-3 text-sm">{item.activeBy}</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 border-b pb-2">
                    <span className="font-bold text-sm">Operador:</span>
                    <span className="col-span-3 text-sm">{item.operator}</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <span className="font-bold text-sm">Fecha:</span>
                    <span className="col-span-3 text-sm">{item.createdAt}</span>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <MdOutlineModeEdit className="mr-2 h-4 w-4" /> Editar
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Editar código de fuga</DialogTitle>
                  <DialogDescription>Ingrese los datos para editar el código de fuga</DialogDescription>
                </DialogHeader>
                <CodeLeakForm />
              </DialogContent>
            </Dialog>

          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const fireAlarmColumns: ColumnDef<IDevice>[] = [
  {
    accessorKey: "typeDevice",
    header: "Dispositivo",
  },
  {
    accessorKey: "nodo",
    header: "Nodo - Edificio",
  },
  {
    accessorKey: "lazo",
    header: "Lazo",
  },
  {
    accessorKey: "device",
    header: "ID de dispositivo",
  },
  {
    accessorKey: "location",
    header: "Ubicación",
    cell: ({ row }) => {
      return <div className="text-wrap">{row.original.location}</div>;
    },
  },
  {
    accessorKey: "operative",
    header: "Operativo",
    cell: ({ row }) => {
      return <div>{row.original.operative ? "Sí" : "No"}</div>;
    },
  },
  {
    accessorKey: "observations",
    header: "Observaciones",
    cell: ({ row }) => {
      return <div className="text-wrap">{row.original.observations || "N/A"}</div>;
    },
  },
];

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "createdAt",
    header: "Fecha/Hora",
    cell: ({ row }) => {
      return <div>{String(row.original.createdAt)}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Rol",
  },
  {
    accessorKey: "isActive",
    header: "Activo",
    cell: ({ row }) => {
      return <UserStatusToggle value={row.original.isActive} userId={row.original.id} />;
    },
  },
];

export const operatorColumns: ColumnDef<Operator>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
];
