import { useState, KeyboardEvent } from "react";
import { initialItems } from "../constant";
import { Item } from "../types";

const Search = () => {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [inputValue, setInputValue] = useState("");
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const handleSelectItem = (item: Item) => {
    setSelectedItems([...selectedItems, item]);
    setItems(items.filter((i) => i !== item));
    setInputValue("");
    setHighlightedIndex(null);
  };

  const handleRemoveItem = (item: Item) => {
    setSelectedItems(selectedItems.filter((i) => i !== item));
    setItems([...items, item]);
    setHighlightedIndex(null);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && inputValue === "") {
      if (highlightedIndex !== null) {
        handleRemoveItem(selectedItems[highlightedIndex]);
        setHighlightedIndex(null);
      } else if (selectedItems.length > 0) {
        setHighlightedIndex(selectedItems.length - 1);
      }
    }
  };

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="w-full max-w-xs">
      <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded">
        {selectedItems.map((item, index) => (
          <div
            key={item}
            className={`flex items-center gap-2 px-3 py-1 rounded ${
              highlightedIndex === index ? "bg-blue-300" : "bg-blue-500"
            } text-white`}
          >
            {item}
            <button onClick={() => handleRemoveItem(item)} className="text-sm">
              X
            </button>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
          placeholder="Type to search..."
        />
      </div>
      {inputValue ? (
        <ul className="absolute w-full max-w-xs mt-1 border border-gray-300 bg-white rounded shadow-lg">
          {filteredItems.map((item) => (
            <li
              key={item}
              onClick={() => handleSelectItem(item)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Search;
