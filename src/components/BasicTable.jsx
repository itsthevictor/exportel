import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { mockData } from "../data/MOCK_DATA";
import { DownloadTableExcel } from "react-export-table-to-excel";

export const BasicTable = ({ data }) => {
  const [sorting, setSorting] = useState([]);
  const tableRef = useRef(null);
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

  const handleOnClickExport = () => {
    const wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(mockData);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  return (
    <div className="container w3-container">
      <table className="w3-table-all" ref={tableRef}>
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
        <DownloadTableExcel
          filename="user table"
          sheet="users"
          currentTableRef={tableRef.current}
        >
          <button>export from table</button>
        </DownloadTableExcel>
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
        <button onClick={handleOnClickExport}>xlsx export</button>
      </div>
    </div>
  );
};
