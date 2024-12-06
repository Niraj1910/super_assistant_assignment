import React from "react";
import Draggable from "../Draggable";

interface ItemProps {
  item: {
    id: number;
    name: string;
    category: string;
  };
  handleDrop: (draggedId: string | number, droppedId: string | number) => void;
  setItems: (
    value: React.SetStateAction<
      {
        id: number;
        name: string;
        category: string;
      }[]
    >
  ) => void;
  items: {
    id: number;
    name: string;
    category: string;
  }[];
  categories: {
    id: number;
    name: string;
  }[];
  handleRemoveItem: (id: number) => void;
}

const Item: React.FC<ItemProps> = ({
  item,
  handleDrop,
  setItems,
  items,
  categories,
  handleRemoveItem,
}) => {
  return (
    <Draggable
      key={item.id}
      id={item.id}
      onDrop={handleDrop}
      className="flex items-center mb-2 p-2 rounded-md bg-gray-50"
      draggingClassName=" shadow-lg"
    >
      <input
        type="text"
        value={item.name}
        onChange={(e) => {
          const updatedItems = [...items];
          const index = updatedItems.findIndex((i) => i.id === item.id);
          updatedItems[index].name = e.target.value;
          setItems(updatedItems);
        }}
        placeholder={`Item`}
        className="flex-1 p-2 border rounded-md"
      />
      <select
        value={item.category}
        onChange={(e) => {
          const updatedItems = [...items];
          const index = updatedItems.findIndex((i) => i.id === item.id);
          updatedItems[index].category = e.target.value;
          setItems(updatedItems);
        }}
        className="ml-2 p-2 border rounded-md"
      >
        <option value="">Select</option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <button
        onClick={() => handleRemoveItem(item.id)}
        className="ml-2 text-red-500 hover:text-red-700"
      >
        ✖
      </button>
    </Draggable>
  );
};

export default Item;
