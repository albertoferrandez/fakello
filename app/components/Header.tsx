import { IconLayoutKanban, IconPlus, IconSearch } from "@tabler/icons-react"
import Link from "next/link"
import { useState } from "react"

import Button from "./ui/Button"
import FormCreateTable from "./table/FormCreateTable"
import DropDown from "./ui/DropDown"

export default function Header() {
  const [openForm, setOpenForm] = useState<boolean>()

  return (
    <header 
      className="w-full flex justify-between items-center px-3 py-3 lg:px-5 lg:pl-3 bg-primary text-slate-300 border-slate-300"
      style={{ borderBottom: "1px solid hsla(211, 18%, 68%, 0.16)" }}
    >
      <div className="flex justify-between items-center gap-6">
        <div className="flex gap-2">
          <IconLayoutKanban color="#cbd5e1" />
          <Link href={"/"}>
            <h1 className="font-bold">FakeLlo</h1>
          </Link>
        </div>

        <div className="relative">
          <Button style="p-2" action={() => setOpenForm(!openForm)}>
            <IconPlus color="#cbd5e1" />
            <span>Crear</span>
          </Button>
          <DropDown open={openForm} setOpen={setOpenForm}>
           <FormCreateTable setOpen={setOpenForm}/>  
          </DropDown>
        </div>
      </div>

      <div className="flex justify-between gap-4">
        <form>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <IconSearch size="18" />
            </div>
            <input
              type="search"
              id="default-search"
              className="block
                w-full p-2 ps-10 text-sm text-gray-900 border 
              border-gray-300 rounded-lg bg-gray-50 
              focus:ring-blue-500 focus:border-blue-500 
              dark:bg-[#1c2532] dark:border-gray-600 
              dark:placeholder-gray-400 dark:text-white 
              dark:focus:ring-blue-500 
              dark:focus:border-blue-500"
              placeholder="Buscar"
            />
          </div>
        </form>

        <div>
          <div
            className="relative inline-flex items-center justify-center 
          w-10 h-10 overflow-hidden bg-gray-100 
          rounded-full dark:bg-gray-600"
          >
            <span
              className="font-medium text-gray-600 
            dark:text-gray-300"
            >
              JL
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
