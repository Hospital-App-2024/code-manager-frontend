import { getOperators } from "@/actions/operator/getOperators";
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
import { Operator } from "@/interfaces/operator.interface";
import { useEffect, useState } from "react";

interface Props {
  onValueChange: (...event: any[]) => void;
  value: string;
  name: string;
}

export const SelectOperator = ({ onValueChange, value, name }: Props) => {
  const [operators, setOperators] = useState<Operator[]>([]);

  const fetchOperators = async () => {
    const operators = await getOperators();
    setOperators(operators);
  }
  
  useEffect(() => {
    fetchOperators();
  }, []);

  return (
    <FormItem>
      <FormLabel>Operador</FormLabel>
      <Select name={name} onValueChange={onValueChange} value={value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un operador" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {operators.map((operator: Operator) => (
            <SelectItem key={operator.id} value={operator.id}>
              {operator.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );
};
