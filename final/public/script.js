const taskForm = document.querySelector(".task-form")
const taskInput = document.querySelector(".task-input")
const formAlert = document.querySelector(".form-alert")
const loadingText = document.querySelector(".loading-text")
const tasksDOM = document.querySelector(".tasks")

//mengambil data tasks dari /api/v1/tasks dan menampilkan ke dalam browser
const showTasks = async () => {
    loadingText.style.visibility = "visible"
    try {
        const url = "/api/v1/tasks"
        const {data} = await axios.get(url)
        if (data.length < 1) {
            tasksDOM.innerHTML = "<h5 class='empty-list'>No tasks in your list</h5>"
            loadingText.style.visibility = "hidden"
            return
        }
        const allTasks = data["data"]
        .map((item) => {
            const {_id: idTask, completed, task} = item
            console.log(task)
            return `
                <div class="single-task ${completed && 'task-completed'}">
                    <h5><span><i class="far fa-check-circle"></i></span>${task}</h5>
                    <div class="task-links">
                        <!-- edit link -->
                        <a href="task.html?id=${idTask}" class="edit-link">
                            <i class="fas fa-edit"></i>
                        </a>
                        <!-- delete btn -->
                        <button type="button" class="delete-btn" data-id="${idTask}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>`
        })
        .join("")
        tasksDOM.innerHTML = allTasks
        setTimeout(() => {
            loadingText.style.visibility = "hidden"
        }, 1000)
    } catch(err) {
        tasksDOM.innerHTML = `
            <h5 class="empty-list">There was an error, please try later....</h5>
        `
        loadingText.style.visibility = "hidden"
    }
}
showTasks()

//delete task /api/v1/tasks/:id
tasksDOM.addEventListener("click", async (e) => {
    const el = e.target
    if (el.parentElement.classList.contains("delete-btn")) {
        loadingText.style.visibility = "visible"
        const id = el.parentElement.dataset.id
        try {
            await axios.delete(`api/v1/tasks/${id}`)
            showTasks()
        } catch(err) {
            console.log(err)
        }
    }
    loadingText.style.visibility = "hidden"
})


//form handling
taskForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const taskName = taskInput.value
    try {
        await axios.post("api/v1/tasks", {task: taskName})
        showTasks()
        taskInput.value = ""
        formAlert.style.display = "block"
        formAlert.textContent = "Sukses, Tugas berhasil ditambah!"
        formAlert.classList.add("text-success")
    } catch(err) {
        formAlert.display = "block"
        formAlert.textContent = "Error, Tugas gagal ditambah!"
        //jika task input kosong, maka tampilkan error message
        if (!taskName) {
            formAlert.textContent = `${err.response.data.msg}`
        }
    }
    removeAlert(3000)
})

//function untuk menghapus alert
function removeAlert(time) {
    setTimeout(() => {
        formAlert.style.display = "none"
        formAlert.classList.remove("text-success")
    }, time)
}