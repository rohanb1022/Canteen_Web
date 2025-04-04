import express from "express";
import { login, logout, signup, authCheck } from "../../controllers/App/auth.controller.js";
import protectRoute from "../../middleware/App/protectRoute.js";

const router = express.Router();

router.post("/signup",signup );
router.post("/login",login);
router.post("/logout",logout);
router.get("/authCheck",protectRoute,authCheck);

export default router;
