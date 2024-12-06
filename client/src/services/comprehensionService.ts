import { ComprehensionQuestionType } from "../interfaces";

export const saveComprehensionData = async (
  data: ComprehensionQuestionType
) => {
  try {
    const response = await fetch("/api/comprehension", {
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error saving comprehension data:", error);
    throw error;
  }
};
