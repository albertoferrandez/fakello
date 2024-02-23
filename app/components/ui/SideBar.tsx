import React from 'react'

interface Props {
  children: React.ReactNode
}

function SideBar({ children }: Props) {
  return (
    <aside
      className=' bg-primary relative w-72 h-full min-h-full z-10'
      style={{ borderRight: "1px solid hsla(211, 18%, 68%, 0.16)" }}
    >
      {children}
    </aside>
  )
}

export default SideBar
