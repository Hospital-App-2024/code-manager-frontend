import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

interface Props {
  name: string;
  value: Date;
  onChange: (value: Date) => void;
}

export const DatePicker = ({ name, onChange, value }: Props) => {
  const formattedValue = format(value, "yyyy-MM-dd'T'HH:mm");
  return (
    <FormItem>
      <FormLabel>Fecha y hora</FormLabel>
      <FormControl>
        <Input
          value={formattedValue}
          name={name}
          onChange={(e) => {
            const date = new Date(e.target.value);
            onChange(date);
          }}
          type="datetime-local"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
