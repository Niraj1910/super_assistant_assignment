const CategoriesSection = ({
  categories,
  setCategories,
  handleRemoveCategory,
  handleAddCategory,
}: {
  categories: {
    id: number;
    name: string;
  }[];
  setCategories: (
    value: React.SetStateAction<
      {
        id: number;
        name: string;
      }[]
    >
  ) => void;
  handleRemoveCategory: (id: number) => void;
  handleAddCategory: () => void;
}) => {
  return (
    <div className="mb-4">
      <label className="block text-lg font-semibold mb-2">Categories</label>
      {categories.map((category, index) => (
        <div key={category.id} className="flex items-center mb-2">
          <input
            type="text"
            value={category.name}
            onChange={(e) => {
              const updatedCategories = [...categories];
              updatedCategories[index].name = e.target.value;
              setCategories(updatedCategories);
            }}
            placeholder={`Category ${index + 1}`}
            className="flex-1 p-2 border rounded-md"
          />
          <button
            onClick={() => handleRemoveCategory(category.id)}
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
