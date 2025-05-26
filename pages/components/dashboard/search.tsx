import { faClose, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
interface OrdersTableProps {
  searchQuery: string;
  setSearchQuery: (setSearchQuery: string) => void;
  placeholderCustom?: string;
}
export default function SearchBar({
  searchQuery,
  setSearchQuery,
  placeholderCustom = "Buscar personas ..",
}: OrdersTableProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="w-full flex rounded-full items-center border border-gray-light dark:border-gray-darker px-3 py-2 bg-pd-light text-gray-darkest dark:text-white text-sm md:text-base ">
      <FontAwesomeIcon icon={faMagnifyingGlass} className="w-3 h-auto mr-2.5" />
      <input
        ref={inputRef}
        type="text"
        className="bg-transparent outline-none w-full text-black dark:text-white"
        placeholder={placeholderCustom}
        defaultValue={searchQuery}
        onBlur={(e) => {
          setSearchQuery(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const target = e.target as HTMLInputElement;
            target.blur();
          }
        }}
        maxLength={100}
      />
      {searchQuery !== "" && (
        <span
          className="cursor-pointer"
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.value = "";
            }

            setSearchQuery("");
          }}
        >
          <FontAwesomeIcon icon={faClose} className="w-3 h-auto me-2" />
        </span>
      )}
    </div>
  );
}
