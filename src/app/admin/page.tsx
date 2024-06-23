import { Modal } from "../(code)/components/modal/Modal";
import { UserForm } from "./components/form/UserForm";
import { FaUserPlus } from "react-icons/fa6";
import { FaUserCog } from "react-icons/fa";

export default function AdminPage() {
  return (
    <div className="container flex">
      <div className="bg-white p-2">
        <Modal
          title="Crear Usuario"
          subtitle="Complete el formulario para crear un usuario"
          icon={<FaUserPlus />}
        >
          <UserForm />
        </Modal>

        <Modal
          title="Crear Operador"
          subtitle="Complete el formulario para crear un operador"
          icon={<FaUserPlus />}
        >
          <UserForm />
        </Modal>
      </div>
    </div>
  );
}
