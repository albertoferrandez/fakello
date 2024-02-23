import { Dispatch, SetStateAction, useEffect, useRef } from "react";

interface Props {
    children: React.ReactNode 
    open: boolean | undefined
    setOpen: Dispatch<SetStateAction<boolean | undefined>>
}

export default function DropDown({children, open, setOpen}: Props) {
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWindowClick = (event: MouseEvent) => {
      if (open === true && dropdownRef.current) {
        const targetId = (event.target as HTMLElement)?.id;
        const dropdownElement = dropdownRef.current;
        if (
          !dropdownElement.contains(event.target as Node) &&
          targetId !== "dropdown-item"
        ) {
          setOpen(false);
        }
      }
    };

    document.addEventListener("click", handleWindowClick);

    return () => {
      document.removeEventListener("click", handleWindowClick);
    };
  }, [open, setOpen])

  return (
    <>
      {open && (
        <div
          ref={dropdownRef}
          id="dropdown-item"
          className="z-40 absolute py-2 px-4 overflow-hidden 
          bg-secondary rounded-lg shadow w-60"
          style={{ top: "100%", left: 0 }}
        >
          {children}
        </div>
      )}
    </>
  );
}
