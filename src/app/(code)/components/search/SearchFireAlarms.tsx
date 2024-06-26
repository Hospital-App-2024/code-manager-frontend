"use client";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { INodo } from "@/interfaces/fireAlarms.interface";
import { getNodo } from "@/actions/fireAlarm/getNodo";

export const SearchFireAlarms = () => {
  const [nodos, setNodos] = useState<INodo[]>([]);

  useEffect(() => {
    const fetchNodos = async () => {
      const data = await getNodo();
      setNodos(data);
    };

    fetchNodos();
  }, []);

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const route = useRouter();

  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    if (term === null) return null;
    const params = new URLSearchParams(searchParams);
    params.set("search", term);
    route.push(`${pathName}?${params.toString()}`);
  };

  const handleSelect = (value: string) => {
    if (value === null) return null;
    const params = new URLSearchParams(searchParams);
    params.set("nodo", value);
    replace(`${pathName}?${params.toString()}`);
  };

  return (
    <div className="p-3 bg-white grid md:grid-cols-2 gap-4 mb-2 shadow rounded grid-cols-1">
      <div>
        <Label>Buscar</Label>
        <Input
          placeholder="Buscar por ID de dispositivo"
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get("search")?.toString()}
        />
      </div>

      <div className="flex items-end gap-2">
        <div>
          <Label>Nodo</Label>
          <Select
            value={searchParams.get("nodo") || ""}
            onValueChange={(value) => handleSelect(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar el nodo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {nodos.map((nodo) => (
                  <SelectItem key={nodo.id} value={nodo.id}>
                    {nodo.nodo} - {nodo.building}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => route.push(`${pathName}`)}>
          Limpiar filtros
        </Button>
      </div>
    </div>
  );
};
