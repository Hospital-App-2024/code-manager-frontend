import { RiMenuAddLine } from "react-icons/ri";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost";
}

export const Modal = ({
  title,
  subtitle,
  children,
  icon,
  disabled,
  variant = "default",
}: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={variant} size="icon" title={title} disabled={disabled}>
          {icon ? icon : <RiMenuAddLine />}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subtitle}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
