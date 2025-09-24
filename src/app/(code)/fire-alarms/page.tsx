import { Suspense } from "react";
import { SearchFireAlarms } from "../components/search/SearchFireAlarms";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import FireAlarmsTable from "../components/table/FireAlarmsTable";
import { MdAssignmentAdd } from "react-icons/md";
import { BsBuildingFillAdd } from "react-icons/bs";
import { Modal } from "../components/modal/Modal";
import { TypeDeviceForm } from "../components/form/TypeDeviceForm";
import { NodoForm } from "../components/form/NodoForm";
import { DeviceForm } from "../components/form/DeviceForm";

interface Props {
  searchParams: Promise<{
    limit?: string;
    page?: string;
    nodo?: string;
    search?: string;
  }>;
}

export default async function FireAlarmsPage(props: Props) {
  const searchParams = await props.searchParams;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const limit = searchParams.limit ? parseInt(searchParams.limit) : 5;

  return (
    <div className="container mt-10">
      <div className="flex gap-2 mb-2">
        <Modal
          title="Crear Dispositivo"
          subtitle="Complete el formulario para crear un nuevo dispositivo."
        >
          <DeviceForm />
        </Modal>
        <Modal
          title="Crear Nodo"
          subtitle="Complete el formulario para crear un nuevo nodo."
          icon={<BsBuildingFillAdd />}
        >
          <NodoForm />
        </Modal>
        <Modal
          title="Crear tipo de dispositivo"
          subtitle="Complete el formulario para crear un nuevo tipo de dispositivo."
          icon={<MdAssignmentAdd />}
        >
          <TypeDeviceForm />
        </Modal>
      </div>

      <SearchFireAlarms />

      <Suspense fallback={<TableSkeleton />}>
        <FireAlarmsTable
          limit={limit}
          page={page}
          nodo={searchParams.nodo}
          search={searchParams.search}
        />
      </Suspense>
    </div>
  );
}
