import { Task, TaskStatus } from "@/types/themeTypes";
export const groupTasksByStatus = (tasks: Task[]) => {
  const mapTask: Record<TaskStatus, Task[]> = {
    pendiente: [],
    en_progreso: [],
    completada: [],
  };

  tasks.forEach((task) => {
    const state = task.status;
    if (state in mapTask) {
      mapTask[state as TaskStatus].push(task);
    }
  });

  return mapTask;
};
export default function Other() {
  return;
}
