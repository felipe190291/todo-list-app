import { useTaskStore } from "@/store/task/taskStore";
import { states } from "@/types/themeTypes";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditTaskForm from "../dashboard/edit-task-from";
import Modal from "../modals/modal";
import { useState } from "react";
import { buttonClass, style_table_body_cell } from "@/types/constants";

interface TableBodyRowProps {
  taskId?: string;
  clientProp: string | number | null;
  className?: string;
  isStatus?: boolean;
}

export default function TableBodyRow({
  taskId,
  clientProp,
  className,
  isStatus,
}: TableBodyRowProps) {
  const { deleteTask } = useTaskStore();
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <EditTaskForm taskId={taskId || ""} close={() => setOpenModal(false)} />
      </Modal>
      <td key={taskId} className={style_table_body_cell + " " + className}>
        {clientProp == "Actions" ? (
          <div className="w-10 flex gap-2 dark:text-white">
            <button className={buttonClass} onClick={() => setOpenModal(true)}>
              <FontAwesomeIcon
                icon={faEdit}
                className="w-3 h-auto text-gray-darkest dark:text-white"
              />
            </button>
            <button
              className={buttonClass}
              onClick={() => deleteTask(taskId || "")}
            >
              <FontAwesomeIcon
                icon={faTrash}
                className="w-3 h-auto text-gray-darkest dark:text-white"
              />
            </button>
          </div>
        ) : isStatus ? (
          <button
            style={{
              backgroundColor:
                states.find((task) => task.name == clientProp)?.color ||
                "black",
            }}
            className={buttonClass}
            onClick={() => deleteTask(taskId || "")}
          >
            {states.find((task) => task.name == clientProp)?.label ||
              "Desconocido"}
          </button>
        ) : (
          <span className="w-full flex dark:text-white">{clientProp}</span>
        )}
      </td>
    </>
  );
}
