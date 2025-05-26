import { useTaskStore } from "@/store/task/taskStore";
import { useUserStore } from "@/store/user/userStore";
import axios from "axios";
import { useEffect, useState } from "react";
import CreateTaskForm from "../components/dashboard/create-task-form";
import DashboardHeader from "../components/dashboard/dashboard-header";
import KanbanBoard from "../components/dashboard/dashboard-kanban";
import Modal from "../components/modals/modal";
import BasicLoader from "../components/page_layouts/commons/Loaders/BasicLoader";
import TableBody from "../components/table/table-body";
import TableContainer from "../components/table/table-container";
import TableHead from "../components/table/table-head";
import DasdBoardTitle from "../components/dashboard/dashboard-title";

function Page() {
  const { setTasks, tasks } = useTaskStore();
  const [loader, setLoader] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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

  return (
    <div className="flex min-h-full w-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
      <DasdBoardTitle />

      <div className="w-full">
        <DashboardHeader fetchTasks={fetchTasks} setOpenModal={setOpenModal} />
        <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
          <CreateTaskForm close={() => setOpenModal(false)} />
        </Modal>

        {loader ? (
          <BasicLoader />
        ) : (
          <>
            <KanbanBoard />
            <div className=" md:hidden w-full flex  overflow-auto ">
              {tasks.length > 0 ? (
                <TableContainer>
                  <TableHead />
                  <TableBody />
                </TableContainer>
              ) : (
                <span className="flex justify-center w-full italic text-gray-400">
                  No hay tareas
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default Page;
