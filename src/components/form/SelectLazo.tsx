import { getNodo } from "@/actions/fireAlarm/getNodo";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { INodo } from "@/interfaces/fireAlarms.interface";
import { useEffect, useState } from "react";

interface Props {
  onValueChange: (...event: any[]) => void;
  value: string;
  name: string;
}

export const SelectNodo = ({ onValueChange, value, name }: Props) => {
  const [nodo, setNodo] = useState<INodo[]>([]);

  const fetchNodo = async () => {
    const data = await getNodo();
    setNodo(data);
  };

  useEffect(() => {
    fetchNodo();
  }, []);

  return (
    <FormItem>
      <FormLabel>Nodo</FormLabel>
      <Select name={name} onValueChange={onValueChange} value={value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un nodo" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {nodo.map((nodo: INodo) => (
            <SelectItem key={nodo.id} value={nodo.id}>
              {nodo.nodo} - {nodo.building}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );
};
