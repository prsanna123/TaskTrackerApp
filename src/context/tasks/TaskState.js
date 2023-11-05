import TaskContext from "./taskContext";
import { useState } from "react";

const TaskState = (props) => {
  const host = "http://localhost:5000"
  const tasksInitial = []
  const [tasks, setTasks] = useState(tasksInitial)

  // Get all Tasks
  const getTasks = async () => {
    // API Call 
    const response = await fetch(`${host}/api/tasks/fetchalltasks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q"
      }
    });
    const json = await response.json() 
    setTasks(json)
  }

  // Add a Task
  const addTask = async (title, description,date,Priority) => {
    // TODO: API Call
    // API Call 
     
    const response = await fetch(`${host}/api/tasks/addtask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q"
      },
      body: JSON.stringify({title, description,date,Priority})
    });

    const task = await response.json();
    setTasks(tasks.concat(task))
  }

  // Delete a Task
  const deleteTask = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/tasks/deletetask/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q"
      }
    });
    const json = response.json(); 
    const newTasks = tasks.filter((task) => { return task._id !== id })
    setTasks(newTasks)
  }

  // Edit a Task
  const editTask = async (id, title, description) => {
    // API Call 
    console.log("in edit")
    const response = await fetch(`${host}/api/tasks/updatetask/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q"
      },
      body: JSON.stringify({title, description})
    });
    const json = await response.json(); 

     let newTasks = JSON.parse(JSON.stringify(tasks))
    // Logic to edit in client
    for (let index = 0; index < newTasks.length; index++) {
      const element = newTasks[index];
      if (element._id === id) {
        newTasks[index].title = title;
        newTasks[index].description = description;
        break; 
      }
    }  
    console.log("setted")
    setTasks(newTasks);
  }
  const MarkDone=async (id,title, description,date) => {
    // API Call 
    console.log(id._id)
    console.log(title)
    console.log("in edit")
    const response =await fetch(`${host}/api/tasks/markdone/${id._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q"
      },
      body: JSON.stringify({title,description,date})
    });
    const json = await response.json(); 

     let newTasks = JSON.parse(JSON.stringify(tasks))
     console.log(newTasks)
    // Logic to edit in client
    for (let index = 0; index < newTasks.length; index++) {
      const element = newTasks[index];
      if (element._id === id._id) {
        newTasks[index].title = id.title;
        newTasks[index].description = id.description;
        newTasks[index].date = id.date; 
        newTasks[index].complete = true;
        break; 
      }
    }  
    console.log("setted")
    console.log(newTasks)
    setTasks(newTasks);
  

}
return (
  <TaskContext.Provider value={{ tasks, addTask, deleteTask, editTask, getTasks,MarkDone }}>
    {props.children}
  </TaskContext.Provider>
)
}
export default TaskState;