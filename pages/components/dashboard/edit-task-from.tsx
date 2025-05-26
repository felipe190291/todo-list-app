import { useUserStore } from "@/store/user/userStore";
import { states } from "@/types/themeTypes";
import persons from "@/public/listPersons.json";
import { useTaskStore } from "@/store/task/taskStore";
import { buttonClass, inputClass } from "@/types/constants";

export default function EditTaskForm({
  close,
  taskId,
}: {
  close: () => void;
  taskId: string;
}) {
  const userName = useUserStore((state) => state.name);
  const { updateTask, tasks } = useTaskStore();
  const selectedTask = tasks.find((task) => task.id == taskId);

  const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const updates = {
      title: formData.get("title")?.toString() || "",
      description: formData.get("description")?.toString() || "",
      assignedTo: formData.get("assignedTo")?.toString() || "",
      status: formData.get("status")?.toString() || undefined,
    };

    const changedFields = Object.entries(updates).reduce(
      (acc: any, [key, value]) => {
        if (
          value &&
          value !== selectedTask?.[key as keyof typeof selectedTask]
        ) {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );

    if (Object.keys(changedFields).length > 0) {
      updateTask(taskId, changedFields);
    }
    close();
  };
  return (
    <div>
      <div className="text-black dark:text-white mb-3">
        Editar tarea {userName}
      </div>
      <form onSubmit={handleCreate} className="space-y-6">
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="name"
              className="block text-sm/6 font-medium text-black dark:text-white"
            >
              Titulo
            </label>
          </div>
          <div className="mt-1">
            <input
              defaultValue={selectedTask?.title || ""}
              id="title"
              name="title"
              type="text"
              required
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="description"
              className="block text-sm/6 font-medium text-black dark:text-white"
            >
              Descripción
            </label>
          </div>
          <div className="mt-1">
            <input
              defaultValue={selectedTask?.description || ""}
              id="description"
              name="description"
              type="textarea"
              required
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="status"
              className="block text-sm/6 font-medium text-black dark:text-white"
            >
              Estado:
            </label>
          </div>
          <div className="mt-1">
            <select
              className={inputClass}
              name="status"
              defaultValue={selectedTask?.status || ""}
            >
              {states.map((e) => (
                <option key={e.id} value={e.name} className="sm:text-sm/6">
                  {e.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="name"
              className="block text-sm/6 font-medium text-black dark:text-white"
            >
              Asignado a:
            </label>
          </div>
          <div className="mt-1">
            <select
              className={inputClass}
              name="assignedTo"
              defaultValue={selectedTask?.assignedTo || ""}
            >
              {persons.map((e) => (
                <option key={e.id} value={e.name} className="sm:text-sm/6">
                  {e.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <button type="submit" className={buttonClass}>
            Editar
          </button>
        </div>
      </form>
    </div>
  );
}
