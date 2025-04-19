import express from "express"
import register from "../Controller/authcontroller.js"
import login from "../Controller/authcontroller.js"
const router = express.Router();

router.post("/register",register)
router.post("/login", login)

export default router