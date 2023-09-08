//import Task model dari file tasks.mjs
import Task from "../models/tasks.mjs" 
//import async wrapper dari file async.js
import { asyncWrapper } from "../middleware/async.js"
//import customError class dari file custom_error.js
import { CustomError, createCustomError } from "../errors/custom_error.mjs"

//controller untuk mendapatkan semua data
export const getAllTasks = asyncWrapper(async (req, res) => {
    const allTasks = await Task.find()
    res.status(200).json({data: allTasks})
})

//controller untuk membuat data baru
export const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({task})
})

//controller untuk mendapatkan satu data (sesuai id request user)
export const getTask = asyncWrapper(async (req, res, next) => {
        const {id:idTask} = await Task.findOne({_id: idTask}) //mengambil satu data dari Task model sesuai dengan id yang diminta user
        console.log(req.user)

        //jika task tidak ada, maka kirimkan message berbentuk json
        if (!task) {
            return next(createCustomError(`No task with id : ${idTask}`, 404))
        }

        return res.status(200).json({task}) //jika berhasil atau status code(200) kembalikan data task berbentuk json
})

//controller untuk memperbarui data
export const updateTask = async (req, res) => {
    try {
        const {id:idTask} = req.params
        const upTask = await Task.findOneAndUpdate({_id: idTask}, req.body, {new: true, runValidators: true, overwrite: true})

        if (!upTask) res.status(404).json({status: "failed", task: null})

        res.status(200).json({status: "success", data: upTask})
    } catch (err) {
        res.status(500).json({msg:err.message})
    }
}

//controller untuk menghapus satu data
export const deleteTask = async (req, res) => {
    try {
        const {id: idTask} = req.params
        const delTask = await Task.findOneAndDelete({_id: idTask})

        if (!delTask) res.status(404).json({msg: `No task with id : ${idTask}`})
        
        res.status(200).json({task: null, status: "success"})
    } catch(err) {
        res.status(500).json({msg: err.message})
    }
}
