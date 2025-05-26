import { states, Task, TaskStatus } from "@/types/themeTypes";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { groupTasksByStatus } from "../hooks/group-task-by-status";
import ColumnKanban from "./column-kanban";
import { useTaskStore } from "@/store/task/taskStore";
import { useEffect, useState } from "react";

const KanbanBoard = () => {
  const { tasks, updateStatus } = useTaskStore();
  const [taskMap, setTaskMap] = useState<Record<TaskStatus, Task[]>>(() => {
    return {
      pendiente: [],
      en_progreso: [],
      completada: [],
    };
  });
  const sensors = useSensors(useSensor(PointerSensor));
  const getFiltedTask = (columnId: TaskStatus) => {
    const groupedTasks = groupTasksByStatus(tasks);

    return groupedTasks[columnId] || [];
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || !active) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    const activeClient = Object.values(taskMap)
      .flat()
      .find((c) => c.id === activeId);

    if (!activeClient) return;

    const fromColumn = activeClient.status;

    const isColumnChange = states.some((s) => s.name === overId);

    if (isColumnChange) {
      const toColumn = states.find((s) => s.name === overId)
        ?.name as TaskStatus;
      if (!toColumn || fromColumn === toColumn) return;

      setTaskMap((prev) => {
        const newFrom = prev[fromColumn].filter((c) => c.id !== activeId);
        const newTo = [
          ...prev[toColumn],
          { ...activeClient, status: toColumn },
        ];
        return {
          ...prev,
          [fromColumn]: newFrom,
          [toColumn]: newTo,
        };
      });

      updateStatus(activeId, toColumn);
    }
  };
  useEffect(() => {
    const groupedTasks = groupTasksByStatus(tasks);
    setTaskMap(groupedTasks);
  }, [tasks]);

  return (
    <div className="hidden md:block w-full flex justify-center overflow-auto ">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4  mx-auto w-full">
          {states.map((col) => {
            const columnId = col.name as TaskStatus;
            return (
              <ColumnKanban
                key={col.id}
                id={columnId}
                tasks={getFiltedTask(columnId)}
              />
            );
          })}
        </div>
      </DndContext>
    </div>
  );
};
export default KanbanBoard;
