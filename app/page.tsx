'use client'

import Link from "next/link";
import { useTablesStore } from "./store/tablesStore";

export default function Home() {

  const tables = useTablesStore((state) => state.project.tables)

  return (
    <section className="p-4 h-screen text-slate-300 bg-[#081018]">
      {tables.map((table) => (
        <Link href={`tables/${table.id}`} key={table.id}>
          {table.nameTable}
        </Link>
      ))}
    </section>
  )
}
