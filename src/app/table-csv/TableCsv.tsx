import React, { ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { selectRows } from "../upload-csv/importcsvSlice";
import { run,addTask } from '../services/fastpost'
export default function ShowCsv() {
  const rows = useSelector(selectRows);

  const createTable = () => {
    return rows.map((row,index) => {
      return (
        <tr key={index} data-model={JSON.stringify(row)}>
          <td>{`${row.title + 1}`}</td>
          <td>{`${row.tags + 1}`}</td>
          <td>{`${row.description + 1}`}</td>
          <td><button onClick={() => addTask(row)}> upload</button></td>
        </tr>
      );
    });
  };

  return (
    <div>
    <table>
      <thead>
      <tr>
        <th>Title</th>
        <th>Tags</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
      {createTable()}
      </tbody>
    </table>
    </div>
  );
}
