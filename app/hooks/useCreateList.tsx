import { FormEvent, useEffect, useId, useState } from "react"
import { useTablesStore } from "../store/tablesStore"
import { ITables } from "../types/project"
import { Params } from "next/dist/shared/lib/router/utils/route-matcher"

function useCreateList({ params }: Params) {
  const tablesProject = useTablesStore((state) => state.project.tables)
  const createNewList = useTablesStore((state) => state.createNewList)
  const [tables, setTables] = useState(tablesProject)
  const id = useId()

  const actualTable = tables.find(
    (table) => table.id === params.table
  ) as ITables

  const handleAddList = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const list = Array.from(formData.values()).join(" ")

    if (!list) return

    const newList = {
      idList: id,
      nameList: list,
      tasks: [],
    }

    createNewList(actualTable.id, newList)
  }

  useEffect(() => {
    setTables(tablesProject)
  }, [tablesProject])
  
  return {
    actualTable,
    tables,
    setTables,
    handleAddList
  }
}

export default useCreateList
