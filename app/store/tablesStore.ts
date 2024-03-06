import { create } from "zustand";
import { IProject, List, Tasks } from "../types/project";

interface State {
  project: IProject;
  createNewTable: (title: string, color: string) => void;
  deleteTable: (id: string) => void;
  createNewList: (tableId: string, newList: List) => void;
  createNewTaskAtList: (listId: string, newTask: Tasks) => void;
  reorderLists: (tableId: string, newOrderLists: List[]) => void;
}

export const useTablesStore = create<State>((set) => ({
  project: {
    nameProject: "Nombre del Proyecto",
    description: "Descripción del Proyecto",
    bgColor: "#0c0",
    colorText: "#fff",

    tables: [
      {
        id: "table-example-1",
        nameTable: "Tu primera tabla",
        lists: [
          {
            idList: "egifqwgGYE978373",
            nameList: "Tu primera lista de tareas",
            tasks: [],
          },
        ],
        color: "#f44336",
      },
    ],
  },

  createNewTable: (titleTable, colorTable) =>
    set((state) => ({
      project: {
        ...state.project,
        tables: [
          ...state.project.tables,
          {
            id: titleTable.replace(/\s/g, "").toLowerCase(),
            nameTable: titleTable,
            color: colorTable,
            lists: [],
          },
        ],
      },
    })),

  deleteTable: (id: string) =>
    set((state) => ({
      project: {
        ...state.project,
        tables: state.project.tables.filter((table) => table.id !== id),
      },
    })),

  createNewList: (tableId: string, newList: List) =>
    set((state) => {
      const updatedTables = state.project.tables.map((table) => {
        if (table.id === tableId) {
          return {
            ...table,
            lists: [...table.lists, newList],
          };
        }
        return table;
      });

      return {
        project: {
          ...state.project,
          tables: updatedTables,
        },
      };
    }),

  createNewTaskAtList: (listId: string, newTask: Tasks) =>
    set((state) => {
      const updatedTables = state.project.tables.map((table) => {
        const updatedLists = table.lists.map((list) => {
          if (list.idList === listId) {
            return {
              ...list,
              tasks: [...list.tasks, newTask],
            };
          }
          return list;
        });

        return {
          ...table,
          lists: updatedLists,
        };
      });

      return {
        project: {
          ...state.project,
          tables: updatedTables,
        },
      };
    }),

  reorderLists: (tableId: string, newOrderLists: List[]) =>
    set((state) => {
      const updatedTables = state.project.tables.map((table) => {
        if (table.id === tableId) {
          return {
            ...table,
            lists: newOrderLists,
          };
        }
        return table;
      });

      return {
        project: {
          ...state.project,
          tables: updatedTables,
        },
      };
    }),
}));
