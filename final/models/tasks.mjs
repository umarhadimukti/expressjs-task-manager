import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: [true, "Task tidak boleh kosong!"],
        max: [20, "Task tidak boleh lebih dari 20 karakter!"],
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model("Task", TaskSchema)