import mongoose from "mongoose";

const { Schema } = mongoose;

const CategorizeQuestionSchema = new Schema({
  question: { type: String },
  points: { type: String },
  categories: [
    {
      name: { type: String, required: true },
      items: [{ type: String }], // Items to categorize
    },
  ],
});

const CategorizeQuestion = mongoose.model(
  "categorize",
  CategorizeQuestionSchema
);

export { CategorizeQuestion };
