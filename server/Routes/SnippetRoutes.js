import { Router } from "express";
import {
  submitSnippet,
  fetchSnippet,
  reSubmitSnippet,
  deleteSnippet,
} from "../controllers/SnippetController";
import auth from "../middleware/auth";

const router = Router();

router.get("/:id", auth, fetchSnippet);
router.post("/", auth, submitSnippet);
router.put("/:id", auth, reSubmitSnippet);
router.delete("/:id", auth, deleteSnippet);

export default router;
