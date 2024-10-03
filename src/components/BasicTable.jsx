import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useState } from "react";

export const BasicTable = ({ data }) => {
  const [sorting, setSorting] = useState([]);
  const columns = [
    { header: "ID", accessorKey: "id", footer: "ID" },
    {
      header: " Name",
      accessorFn: (row) => `${row.first_name} ${row.last_name}`,
      footer: "Name",
    },

    { header: "Gender", accessorKey: "gender", footer: "Gender" },
    {
      header: "Date of birth",
      accessorKey: "date_of_birth",
      footer: "Date of birth",
    },
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0, //custom initial page index
        pageSize: 15, //custom default page size
      },
    },
    state: {
      sorting: sorting,
    },
    onSortingChange: setSorting,
  });
  return (
    <div className="container w3-container">
      <table className="w3-table-all">
        <thead>
          {" "}
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {/* {asc: '▲', desc:'▼'} [header.column.getIsSorted() ?? null] */}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => table.setPageIndex(0)}>first page</button>
        <button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          prev page
        </button>
        <button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          next page
        </button>
        <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
          last page
        </button>
      </div>
    </div>
  );
};
