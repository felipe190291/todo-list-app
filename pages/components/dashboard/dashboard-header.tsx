import { buttonClass } from "@/types/constants";
import SearchBar from "./search";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useTaskStore } from "@/store/task/taskStore";

const DashboardHeader = ({
  fetchTasks,
  setOpenModal,
}: {
  fetchTasks: () => void;
  setOpenModal: (value: boolean) => void;
}) => {
  const { setTasks, tasks, updateStatus } = useTaskStore();
  const [searchQuery, setSearchQuery] = useState<string>("");
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
  );
};
export default DashboardHeader;
