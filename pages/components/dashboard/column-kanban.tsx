import { Task, TaskStatus } from "@/types/themeTypes";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import DraggableCard from "./draggable-card";

export const columnInfo: Record<TaskStatus, { label: string; color: string }> =
  {
    pendiente: { label: "Pendiente", color: "#FFD700" },
    en_progreso: { label: "En progreso", color: "#1E90FF" },
    completada: { label: "Completada", color: "#32CD32" },
  } as const;

export default function ColumnKanban({
  id,
  tasks,
}: {
  id: TaskStatus;
  tasks: Task[];
}) {
  const { setNodeRef } = useDroppable({ id });
  const { label, color } = columnInfo[id] || [];

  if (!id || !columnInfo[id]) {
    return null;
  }

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 p-4 rounded-xl min-h-[200px] min-w-[300px]`}
      style={{
        background: color + "40",
      }}
    >
      <h4 className="font-semibold text-uppercase mb-2 text-gray-darkest dark:text-white text-center flex items-center justify-center gap-2">
        {label}
      </h4>
      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        {tasks.map((task) => (
          <DraggableCard key={task.id} id={task.id} task={task} color={color} />
        ))}
      </SortableContext>
    </div>
  );
}
