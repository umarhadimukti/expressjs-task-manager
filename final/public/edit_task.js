const taskForm = document.querySelector(".single-task-form")
const taskID = document.querySelector(".task-edit-id")
const taskName = document.querySelector(".task-edit-name")
const taskCompleted = document.querySelector(".task-edit-completed")
const taskEditBtn = document.querySelector(".task-edit-btn")
const formAlert = document.querySelector(".form-alert")

const params = window.location.search //mengambil data string url search
const id = new URLSearchParams(params).get("id") //mengambil id 
let tempName

const showSingleTask = async () => {
    try {
        const url = `/api/v1/tasks/${id}`
        const {data: singleTask} = await axios.get(url)
        const {task: taskData} = singleTask
        const {_id: idTask, task, completed} = taskData
        
        taskID.textContent = idTask
        taskName.value = task
        tempName = task
        
        if (completed) taskCompleted.checked = true
    } catch(err) {
        console.log(err)
    }
}
showSingleTask()

taskForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    taskEditBtn.textContent = "Loading.."
    try {
        const taskValue = taskName.value
        const completedTask = taskCompleted.checked
        const url = `/api/v1/tasks/${id}`
        const {data} = await axios.patch(url, {
            task: taskValue,
            completed: completedTask
        })
        const {data:{_id: idTask, task, completed}} = data
        
        taskID.textContent = idTask
        taskName.value = task
        tempName = task
        if (completed) taskCompleted.checked = true
        formAlert.style.display = "block"
        formAlert.textContent = "Sukses, tugas berhasil di ubah!"
        formAlert.classList.add("text-success")
    } catch(err) {
        console.log(err)
        taskName.value = tempName
        formAlert.style.display = "block"
        formAlert.textContent = "Error, tugas gagal di ubah!"
    }
    taskEditBtn.textContent = "Ubah"
    setTimeout(() => {
        formAlert.style.display = "none"
        formAlert.classList.remove("text-success")
    }, 3000)
})