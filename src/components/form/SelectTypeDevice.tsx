import { getTypeDevice } from "@/actions/fireAlarm/getTypeDevice";
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
import { INodo, ITypeDevice } from "@/interfaces/fireAlarms.interface";
import { useEffect, useState } from "react";

interface Props {
  onValueChange: (...event: any[]) => void;
  value: string;
  name: string;
}

export const SelectTypeDevice = ({ onValueChange, value, name }: Props) => {
  const [typeDevice, setTypeDevice] = useState<ITypeDevice[]>([]);

  const fetchTypeDevice = async () => {
    const data = await getTypeDevice();
    setTypeDevice(data);
  };

  useEffect(() => {
    fetchTypeDevice();
  }, []);

  return (
    <FormItem>
      <FormLabel>Tipo de dispositivo</FormLabel>
      <Select name={name} onValueChange={onValueChange} value={value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Teléfono" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {typeDevice.map((typeDevice: ITypeDevice) => (
            <SelectItem key={typeDevice.id} value={typeDevice.id}>
              {typeDevice.type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );
};
