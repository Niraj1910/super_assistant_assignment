import { useState } from "react";
import Points from "./Points";
import Options from "./Options";
import SideButtons from "./SideButtons";
import { ComprehensionQuestionType } from "../../interfaces";

type ComprehensionProps = {
  comp: {
    _id: string;
    passage: string;
    questions: {
      correctAnswer: string;
      text: string;
      _id: string;
      options: string[];
      points: string;
    }[];
  };
  comprehensionQuestion: ComprehensionQuestionType;
  setComprehensionQuestions: React.Dispatch<
    React.SetStateAction<ComprehensionQuestionType | null>
  >;
};

const ComprehensionQuestions: React.FC<ComprehensionProps> = ({
  comprehensionQuestion,
  setComprehensionQuestions,
  comp,
}) => {
  const [passage, setPassage] = useState(comp.passage);
  const [questions, setQuestions] = useState(comp.questions);

  const handleAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        _id: crypto.randomUUID(),
        text: "",
        correctAnswer: "",
        options: [],
        points: "0",
      },
    ]);
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q._id !== id));
  };

  const handleAddOption = (questionId: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q._id === questionId ? { ...q, options: [...q.options, ""] } : q
      )
    );
  };

  const handleDeleteOption = (questionId: string, optionIndex: number) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q._id === questionId
          ? {
              ...q,
              options: q.options.filter((_, idx) => idx !== optionIndex),
            }
          : q
      )
    );
  };

  return (
    <div className="flex mb-4 border-b-2 rounded-lg">
      <div className="w-[90%] border-l-8 border-l-orange-300 p-6 rounded-md">
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Passage*</label>
          <textarea
            value={passage}
            onChange={(e) => setPassage(e.target.value)}
            placeholder="Type passage here..."
            className="w-full min-h-[50px] max-h-[500px] p-2 border rounded-md"
          />
        </div>

        {questions.map((q, index) => (
          <div key={q._id} className="mb-6 border p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <textarea
                value={q.text}
                onChange={(e) => {
                  const updated = [...questions];
                  updated[index].text = e.target.value;
                  setQuestions(updated);
                }}
                placeholder={`Question ${index + 1}`}
                className="w-[80%] p-2 border rounded-md"
              />
              <Points
                points={q.points}
                setPoints={(newPoints) => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[index].points = newPoints;
                  setQuestions(updatedQuestions);
                }}
              />

              <button
                onClick={() => handleDeleteQuestion(q._id)}
                className="text-red-500 hover:text-red-700"
              >
                ✖
              </button>
            </div>

            {q.options.map((option, idx) => (
              <Options
                key={`${q._id}-option-${idx}`}
                option={option}
                index={index}
                q={q}
                handleDeleteOption={(questionId) =>
                  handleDeleteOption(questionId, idx)
                }
                questions={questions}
                setQuestions={setQuestions}
              />
            ))}

            <button
              onClick={() => handleAddOption(q._id)}
              className="text-blue-500 hover:text-blue-700"
            >
              + Add Option
            </button>
          </div>
        ))}

        <button
          onClick={handleAddQuestion}
          className="mt-4 text-blue-500 hover:text-blue-700"
        >
          + Add Question
        </button>
      </div>
      <SideButtons
        comprehensionQuestions={comprehensionQuestion}
        setComprehensionQuestions={setComprehensionQuestions}
        passageId={comp._id}
      />
    </div>
  );
};

export default ComprehensionQuestions;
