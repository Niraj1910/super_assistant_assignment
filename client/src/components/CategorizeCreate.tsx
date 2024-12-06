import { useState } from "react";
import QuestionTypeHeader from "./QuestionTypeHeader";
import Container from "./Container";
import CategoryQuestion from "./sub_components/CategoryQuestion";
import useFetchQuestions from "../hooks/useFetchQuestions";
import { CATEGORY } from "../constants";

// interface categoryQuestionType{

//   const [question, setQuestion] = useState("");
//   const [points, setPoints] = useState("");
//   const [categories, setCategories] = useState([{ id: 1, name: "cat1" }]);
//   const [items, setItems] = useState([
//     { id: 1, name: "ans1", category: "cat1" },
//   ]);
// }

const CategorizeCreate = () => {
  const [categoryQuestions, setcategoryQuestions] = useState<number[]>([1]);

  const { data } = useFetchQuestions(CATEGORY);
  console.log("category data -> ", data);

  const handlePreview = () => {
    // const data = { question, points, categories, items };
    // console.log("Saved Question:", data);
    alert("Question Saved!");
  };

  return (
    <Container>
      {/* Header Section */}
      <QuestionTypeHeader
        color="blue"
        handlePreview={handlePreview}
        type="Create Categorize Question"
      />

      {/* Main Content: Left (Question Section) and Right (Add/Delete Buttons) */}
      {categoryQuestions.map((val, idx) => (
        <CategoryQuestion
          categoryQuestions={categoryQuestions}
          idx={idx}
          setcategoryQuestions={setcategoryQuestions}
          val={val}
        />
      ))}
    </Container>
  );
};

export default CategorizeCreate;
