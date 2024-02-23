import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

import { IconPlus } from "@tabler/icons-react";

import { IProject } from "../types/project";
import Button from "./ui/Button";
import SideBarHeader from "./ui/SideBarHeader";
import SideBar from "./ui/SideBar";
import FormCreateTable from "./table/FormCreateTable";
import DropDown from "./ui/DropDown";
import EditDeleteTable from "./table/EditDeleteTable";

interface Props {
  project: IProject;
}

export default function SidebarComponent({ project }: Props) {
  const params = useParams();
  const [openForm, setOpenForm] = useState<boolean>();

  return (
    <SideBar>
      <SideBarHeader project={project} />
      <div className="flex flex-col text-slate-300">
        <div className="py-2 px-4 flex justify-between items-center">
          <h1 className="font-extrabold">Tus tablas</h1>
          <div className="relative">
            <Button style="p-1" action={() => setOpenForm(!openForm)}>
              <IconPlus color="#cbd5e1" />
            </Button>
            <DropDown open={openForm} setOpen={setOpenForm}>
              <FormCreateTable setOpen={setOpenForm} />
            </DropDown>
          </div>
        </div>
        {project.tables.map((table) => (
          <div
            key={table.id}
            className={`w-full px-2 py-4 flex items-center justify-between gap-6
            ${params.table === table.id ? "bg-slate-600" : ""}
            hover:bg-slate-800 text-sm`}
          >
            <Link
              href={`/tables/${table.id}`}
              className="flex items-center gap-2"
            >
              <div
                style={{ backgroundColor: table.color }}
                className="h-6 w-6 rounded"
              />
              {table.nameTable}
            </Link>
            <EditDeleteTable id={table.id} />
          </div>
        ))}
      </div>
    </SideBar>
  );
}
