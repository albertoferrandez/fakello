"use client";

import ListItem from "@/app/components/list/ListItem";

import { useTablesStore } from "@/app/store/tablesStore";

import { ITables } from "@/app/types/project";
import { useParams, redirect } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import useDragAndDrop from "@/app/hooks/useDragAndDrop";
import ListCreatorItem from "@/app/components/list/ListCreatorItem";

export default function Home() {
  const tablesProject = useTablesStore((state) => state.project.tables);
  const createNewList = useTablesStore((state) => state.createNewList);

  const params = useParams();
  const [tables, setTables] = useState(tablesProject);

  const [openCreateList, setOpenCreateList] = useState<boolean>(false);
  const actualTable = tables.find(
    (table) => table.id === params.table
  ) as ITables;
  
  const { onDragEnd } = useDragAndDrop({ actualTable, tables, setTables });

  const handleAddList = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const list = Array.from(formData.values()).join(" ");

    if (!list) return;

    const newList = {
      idList: list.replace(/\s/g, "").toLowerCase(),
      nameList: list,
      tasks: [],
    };

    createNewList(actualTable.id, newList);
  };

  useEffect(() => {
    setTables(tablesProject)
  }, [tablesProject])

  if (!params.table || !actualTable) return redirect("/");

  return (
    <section
      className="p-4 text-slate-300 h-full"
      style={{ backgroundColor: actualTable?.color }}
    >
      <header className="bg-black/30 px-4 py-4 rounded-md mb-4">
        {actualTable?.nameTable}
      </header>

      <div className="flex gap-4 mt-10 flex-col lg:flex-row">
        <DragDropContext onDragEnd={onDragEnd}>
          {actualTable?.lists.map((list, index) => (
            <Droppable droppableId={String(list.idList)} key={list.idList}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="w-72 h-full"
                >
                  <Draggable
                    key={list.idList}
                    draggableId={`draggable${list.idList}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <ListItem list={list}></ListItem>
                      </div>
                    )}
                  </Draggable>
                </div>
              )}
            </Droppable>
          ))}
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
