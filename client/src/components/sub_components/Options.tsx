import React from "react";

type question = {
  correctAnswer: string;
  text: string;
  _id: string;
  options: string[];
  points: string;
};

const Options = ({
  option,
  index,
  q,
  questions,
  setQuestions,
  handleDeleteOption,
}: {
  option: string;
  index: number;
  q: question;
  questions: question[];
  setQuestions: React.Dispatch<React.SetStateAction<question[]>>;
  handleDeleteOption: (questionId: string, optionIndex: number) => void;
}) => {
  return (
    <div className="flex items-center gap-2 mb-2">
      <input
        type="text"
        value={option}
        onChange={(e) => {
          const updatedQuestions = [...questions];
          updatedQuestions[index].options = updatedQuestions[index].options.map(
            (opt) => (opt === option ? e.target.value : opt)
          );
          setQuestions(updatedQuestions);
        }}
        placeholder="Option"
        className="w-full p-2 border rounded-md"
      />
      <button
        onClick={() => handleDeleteOption(q._id, index)}
        className="text-red-500 hover:text-red-700"
      >
        ✖
      </button>
    </div>
  );
};

export default Options;
