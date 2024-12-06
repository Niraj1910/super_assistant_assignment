import React from "react";
import Item from "./Item";

const ItemsSection = ({
  currCategory,
  setCurrCategory,
  handleRemoveItem,
  handleAddItem,
}: {
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
  handleRemoveItem: (itemName: string, categoryName: string) => void;
  handleAddItem: (itemName: string, categoryName: string) => void;
}) => {
  const handleDrop = (
    draggedId: string | number,
    droppedId: string | number
  ) => {
    // Logic for handling drag and drop across items
    console.log(draggedId, droppedId);
    handleRemoveItem;
    handleAddItem;
  };

  return (
    <div key={Date.now()} className="mb-4">
      <div className="flex justify-between">
        <label className="block text-lg font-semibold mb-2">Item</label>
        <label className="block text-lg font-semibold mr-24 mb-2">
          Belongs to
        </label>
      </div>

      {currCategory.items?.map((currItem, index) => (
        <Item
          key={Date.now().toString() + `${index}`}
          currCategory={currCategory}
          setCurrCategory={setCurrCategory}
          handleDrop={handleDrop}
          currItem={currItem}
        />
      ))}

      <button
        onClick={() =>
          setCurrCategory({
            ...currCategory,
            items: [...currCategory.items, { name: "", belongsTo: "" }],
          })
        } // Example: adding to the first category
        className="mt-2 text-blue-500 hover:text-blue-700"
      >
        + Add Item
      </button>
    </div>
  );
};

export default ItemsSection;
