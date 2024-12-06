export interface Category {
  name: string;
  _id: string;
  items: string[];
}

export type CategoryQuestionsType = {
  _id: string;
  question: string;
  points: string;
  categories: Category[];
}[];

export type ClozeQuestionType = {
  _id: string;
  sentence: string;
  preview: string;
  options: string[];
  points: string;
  blanks: { position: number; value: string; _id: string };
}[];

export type ComprehensionQuestionType = {
  _id: string;
  passage: string;
  questions: {
    correctAnswer: string;
    text: string;
    _id: string;
    options: string[];
    points: string;
  }[];
}[];
