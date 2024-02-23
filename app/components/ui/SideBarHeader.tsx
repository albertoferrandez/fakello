import React from "react"
import { IProject } from "../../types/project"

interface Props {
  project: IProject
}

function SideBarHeader({ project }: Props) {
  return (
    <div
      className="p-4 border-b-[0.5px] border-slate-300"
      style={{ borderBottom: "1px solid hsla(211, 18%, 68%, 0.16)" }}
    >
      <div className="flex justify-between items-center gap-4">
        <div
          className="relative inline-flex items-center 
              justify-center w-10 h-10 overflow-hidden 
              rounded-md"
          style={{
            backgroundColor: project.bgColor,
          }}
        >
          <span className="font-medium" style={{ color: project.colorText }}>
            JL
          </span>
        </div>

        <div className="text-sm dark:text-slate-300">
          <h3>{project.nameProject}</h3>
        </div>

        <div></div>
      </div>
    </div>
  );
}

export default SideBarHeader;
