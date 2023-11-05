import React, {useContext, useState} from 'react'
import taskContext from "../context/tasks/taskContext.js"

const AddTask = () => {
    const context = useContext(taskContext);
    const {addTask} = context;

    const [task, setTask] = useState({title: "", description: "",duedate: "",Priority: "low",complete:false})

    const handleClick = (e)=>{
        e.preventDefault();
        addTask(task.title, task.description,task.duedate,task.Priority,task.complete);
        setTask({title: "", description: "",duedate:"",Priority:"low",complete:false})
    }

    const onChange = (e)=>{
        setTask({...task, [e.target.name]: e.target.value})
    }
    
    return (
        <div className="container my-3">
            <h2>Add a new task</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={task.title} onChange={onChange} minLength={5} required /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={task.description} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="duedate" className="form-label">Due date</label>
                    <input type="date" className="form-control" id="duedate" name="duedate" value={task.duedate} onChange={onChange} required />
                </div>
                <div className="mb-3">
        <label htmlFor="priority" className="form-label">Priority</label>
        <div>
        <select className="form-select" id="priority" name="Priority" value={task.Priority} onChange={onChange}>
          <option value="high" style={{ color: "red" }}>High</option>
          <option value="medium" style={{ color: "orange" }}>Medium</option>
          <option value="low" style={{ color: "green" }}>Low</option>
        </select></div>
      </div>
                <button disabled={task.title.length<5 || task.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add task</button>
            </form>
        </div>
    )
}

export default AddTask
