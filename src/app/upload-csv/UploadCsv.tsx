import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { setRows, ImageOption } from "./importcsvSlice";
import { Workbook } from "exceljs/dist/exceljs";
import Papa from "papaparse";

export default function UploadCsv() {
  const dispatch = useDispatch();

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event && event.target && event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      // const inputTmp = document.getElementById('tmplogic') as HTMLInputElement;
      // let list = new DataTransfer();
      // list.items.add(file);
      // inputTmp.files = list.files;
      // const eventTmp = new Event('change', {bubbles: true});
      // inputTmp.dispatchEvent(eventTmp);
      processFile(file).then((rows) => {
        console.log(rows);
        dispatch(setRows(rows));
      });
    }

    event.preventDefault();
    event.stopPropagation();
  };

  const processExcellFile = async (fileSteam: ArrayBuffer) => {
    const workbook = new Workbook();
    await workbook.xlsx.load(fileSteam);

    const worksheet = workbook.getWorksheet(1);
    const uploadItem: ImageOption[] = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber !== 1 && row.getCell(6).value !== "success") {
        // if (rowNumber != 1) {
        uploadItem.push({
          imageToCpy: `${row.getCell(1).value}`,
          image: `${row.getCell(2).value}`,
          title: `${row.getCell(3).value}`,
          description: `${row.getCell(4).value}`,
          tags: `${row.getCell(5).value}`,
        });
      }
    });
  };

  const processCsvFile = async (file: File) => {
    return new Promise((resolve) => {
      Papa.parse(file, {
        complete: (result) => {
          resolve(result.data.map((row:any)=>{
            return {
                imageToCpy: `${row.imageToCopy}`,
                image: `${row.Image}`,
                title: `${row.Title}`,
                description: `${row.Description}`,
                tags: `${row.Tags}`,
            }
            }));
        },
        header: true,
      });
    });
  };

  const processFile = async (file: File) => {
    if (file.name.endsWith(".xlsx")) {
      const steamFile = await ReadAsReader(file);
      return await processExcellFile(steamFile);
    } else if (file.name.endsWith(".csv")) {
      return await processCsvFile(file);
    }
  };

  const ReadAsReader = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = function (event) {
        resolve(reader.result as ArrayBuffer);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <div>
      <input
        type="file"
        name="importExcell"
        accept=".csv,.xlsx"
        onChange={handleFileSelect}
      />
      {/* <input
        type="file"
        name="tmplogic"
        id="tmplogic"
        accept=".csv,.xlsx"
      /> */}
    </div>
  );
}
