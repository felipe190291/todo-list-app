import { create } from "zustand";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { Task, TaskStatus } from "@/types/themeTypes";

interface TaskStore {
  tasks: Task[];
  addTask: (data: Omit<Task, "id" | "status">) => void;
  deleteTask: (id: string) => void;
  updateStatus: (id: string, status: TaskStatus) => void;
  updateTask: (id: string, updates: Partial<Omit<Task, "id">>) => void;
  setTasks: (tasks: Task[]) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  addTask: (data) => {
    const newTask: Task = {
      id: uuid(),
      status: "pendiente",
      ...data,
    };
    set((state) => ({ tasks: [...state.tasks, newTask] }));
    axios
      .post("/api/tasks", newTask, {
        headers: { "Content-Type": "application/json" },
      })
      .catch((error) => {
        console.error("Error al crear tarea:", error.message);

        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== newTask.id),
        }));
      });
  },
  updateStatus: (id, status) =>
    set((state) => {
      const taskToUpdate = state.tasks.find((task) => task.id === id);
      if (!taskToUpdate) return state;

      const previousStatus = taskToUpdate.status;

      const updated = state.tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      );
      axios
        .patch(
          `/api/tasks?id=${id}`,
          { status },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .catch((error) => {
          console.error("Error al actualizar tarea:", error.message);
          set((state) => ({
            tasks: state.tasks.map((t) =>
              t.id === id ? { ...t, status: previousStatus } : t
            ),
          }));
        });

      return { tasks: updated };
    }),

  deleteTask: (id) => {
    const previousTasks = useTaskStore.getState().tasks;

    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));

    axios.delete(`/api/tasks?id=${id}`).catch((error) => {
      console.error("Error al eliminar tarea:", error.message);

      set({ tasks: previousTasks });
    });
  },
  updateTask: (id, updates) =>
    set((state) => {
      const taskToUpdate = state.tasks.find((task) => task.id === id);
      if (!taskToUpdate) return state;

      const previousTask = { ...taskToUpdate };
      const updated = state.tasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      );

      axios
        .patch(`/api/tasks?id=${id}`, updates, {
          headers: { "Content-Type": "application/json" },
        })
        .catch((error) => {
          console.error("Error al actualizar tarea:", error.message);

          set((state) => ({
            tasks: state.tasks.map((t) => (t.id === id ? previousTask : t)),
          }));
        });

      return { tasks: updated };
    }),
}));
