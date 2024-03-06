"use client";

import { useParams, redirect } from "next/navigation";
import { FormEvent, useEffect, useId, useState } from "react";

import { useTablesStore } from "@/app/store/tablesStore";
import { ITables } from "@/app/types/project";
import ListItem from "@/app/components/list/ListItem";
import ListCreatorItem from "@/app/components/list/ListCreatorItem";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import useDragAndDrop from "@/app/hooks/useDragAndDrop";

export default function Home() {
  const params = useParams();
  const [openCreateList, setOpenCreateList] = useState(false);
  
  const tablesProject = useTablesStore((state) => state.project.tables);
  const createNewList = useTablesStore((state) => state.createNewList);
  const id = useId();

  const actualTable = tablesProject.find(
    (table) => table.id === params.table
  ) as ITables;

  const [orderedList, setOrderedList] = useState(actualTable?.lists);
  const { onDragEnd } = useDragAndDrop({actualTable, orderedList, setOrderedList})

  useEffect(() => {
    setOrderedList(actualTable.lists); 
  }, [actualTable?.lists]);

  const handleAddList = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const list = Array.from(formData.values()).join(" ");

    if (!list) return;

    const newList = {
      idList: id,
      nameList: list,
      tasks: [],
    };

    createNewList(actualTable.id, newList);
  };

  useEffect(() => {
    document.title = actualTable.nameTable + " | Fakello";
  }, [actualTable?.nameTable]);

  if (!params.table || !actualTable) return redirect("/");

  return (
    <section
      className="p-4 text-slate-300 h-full"
      style={{ backgroundColor: actualTable?.color }}
    >
      <header className="bg-black/30 px-4 py-4 rounded-md mb-4">
        {actualTable?.nameTable}
      </header>

      <div className="flex gap-4 mt-10 flex-row">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="lists" type="list" direction="horizontal">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex flex-row gap-4"
              >
                {orderedList.map((list, index) => (
                  <li key={list.idList}>
                    <ListItem list={list} index={index} />
                  </li>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>

        <ListCreatorItem
          setOpenCreateList={setOpenCreateList}
          openCreateList={openCreateList}
          handleAddList={handleAddList}
        />
      </div>
    </section>
  );
}
