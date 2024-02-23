import React, { Dispatch, FormEvent, SetStateAction } from "react";
import { IconX } from "@tabler/icons-react";

import Button from "../ui/Button";

import { useTablesStore } from "../../store/tablesStore";

interface Props {
  setOpen: Dispatch<SetStateAction<boolean | undefined>>
}

function FormCreateTable({setOpen}: Props) {
  const createNewTable = useTablesStore((state) => state.createNewTable);

  const handleCreateTable = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const { titleTable, colorTable } = Object.fromEntries(formData)

    const titleTableString = String(titleTable);
    const colorTableString = String(colorTable);

    createNewTable(titleTableString, colorTableString);
    setOpen(false);
  };

  return (
    <>
      <div className="flex justify-between items-center" id="form-create-table">
        <h4>Crear tablero</h4>

        <Button style="p-2" action={() => setOpen(false)}>
          <IconX />
        </Button>
      </div>

      <form onSubmit={handleCreateTable} className="flex flex-col mt-2">
        <label htmlFor="titleTable" className="text-xs">
          Titulo del tablero *
        </label>
        <input
          type="text"
          name="titleTable"
          className="p-1 text-sm text-gray-900 border 
              border-gray-300 rounded-lg bg-gray-50 
              focus:ring-blue-500 focus:border-blue-500 
              dark:bg-[#1c2532] dark:border-gray-600 
              dark:placeholder-gray-400 dark:text-white 
              dark:focus:ring-blue-500 
              dark:focus:border-blue-500"
          required
        />

        <label
          htmlFor="colorTable"
          className="flex items-center 
        justify-between text-xs mt-2"
        >
          Fondo:
          <input type="color" name="colorTable" id="colorTable" />
        </label>
        <button>Submit</button>
      </form>
    </>
  );
}

export default FormCreateTable;
