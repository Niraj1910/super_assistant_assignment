import { Router } from "express";
import { CategorizeQuestion } from "../models/question/categorizeQuestion.model.js";
import {
  createQuestion,
  getAllQuestions,
} from "../controllers/question.controller.js";
import { ComprehensionQuestion } from "../models/question/comprehenstionQuestion.model.js";
import { ClozeQuestion } from "../models/question/clozeQuestion.model.js";

const router = Router();

router.post("/category", (req, res) => {
  createQuestion(req, res, CategorizeQuestion);
});

router.post("/cloze", (req, res) => {
  createQuestion(req, res, ClozeQuestion);
});

router.post("/comprehension", (req, res) => {
  createQuestion(req, res, ComprehensionQuestion);
});

router.get("/category", (req, res) => {
  getAllQuestions(req, res, CategorizeQuestion);
});

router.get("/cloze", (req, res) => {
  getAllQuestions(req, res, ClozeQuestion);
});

router.get("/comprehension", (req, res) => {
  getAllQuestions(req, res, ComprehensionQuestion);
});

export { router };
