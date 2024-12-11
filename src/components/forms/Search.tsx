import React, { useState, useEffect } from "react";
import { InputBox } from "../forms/InputBox";

interface SearchProps<T> {
  items: T[];
  filterFunction: (item: T, query: string) => boolean;
  onSelect: (selectedItem: T) => void;
  placeholder?: string;
  id?: string;
  name?: string;
}

export const Search = <T extends { id: string; name: string }>({
  items,
  filterFunction,
  onSelect,
  placeholder = "Search...",
  id = "search",
  name = "search",
}: SearchProps<T>) => {
  const [query, setQuery] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<T[]>([]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setFilteredItems([]);
    } else {
      setFilteredItems(items.filter((item) => filterFunction(item, query)));
    }
  }, [query, items, filterFunction]);

  return (
    <div className="relative">
      <InputBox
        type="text"
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
        id={id}
        name={name}
        placeholder={placeholder}
      />
      {filteredItems.length > 0 && (
        <ul className="absolute top-full mt-1 max-h-40 w-full overflow-y-auto rounded-md border bg-white shadow-md">
          {filteredItems.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                onSelect(item);
                setQuery("");
                setTimeout(() => setFilteredItems([]), 0);
              }}
              className="cursor-pointer p-2 hover:bg-gray-200"
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
