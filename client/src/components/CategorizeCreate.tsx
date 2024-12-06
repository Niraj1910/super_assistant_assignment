import { useMemo, useState } from "react";
import QuestionTypeHeader from "./QuestionTypeHeader";
import Container from "./Container";
import CategoryQuestion from "./sub_components/CategoryQuestion";
import useFetchQuestions from "../hooks/useFetchQuestions";
import { CATEGORY } from "../constants";
import { CategorizeQuestionType } from "../interfaces";

const CategorizeCreate = () => {
  const [categoryQuestions, setCategoryQuestions] =
    useState<CategorizeQuestionType | null>(null);

  const { data } = useFetchQuestions(CATEGORY);

  // Set category questions on data load
  useMemo(() => {
    if (data) {
      setCategoryQuestions(data);
    }
  }, [data]);

  // Handle preview and print data
  const handlePreview = () => {
    console.log("Categorize Questions Data:", categoryQuestions);
    alert("Category Saved!");
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
      {categoryQuestions &&
        categoryQuestions.length > 0 &&
        categoryQuestions?.map((category, idx) => (
          <CategoryQuestion
            key={category._id}
            category={category}
            categoryQuestions={categoryQuestions}
            setCategoryQuestions={setCategoryQuestions}
            idx={idx}
          />
        ))}
    </Container>
  );
};

export default CategorizeCreate;
