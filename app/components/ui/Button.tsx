import React, { Dispatch, SetStateAction } from 'react'

interface Props {
  children: React.ReactNode;
  action?: () => void | Dispatch<SetStateAction<boolean | undefined>>;
  style?: string;
  type?: "submit" | "reset" | "button" | undefined;
}

export default function Button({ children, action, style, type }: Props) {
  return (
    <button
      type={type}
      onClick={action}
      className={`${style} bg-secondary hover:bg-slate-700 
      rounded-md inline-flex gap-2 text-sm items-center`}
    >
      {children}
    </button>
  );
}
