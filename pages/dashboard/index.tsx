import { useTaskStore } from "@/store/task/taskStore";
import { useUserStore } from "@/store/user/userStore";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import {
  buttonClass,
  columnInfo,
  states,
  Task,
  TaskStatus,
} from "@/types/themeTypes";
import axios from "axios";
import DraggableCard from "../components/dashboard/draggable-card";
import SearchBar from "../components/dashboard/search";
import Modal from "../components/modals/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import CreateTaskForm from "../components/dashboard/create-task-form";
import BasicLoader from "../components/page_layouts/commons/Loaders/BasicLoader";
import TableContainer from "../components/table/table-container";
import TableHead from "../components/table/table-head";
import TableBody from "../components/table/table-body";

function Page() {
  const { setTasks, tasks, updateStatus } = useTaskStore();
  const [loader, setLoader] = useState(false);
  const [taskMap, setTaskMap] = useState<Record<TaskStatus, Task[]>>(() => {
    return {
      pendiente: [],
      en_progreso: [],
      completada: [],
    };
  });

  const [openModal, setOpenModal] = useState(false);
  const groupTasksByStatus = (tasks: Task[]) => {
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
  async function fetchTasks() {
    try {
      setLoader(true);
      const res = await axios.get("/api/tasks");
      let data = res.data;
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);
  useEffect(() => {
    const groupedTasks = groupTasksByStatus(tasks);
    setTaskMap(groupedTasks);
  }, [tasks]);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const userName = useUserStore((state) => state.name);
  const sensors = useSensors(useSensor(PointerSensor));

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

  function Column({ id, tasks }: { id: TaskStatus; tasks: Task[] }) {
    const { setNodeRef } = useDroppable({ id });
    const { label, color } = columnInfo[id];

    return (
      <div
        ref={setNodeRef}
        className={`flex-1 p-4 rounded-xl min-h-[200px] min-w-[300px]`}
        style={{
          background: color + "40",
        }}
      >
        <h4 className="font-semibold text-uppercase mb-2 text-gray-darkest dark:text-pd-light text-center flex items-center justify-center gap-2">
          {label}
        </h4>
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <DraggableCard
              key={task.id}
              id={task.id}
              task={task}
              color={color}
            />
          ))}
        </SortableContext>
      </div>
    );
  }
  const getFiltedTask = (columnId: TaskStatus) => {
    const groupedTasks = groupTasksByStatus(tasks);

    return groupedTasks[columnId] || [];
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      let filterTask = tasks.filter((tsk) =>
        tsk.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setTasks(filterTask);
    } else {
      fetchTasks();
    }
  }, [searchQuery]);

  return (
    <div className="flex min-h-full w-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
      <div className="flex text-center justify-center mb-5">
        <h1 className="font-bold text-xl text-black dark:text-white">
          Dashboard {userName ?? ""}
        </h1>
      </div>

      <div className="w-full">
        <div className="w-full flex my-2 items-center gap-2 my-5">
          <SearchBar
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
            placeholderCustom="Buscar personas"
          />
          <div className="w-10 md:w-40 ">
            <button onClick={() => setOpenModal(true)} className={buttonClass}>
              <span className="hidden md:block">+ Agregar tarea </span>
              <span className="md:hidden">
                <FontAwesomeIcon icon={faPlusCircle} className="h-4 w-auto" />
              </span>
            </button>
          </div>
        </div>
        <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
          <CreateTaskForm close={() => setOpenModal(false)} />
        </Modal>

        {loader ? (
          <BasicLoader />
        ) : (
          <>
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
                      <Column
                        key={col.id}
                        id={columnId}
                        tasks={getFiltedTask(columnId)}
                      />
                    );
                  })}
                </div>
              </DndContext>
            </div>
            <div className=" md:hidden w-full flex  overflow-auto ">
              <TableContainer>
                <TableHead />
                <TableBody />
              </TableContainer>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default Page;
