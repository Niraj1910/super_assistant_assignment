import React from "react";
import Draggable from "../Draggable";

interface ItemProps {
  handleDrop: (draggedId: string | number, droppedId: string | number) => void;
  currItem: {
    name: string;
    belongsTo: string;
  };
  currCategory: {
    _id: string;
    question: string;
    points: string;
    categories: string[];
    items: {
      name: string;
      belongsTo: string;
    }[];
  };
  setCurrCategory: React.Dispatch<
    React.SetStateAction<{
      _id: string;
      question: string;
      points: string;
      categories: string[];
      items: {
        name: string;
        belongsTo: string;
      }[];
    }>
  >;
}

const Item: React.FC<ItemProps> = ({
  currCategory,
  handleDrop,
  setCurrCategory,
  currItem,
}) => {
  const handleItemChange = (itemName: string, newName: string) => {
    setCurrCategory({
      ...currCategory,
      items: currCategory.items.filter((val) =>
        val.name === itemName
          ? { name: newName, belongsTo: val.belongsTo }
          : val
      ),
    });
  };

  return (
    <Draggable
      id={Date.now()}
      onDrop={handleDrop}
      className="flex items-center mb-2 p-2 rounded-md bg-gray-50"
      draggingClassName=" shadow-lg"
    >
      <input
        type="text"
        value={currItem.name}
        onChange={(e) => handleItemChange(currItem.name, e.target.value)}
        placeholder={`Item`}
        className="flex-1 p-2 border rounded-md"
      />
      <select
        value={currItem.belongsTo}
        onChange={() => {}}
        className="ml-2 p-2 border rounded-md"
      >
        {currCategory.categories?.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <button
        onClick={() =>
          setCurrCategory({
            ...currCategory,
            items: currCategory.items.filter(
              (val) =>
                val.name !== currItem.name &&
                val.belongsTo !== currItem.belongsTo
            ),
          })
        }
        className="ml-2 text-red-500 hover:text-red-700"
      >
        ✖
      </button>
    </Draggable>
  );
};

export default Item;
