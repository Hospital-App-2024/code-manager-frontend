"use client";
import { changeUserStatus } from "@/actions/user/changeUserStatus";
import { Switch } from "@/components/ui/switch";
import { useTransition } from "react";
import { toast } from "sonner";

interface Props {
  userId: string;
  value: boolean;
}

export const UserStatusToggle = ({ value, userId }: Props) => {
  const [isPending, startTransition] = useTransition();

  const handleChange = () => {
    startTransition(async () => {
      try {
        const update = await changeUserStatus(userId, !value);
        toast.success("Usuario actualizado correctamente");
      } catch (error) {
        toast.error("Error al actualizar el usuario");
      }
    });
  };

  return (
    <Switch
      checked={value}
      onCheckedChange={handleChange}
      disabled={isPending}
    />
  );
};
