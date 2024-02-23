export interface IProject {
  nameProject: string;
  description: string;
  bgColor: string;
  colorText: string;
  tables: ITables[]
}

export interface ITables {
    id: string
    nameTable: string
    lists: List[]
    color: string 
}

export interface List {
    idList: string
    nameList: string
    tasks: Tasks[]
}

export interface Tasks {
  idTask: string;
  nameTask: string;
  status: {
    color: string;
    state: string;
  };
  taskDescription: string;
  createdAt: string;
}