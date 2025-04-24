import express from "express"
import { login, register, ai } from "../Controller/routecontroller.js"

const router = express.Router();

router.post("/register",register)
router.post("/login", login)
router.post("/ai",ai)

export default router