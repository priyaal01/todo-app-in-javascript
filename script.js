const taskInput = document.getElementById("taskInput");
const tasklist = document.getElementById("tasklist");

let tasks=[];

window.onload =function(){
    if(localStorage.getItem("tasks")){
        tasks=JSON.parse(localStorage.getItem("tasks"));
        rendertasks();
    }
};

function addtask(){
    let tasktext = taskInput.value.trim();
    if(tasktext ===""){
        alert("Please enter a task");
        return;
    }

    const task={
        id: Date.now(),
        text: tasktext,
        completed: false,
    };
    
    tasks.push(task);
    saveTasks();
    renderTasks();
    taskInput.value="";
}

function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}


function renderTasks(){
    tasklist.innerHTML="";
    tasks.forEach(task =>{
        const li= document.createElement("li");
        li.className="task-item";

        const taskText = document.createElement("span");
        taskText.textContent = task.text;
        if(task.completed){
            taskText.style.textDecoration = "line-through";
        }

        const completeButton=document.createElement("button");
        completeButton.textContent=task.completed ? "undo":"complete";
        completeButton.onclick = () => toggleTask(task.id);

        const deleteButton = document.createElement("button");
        deleteButton.textContent= "Delete";
        deleteButton.onclick=() => deleteTask(task.id);

        li.appendChild(taskText);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        tasklist.appendChild(li);
    });
}

function toggleTask(id) {
    tasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
    renderTasks(); 
}
  
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}
  





