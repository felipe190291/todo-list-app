import {
  style_table_head_cell,
  style_table_head_row,
} from "@/types/themeTypes";
const headers = [
  { slug: "title", name: "Título" },
  { slug: "description", name: "Descripción" },
  { slug: "status", name: "Estado" },
  { slug: "assignedTo", name: "Asignado" },
  { slug: "actions", name: "Acciones" },
];

export default function TableHead() {
  return (
    <thead>
      <tr className={style_table_head_row}>
        {headers.map((header: any) => (
          <th key={header?.slug} scope="col" className={style_table_head_cell}>
            {header?.name}
          </th>
        ))}
      </tr>
    </thead>
  );
}
