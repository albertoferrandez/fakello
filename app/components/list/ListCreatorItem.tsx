import React, { FormEvent, SetStateAction } from 'react'
import Button from '../ui/Button'

interface Props {
  setOpenCreateList: (value: SetStateAction<boolean>) => void;
  openCreateList: boolean;
  handleAddList: (e: FormEvent<HTMLFormElement>) => void;
}

function ListCreatorItem({
  setOpenCreateList,
  openCreateList,
  handleAddList,
}: Props) {
  return (
    <article
      className="bg-white/30 px-4 py-3 rounded-md w-72 max-h-[50px]
        text-black font-extrabold text-sm items-center relative inline-block"
    >
      <button onClick={() => setOpenCreateList(!openCreateList)}>
        + Añada una lista
      </button>

      <form
        onSubmit={handleAddList}
        className={`absolute right-0 z-10 top-0 
            origin-top-right bg-secondary rounded-lg shadow w-72
            py-2 px-4 overflow-hidden text-slate-300 flex flex-col
            ${openCreateList ? "visible" : "hidden"}`}
      >
        <input
          type="text"
          name="list"
          className="p-1 text-sm text-gray-900 border 
              border-gray-300 rounded-lg bg-gray-50 
              focus:ring-blue-500 focus:border-blue-500 
              dark:bg-[#1c2532] dark:border-gray-600 
              dark:placeholder-gray-400 dark:text-white 
              dark:focus:ring-blue-500 
              dark:focus:border-blue-500"
          required
        />

        <div className="flex justify-between py-2">
          <Button style="p-2" type={"submit"}>
            Añadir lista
          </Button>
          <Button
            type={"button"}
            style="p-2"
            action={() => setOpenCreateList(!openCreateList)}
          >
            x
          </Button>
        </div>
      </form>
    </article>
  );
}

export default ListCreatorItem
