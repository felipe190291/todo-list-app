import { buttonClass, Task } from "@/types/themeTypes";
import { useDraggable } from "@dnd-kit/core";
import { faEdit, faFlag, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSS } from "@dnd-kit/utilities";
import { useTaskStore } from "@/store/task/taskStore";
import { useState } from "react";
import Modal from "../modals/modal";
import EditTaskForm from "./edit-task-from";
export default function DraggableCard({
  id,
  task,
  color,
}: {
  id: string;
  task: Task;
  color: string;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const [openModal, setOpenModal] = useState(false);
  const { deleteTask } = useTaskStore();
  const style = {
    transform: CSS.Translate.toString(transform),
  };
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    deleteTask(task.id);
  };
  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenModal(true);
  };
  return (
    <div
      className=" relative rounded-lg text-pd-dark dark:text-pd-light bg-white dark:bg-pd-dark shadow-lg py-2 px-3 mb-3"
      style={style}
    >
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className="cursor-grab"
      >
        <div className="flex items-center justify-between">
          <span className="font-bold">
            <FontAwesomeIcon
              icon={faFlag}
              className="mx-3 h-3 w-auto"
              style={{ color: color }}
            />
            {task?.title || ""}
          </span>
          <span>{task?.assignedTo || ""}</span>
        </div>
        <div className="flex items-center justify-end">
          <span className="italic text-xs">{task?.description || ""}</span>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <div className="mt-2 flex gap-2 dark:text-white">
          <button type="button" className={buttonClass} onClick={handleEdit}>
            <FontAwesomeIcon
              icon={faEdit}
              className="w-3 h-auto text-gray-darkest dark:text-white"
            />
          </button>
          <button type="button" className={buttonClass} onClick={handleDelete}>
            <FontAwesomeIcon
              icon={faTrash}
              className="w-3 h-auto text-gray-darkest dark:text-white"
            />
          </button>
        </div>
      </div>

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <EditTaskForm taskId={id} close={() => setOpenModal(false)} />
      </Modal>
    </div>
  );
}
