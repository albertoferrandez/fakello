import { IconCalendarMonth, IconPencil } from '@tabler/icons-react';
import React from 'react'
import Button from '../ui/Button';
import { List } from '@/app/types/project';

interface Props {
  list: List;
}

function ListTasks({list}: Props) {
  return (
    <div
      className='flex flex-col gap-1 items-center'
    >
      {list.tasks.map((el) => (
        <article
          key={el.idTask}
          className="bg-secondary rounded-md w-11/12 mt-1 mb-1"
        >
          <div
            className="flex flex-row justify-between px-1 py-2 text-xs"
            style={{ borderBottom: "1px solid hsla(211, 18%, 68%, 0.16)" }}
          >
            <h1 className={el.status.color}>{el.status.state}</h1>
            <span className="flex items-center gap-1">
              <IconCalendarMonth size={15} />
              {el.createdAt}
            </span>
          </div>
          <div className="px-2 py-3 flex justify-between items-center">
            <p>{el.nameTask}</p>
            <div>
              <Button style="p-1">
                <IconPencil size={15} />
              </Button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default ListTasks
