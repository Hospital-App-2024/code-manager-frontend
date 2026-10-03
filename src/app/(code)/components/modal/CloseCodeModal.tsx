"use client";

import { useState } from "react";
import { CheckCircle2, Lock } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useOperator } from "@/hooks/use-operator";
import { emergency_codes } from "@/requests";

import { EmergencyCode } from "@/interfaces/emergencyCode.interface";
import { QueryKeys } from "@/interfaces";

interface Props {
  item: EmergencyCode;
  trigger?: React.ReactNode;
}

export function CloseCodeModal({ item, trigger }: Props) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const { data: operators, isLoading: isLoadingOperators } = useOperator();

  const getLocalDate = () => {
    const now = new Date();
    // Offset local timezone format for datetime-local
    const offset = now.getTimezoneOffset();
    const local = new Date(now.getTime() - offset * 60 * 1000);
    return local.toISOString().slice(0, 16);
  };

  const [closedBy, setClosedBy] = useState("");
  const [closedAt, setClosedAt] = useState(getLocalDate());
  const [closedByOperatorId, setClosedByOperatorId] = useState("");

  const handleClose = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!closedBy.trim()) {
      toast.error("Debe ingresar el nombre de la persona que finaliza el código");
      return;
    }
    if (!closedAt) {
      toast.error("Debe ingresar la fecha y hora de cierre");
      return;
    }
    if (!closedByOperatorId) {
      toast.error("Debe seleccionar el operador que registra el cierre");
      return;
    }

    try {
      setIsLoading(true);
      await emergency_codes.patch(item.id, {
        closedBy: closedBy.trim(),
        closedAt: new Date(closedAt).toISOString(),
        closedByOperatorId,
      });

      toast.success("Código finalizado correctamente");
      queryClient.invalidateQueries({ queryKey: [QueryKeys.EmergencyCodes] });
      setOpen(false);
    } catch (error) {
      console.error("Error al finalizar el código:", error);
      toast.error("No se pudo finalizar el código de emergencia");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            size="sm"
            variant="outline"
            className="text-amber-600 border-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/50 flex items-center gap-1"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Finalizar</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleClose}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-primary">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Finalizar Código {item.type}
            </DialogTitle>
            <DialogDescription>
              Ubicación: <strong className="text-foreground">{item.location}</strong>
              <br />
              Registre quién da por concluida la emergencia y la hora correspondiente.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="closedBy">
                Finalizado por <span className="text-destructive">*</span>
              </Label>
              <Input
                id="closedBy"
                placeholder="Nombre y cargo de quien finaliza"
                value={closedBy}
                onChange={(e) => setClosedBy(e.target.value)}
                required
                disabled={isLoading}
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="closedAt">
                Fecha y Hora de Cierre (Manual) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="closedAt"
                type="datetime-local"
                value={closedAt}
                onChange={(e) => setClosedAt(e.target.value)}
                required
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">
                Puede editar manualmente la hora exacta si el cierre ocurrió previamente.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="closedByOperatorId">
                Operador que registra el cierre <span className="text-destructive">*</span>
              </Label>
              <Select
                value={closedByOperatorId}
                onValueChange={setClosedByOperatorId}
                disabled={isLoading}
              >
                <SelectTrigger id="closedByOperatorId" className="w-full">
                  <SelectValue placeholder="Seleccione un operador..." />
                </SelectTrigger>
                <SelectContent>
                  {!isLoadingOperators &&
                    operators?.map((op) => (
                      <SelectItem key={op.id} value={op.id}>
                        {op.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Finalizando..." : "Confirmar Cierre"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
