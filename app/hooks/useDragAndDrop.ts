import { Dispatch, SetStateAction } from "react"
import { ITables } from "../types/project"

interface Props {
  actualTable: ITables
  tables: ITables[]
  setTables: Dispatch<SetStateAction<ITables[]>>
}

function useDragAndDrop({ actualTable, tables, setTables }: Props) {
  const onDragEnd = (result: { destination: any; source?: any }) => {
    if (!result.destination) return

    const { source, destination } = result
    const sourceIndex = source.index
    const destinationIndex = destination.index

    const updatedLists = Array.from(actualTable!.lists)
    const [removed] = updatedLists.splice(sourceIndex, 1)
    updatedLists.splice(destinationIndex, 0, removed)

    const updatedTables = tables.map((table) => {
      if (table.id === actualTable!.id) {
        return {
          ...table,
          lists: updatedLists,
        }
      }
      return table
    })

    setTables(updatedTables)
  }

  return {
    onDragEnd,
  }
}

export default useDragAndDrop
