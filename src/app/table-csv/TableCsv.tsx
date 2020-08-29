import React, { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { selectRows } from '../upload-csv/importcsvSlice';


export default function ShowCsv() {

  
  const rows = useSelector(selectRows);

  const createTable = () => {
    let table = []

    // Outer loop to create parent
    for (let i = 0; i < rows.length; i++) {
      let children = []
      //Inner loop to create children
      children.push(<td>{`${rows[i].title + 1}`}</td>)
      children.push(<td>{`${rows[i].tags + 1}`}</td>)
      children.push(<td>{`${rows[i].description + 1}`}</td>)
      //Create the parent and add the children
      table.push(<tr key={rows[i].title}>{children}</tr>)
    }
    return table
  }


  return (
    <table>
      
        {createTable()}
      </table>
  );
}
