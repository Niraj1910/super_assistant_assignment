import React from "react";
import { Item } from "../../interfaces";

const CategoriesSection = ({
  currCategory,
  setCurrCategory,
  handleRemoveCategory,
  handleAddCategory,
}: {
  currCategory: {
    _id: string;
    question: string;
    points: string;
    categories: string[];
    items: Item[];
  };
  setCurrCategory: React.Dispatch<
    React.SetStateAction<{
      _id: string;
      question: string;
      points: string;
      categories: string[];
      items: Item[];
    }>
  >;
  handleRemoveCategory: (id: string) => void;
  handleAddCategory: () => void;
}) => {
  const handleCategoryChange = (categoryName: string, newName: string) => {
    setCurrCategory({
      ...currCategory,
      categories: currCategory.categories.filter((val) =>
        val === categoryName ? newName : val
      ),
    });
  };

  return (
    <div key={crypto.randomUUID()} className="mb-4">
      <label className="block text-lg font-semibold mb-2">Categories</label>
      {currCategory.categories?.map((category) => (
        <div key={category} className="flex items-center mb-2">
          <input
            type="text"
            value={category}
            onChange={(e) => handleCategoryChange(category, e.target.value)}
            placeholder="Category Name"
            className="flex-1 p-2 border rounded-md"
          />
          <button
            onClick={() => handleRemoveCategory(category)}
            className="ml-2 text-red-500 hover:text-red-700"
          >
            ✖
          </button>
        </div>
      ))}
      <button
        onClick={handleAddCategory}
        className="mt-2 text-blue-500 hover:text-blue-700"
      >
        + Add Category
      </button>
    </div>
  );
};

export default CategoriesSection;
