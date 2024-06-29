import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { format, isValid, parseISO } from "date-fns";

interface Props {
  name: string;
  value: Date | undefined;
  title?: string;
  onChange: (value: Date) => void;
}

export const DatePicker = ({
  name,
  onChange,
  value,
  title = "Fecha y hora",
}: Props) => {
  const isDateValid = isValid(value);
  const formattedValue =
    isDateValid && value ? format(value, "yyyy-MM-dd'T'HH:mm") : "";
  return (
    <FormItem>
      <FormLabel>{title}</FormLabel>
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
