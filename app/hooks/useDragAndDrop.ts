import { Dispatch, SetStateAction } from "react";
import { ITables, List } from "../types/project";
import { useTablesStore } from "../store/tablesStore";

interface Props {
  actualTable: ITables;
  orderedList: List[];
  setOrderedList: Dispatch<SetStateAction<List[]>>;
}

function useDragAndDrop({ actualTable, orderedList, setOrderedList }: Props) {
  const reorderLists = useTablesStore((state) => state.reorderLists);

  function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "list") {
      const reorderedLists = reorder(
        orderedList,
        source.index,
        destination.index
      );

      setOrderedList(reorderedLists);
      reorderLists(actualTable.id, reorderedLists);
    }
  };

  return {
    onDragEnd,
  };
}

export default useDragAndDrop;
