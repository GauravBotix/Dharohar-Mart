import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
const Table = ({ data, column }) => {
  const table = useReactTable({
    data,
    columns: column,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className=" ">
      <table className="w-full border-1 border-neutral-700 rounded">
        <thead className="bg-neutral-700 text-white text-lg  ">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th className="border-2 border-black">S.no</th>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border-2 border-black whitespace-nowrap"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr key={row.id}>
              <td className="text-center border-neutral-700 border-2">
                {index + 1}.
              </td>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="border-neutral-700 border-2 text-black px-4 whitespace-nowrap"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
