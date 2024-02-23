import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react";
import React, { useState } from "react";
import Button from "../ui/Button";
import DropDown from "../ui/DropDown";
import { useTablesStore } from "../../store/tablesStore";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
}

function EditDeleteTable({ id }: Props) {
  const [openDeleteEdit, setOpenDeleteEdit] = useState<boolean>();
  const tableStore = useTablesStore((state) => state.deleteTable);
  const router = useRouter();

  return (
    <div className="relative">
      <Button style="p-1" action={() => setOpenDeleteEdit(!openDeleteEdit)}>
        <IconDotsVertical color="#cbd5e1" />
      </Button>

      <DropDown open={openDeleteEdit} setOpen={setOpenDeleteEdit}>
        <div className="flex flex-row gap-4">
          <Button style="text-xs p-1">
            EDITAR TABLA <IconEdit />
          </Button>

          <Button
            style="text-xs p-1"
            action={() => (router.push("/"), tableStore(id))}
          >
            BORRAR TABLA
            <IconTrash />
          </Button>
        </div>
      </DropDown>
    </div>
  );
}

export default EditDeleteTable;
