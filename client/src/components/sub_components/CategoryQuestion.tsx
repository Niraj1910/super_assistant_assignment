import { useState } from "react";
import Points from "./Points";
import CategoriesSection from "./CategoriesSection";
import ItemsSection from "./ItemsSection";
// import SideButtons from "./SideButtons";

interface CategoryQuestionProps {
  idx: number;
  val: number;
  categoryQuestions: number[];
  setcategoryQuestions: React.Dispatch<React.SetStateAction<number[]>>;
}

const CategoryQuestion: React.FC<CategoryQuestionProps> = ({ idx }) => {
  const [question, setQuestion] = useState("");
  const [points, setPoints] = useState("");
  const [categories, setCategories] = useState([{ id: 1, name: "cat1" }]);
  const [items, setItems] = useState([
    { id: 1, name: "ans1", category: "cat1" },
  ]);

  const handleAddCategory = () => {
    setCategories([...categories, { id: Date.now(), name: "" }]);
  };

  const handleRemoveCategory = (id: number) => {
    setCategories(categories.filter((category) => category.id !== id));
    setItems(items.filter((item) => Number(item.category) !== id)); // Remove associated items
  };

  const handleAddItem = () => {
    setItems([...items, { id: Date.now(), name: "", category: "" }]);
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="mb-2 flex justify-start items-start">
      {/* Left Side: Question Creation Section */}
      <div
        key={idx}
        className="w-[90%] border border-l-blue-200 border-l-8 p-6 rounded-md"
      >
        {/* Question and Points Section */}
        <div className="flex justify-between items-center mb-6">
          {/* Question Input */}
          <div className="w-[75%]">
            <label className="block text-lg font-semibold mb-2">
              {`${idx + 1}.`} Question
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question"
              className="w-full p-2 border rounded-md"
            />
          </div>
          {/* Points Input */}
          <div className="w-[20%]">
            <Points points={points} setPoints={setPoints} />
          </div>
        </div>

        {/* Categories Section */}
        <CategoriesSection
          categories={categories}
          setCategories={setCategories}
          handleAddCategory={handleAddCategory}
          handleRemoveCategory={handleRemoveCategory}
        />

        {/* Items Section */}
        <ItemsSection
          categories={categories}
          items={items}
          setItems={setItems}
          handleRemoveItem={handleRemoveItem}
          handleAddItem={handleAddItem}
        />
      </div>

      {/* Right Side: Add/Delete Buttons */}
      {/* <SideButtons
        index={idx}
        questionsLength={categoryQuestions}
        setQuestionsLength={setcategoryQuestions}
      /> */}
    </div>
  );
};

export default CategoryQuestion;
