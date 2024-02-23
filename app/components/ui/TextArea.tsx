import React from 'react'

interface Props {
  name: string;
}

function TextArea({ name }: Props) {
  return (
    <textarea
      name={name}
      className="p-1 text-sm text-gray-900 border 
              border-gray-300 rounded-lg bg-gray-50 
              focus:ring-blue-500 focus:border-blue-500 
              dark:bg-[#1c2532] dark:border-gray-600 
              dark:placeholder-gray-400 dark:text-white 
              dark:focus:ring-blue-500 
              dark:focus:border-blue-500 resize-none w-full"
    />
  );
}

export default TextArea
