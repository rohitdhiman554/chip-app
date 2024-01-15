import { useState, KeyboardEvent } from "react";

import { initialItems } from "../constant";
import { Item, SearchState } from "../types";

const Search = () => {
  const [state, setState] = useState<SearchState>({
    items: initialItems,
    selectedItems: [],
    highlightedIndex: null,
  });
  const [inputValue, setInputValue] = useState("");

  const handleSelectItem = (item: Item) => {
    setState({
      ...state,
      selectedItems: [...state.selectedItems, item],
      items: state.items.filter((i) => i !== item),
      highlightedIndex: null,
    });
    setInputValue("");
  };

  const handleRemoveItem = (item: Item) => {
    setState({
      ...state,
      selectedItems: state.selectedItems.filter((i) => i !== item),
      items: [...state.items, item],
      highlightedIndex: null,
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && inputValue === "") {
      const { selectedItems, highlightedIndex } = state;
      if (highlightedIndex !== null) {
        const newItem = selectedItems[highlightedIndex];
        setState({
          ...state,
          selectedItems: selectedItems.filter(
            (_, index) => index !== highlightedIndex
          ),
          items: [...state.items, newItem],
          highlightedIndex: null,
        });
      } else if (selectedItems.length > 0) {
        setState({ ...state, highlightedIndex: selectedItems.length - 1 });
      }
    }
  };

  const filteredItems = state.items.filter((item) =>
    item.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="w-full max-w-xs">
      <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded">
        {state.selectedItems.map((item, index) => (
          <div
            key={item}
            className={`flex items-center gap-2 px-3 py-1 rounded ${
              state.highlightedIndex === index ? "bg-blue-300" : "bg-blue-500"
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
          className="flex-1 focus:outline-none"
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
