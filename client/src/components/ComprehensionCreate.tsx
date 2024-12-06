import { useMemo, useState } from "react";
import QuestionTypeHeader from "./QuestionTypeHeader";
import Container from "./Container";
import useFetchQuestions from "../hooks/useFetchQuestions";
import { COMPREHENSION } from "../constants";
import { ComprehensionQuestionType } from "../interfaces";
import ComprehensionQuestions from "./sub_components/ComprehensionQuestions";

const ComprehensionCreate = () => {
  const { data } = useFetchQuestions(COMPREHENSION);

  const [comprehensionQuestions, setComprehensionQuestions] =
    useState<ComprehensionQuestionType | null>(null);

  useMemo(() => {
    if (data) {
      setComprehensionQuestions(data);
    }
  }, [data]);

  const handlePreview = () => {
    console.log("Comprehension Questions Data:", comprehensionQuestions);
    alert("Comprehension Saved!");
  };

  return (
    <Container>
      <QuestionTypeHeader
        type="Create Comprehension Question"
        handlePreview={handlePreview}
        color="orange"
      />
      {comprehensionQuestions &&
        comprehensionQuestions.length &&
        comprehensionQuestions.map((comprehension) => (
          <ComprehensionQuestions
            key={comprehension._id}
            comprehensionQuestion={comprehensionQuestions}
            setComprehensionQuestions={setComprehensionQuestions}
            comp={comprehension}
          />
        ))}
    </Container>
  );
};

export default ComprehensionCreate;
