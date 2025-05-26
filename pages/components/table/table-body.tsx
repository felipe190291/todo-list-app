import { useTaskStore } from "@/store/task/taskStore";
import { style_table_body_row } from "@/types/themeTypes";
import TableBodyRow from "./table-body-row";

export default function TableBody() {
  const { tasks } = useTaskStore();
  return (
    <tbody className="divide-y divide-gray-light dark:divide-gray-darker">
      {tasks.map((task) => (
        <tr key={task.id} className={`${style_table_body_row}`}>
          <TableBodyRow taskId={task.id} clientProp={task.title ?? "-"} />
          <TableBodyRow taskId={task.id} clientProp={task.description ?? "-"} />
          <TableBodyRow
            taskId={task.id}
            isStatus={true}
            clientProp={task.status ?? "-"}
          />
          <TableBodyRow taskId={task.id} clientProp={task.assignedTo ?? "-"} />
          <TableBodyRow taskId={task.id} clientProp={"Actions"} />
        </tr>
      ))}
    </tbody>
  );
}
