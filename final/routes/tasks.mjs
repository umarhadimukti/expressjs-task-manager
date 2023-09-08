import {getAllTasks, getTask, createTask, updateTask, deleteTask} from "../controllers/tasks.mjs"
import express from "express"

const router = express.Router()

router.route("/").get(getAllTasks).post(createTask)

router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask)

export default router