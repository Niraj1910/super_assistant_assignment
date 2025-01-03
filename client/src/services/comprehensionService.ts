import { COMPREHENSION, SERVER_URL } from "../constants";

type Question = {
  correctAnswer: string;
  text: string;
  _id?: string;
  options: string[];
  points: string;
};

type ComprehensionData = {
  _id?: string;
  passage: string;
  questions: Question[];
};

export const saveComprehensionData = async (
  id: string,
  passage: string,
  questions: Question[]
) => {
  try {
    // Create the object using the defined types
    let newQuestion: ComprehensionData = { passage, questions };

    if (!id.includes("-")) {
      newQuestion = { _id: id, ...newQuestion };
    } else {
      // Remove the _id from each question
      const sanitizedQuestions = questions?.map(({ _id, ...rest }) => rest);
      newQuestion.questions = sanitizedQuestions;
    }

    console.log("Data to be saved: ", newQuestion);

    const response = await fetch(`${SERVER_URL}/${COMPREHENSION}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error saving comprehension data:", error);
    throw error;
  }
};

export const deleteComprehensionData = async (id: string) => {
  try {
    if (id.includes("-")) return null;

    const response = await fetch(`${SERVER_URL}/${COMPREHENSION}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error saving comprehension data:", error);
    throw error;
  }
};
