import { Router } from "express";

import { signIn, signUp } from "../controllers/UserController";

const router = Router();

router.get("/", signIn);
router.post("/", signUp);

export default router;
