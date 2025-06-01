import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { deleteMytask, getMytask, newtask, updateMytask } from "../controllers/task.js";


const router = express.Router();

router.post('/new',isAuthenticated, newtask)
router.get('/my',isAuthenticated, getMytask)

router.route('/:id').put(isAuthenticated,updateMytask).delete(isAuthenticated,deleteMytask)

export default router;