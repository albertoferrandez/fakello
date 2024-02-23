import React, { FormEvent, useId, useState } from "react";
import { List } from "@/app/types/project";

import { status } from "../../constants/status";
import { useTablesStore } from "../../store/tablesStore";

import Button from '../ui/Button';
import DropDown from "../ui/DropDown";
import Input from "../ui/Input";
import TextArea from "../ui/TextArea";
import { IconDotsVertical } from "@tabler/icons-react";
import { format } from "@formkit/tempo";
import ListTasks from "./ListTasks";

interface Props {
  list: List;
}

function ListItem({ list }: Props) {
  const [openForm, setOpenForm] = useState<boolean>();
  const createNewTaskAtList = useTablesStore(
    (state) => state.createNewTaskAtList
  );
  const id = useId();

  const handleAddTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const nameTask = formData.get("nameTask") as string;
    const taskDescription = formData.get("taskDescription") as string;
    const selectedStatus = formData.get("status") as string;
    const statusObject = JSON.parse(selectedStatus);

    const data = {
      idTask: id,
      nameTask,
      taskDescription,
      status: statusObject,
      createdAt: format(new Date(), "short"),
    };

    console.log(data)

    createNewTaskAtList(list.idList, data);
    setOpenForm(false);
  }
  
  return (
    <article
      className="bg-primary text-slate-300 
       rounded-md w-72"
    >
      <div
        className="flex flex-row justify-between items-center px-2 py-3"
        style={{ borderBottom: "1px solid hsla(211, 18%, 68%, 0.16)" }}
      >
        <h1 className="text-sm font-medium  uppercase">{list.nameList}</h1>
        <div>
          <Button style="p-1">
            <IconDotsVertical />
          </Button>
        </div>
      </div>

      {/** Tasks List Component*/}
      <ListTasks list={list} />
      
      <div className="relative">
        <Button
          style="p-2 w-full rounded-none"
          action={() => setOpenForm(!openForm)}
        >
          + Añada una tarea
        </Button>
        <DropDown open={openForm} setOpen={setOpenForm}>
          <form onSubmit={handleAddTask} className="flex flex-col gap-3">
            Introduzca un titulo:
            <Input name="nameTask" />
            Introduzca la descripción de la tarea:
            <TextArea name="taskDescription" />
            Estado de la tarea:
            <select
              name="status"
              className="w-full p-1 text-sm text-gray-900 border 
              border-gray-300 rounded-lg bg-gray-50 
              focus:ring-blue-500 focus:border-blue-500 
              dark:bg-[#1c2532] dark:border-gray-600 
              dark:placeholder-gray-400 dark:text-white 
              dark:focus:ring-blue-500 
              dark:focus:border-blue-500"
            >
              {status.map((state) => (
                <option value={JSON.stringify(state)} key={state.state}>
                  {state.state}
                </option>
              ))}
            </select>
            <div className="flex justify-between">
              <Button style="p-2" type={"submit"}>
                Añadir tarea
              </Button>
              <Button
                type={"button"}
                style="p-2"
                action={() => setOpenForm(!openForm)}
              >
                x
              </Button>
            </div>
          </form>
        </DropDown>
      </div>
    </article>
  );
}

export default ListItem
