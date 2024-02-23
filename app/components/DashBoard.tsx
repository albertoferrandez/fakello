"use client";

import { useTablesStore } from "../store/tablesStore";

import Header from "./Header";
import SidebarComponent from "./SidebarComponent";

export default function DashBoard({ children }: { children: React.ReactNode }) {
  
  const project = useTablesStore((state) => state.project);

  return (
    <>
      <Header />
      <main className="flex flex-row flex-grow">
        <SidebarComponent
          project={project}
        />

        <div className="w-full">{children}</div>
      </main>
    </>
  );
}
