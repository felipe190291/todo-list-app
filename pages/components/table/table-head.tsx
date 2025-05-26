import {
  headers,
  style_table_head_cell,
  style_table_head_row,
} from "@/types/constants";

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
