import express from "express"
import { login, register, upload, ask } from "../Controller/routecontroller.js"

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/upload", upload)
router.get("/ask",ask)

export default router