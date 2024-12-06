import React from "react";
import Item from "./Item";

const ItemsSection = ({
  items,
  setItems,
  categories,
  handleRemoveItem,
  handleAddItem,
}: {
  items: {
    id: number;
    name: string;
    category: string;
  }[];
  setItems: (
    value: React.SetStateAction<
      {
        id: number;
        name: string;
        category: string;
      }[]
    >
  ) => void;
  categories: {
    id: number;
    name: string;
  }[];
  handleRemoveItem: (id: number) => void;
  handleAddItem: () => void;
}) => {
  const handleDrop = (
    draggedId: string | number,
    droppedId: string | number
  ) => {
    const dragIndex = items.findIndex((item) => item.id === +draggedId);
    const dropIndex = items.findIndex((item) => item.id === +droppedId);

    if (dragIndex !== -1 && dropIndex !== -1 && dragIndex !== dropIndex) {
      const updatedItems = [...items];
      const [draggedItem] = updatedItems.splice(dragIndex, 1);
      updatedItems.splice(dropIndex, 0, draggedItem);
      setItems(updatedItems);
    }
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between">
        <label className="block text-lg font-semibold mb-2">Item</label>
        <label className="block text-lg font-semibold mr-24 mb-2">
          Belongs to
        </label>
      </div>

      {items.map((item) => (
        <Item
          categories={categories}
          handleDrop={handleDrop}
          handleRemoveItem={handleRemoveItem}
          item={item}
          items={items}
          setItems={setItems}
        />
      ))}
      <button
        onClick={handleAddItem}
        className="mt-2 text-blue-500 hover:text-blue-700"
      >
        + Add Item
      </button>
    </div>
  );
};

export default ItemsSection;
