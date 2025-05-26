import { useUserStore } from "@/store/user/userStore";
import { states } from "@/types/themeTypes";
import persons from "@/public/listPersons.json";
import { useTaskStore } from "@/store/task/taskStore";
import { buttonClass, inputClass } from "@/types/constants";

export default function CreateTaskForm({ close }: { close: () => void }) {
  const userName = useUserStore((state) => state.name);
  const { addTask } = useTaskStore();
  const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const assignedTo = formData.get("assignedTo")?.toString() || "";

    addTask({ title, description, assignedTo });
    close();
  };
  return (
    <div>
      <div className="text-black dark:text-white mb-3">
        Crea una nueva tarea {userName}
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
              htmlFor="name"
              className="block text-sm/6 font-medium text-black dark:text-white"
            >
              Asignado a:
            </label>
          </div>
          <div className="mt-1">
            <select className={inputClass} name="assignedTo">
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
            Crear
          </button>
        </div>
      </form>
    </div>
  );
}
