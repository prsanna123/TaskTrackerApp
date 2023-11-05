
import React, { useContext, useEffect, useRef, useState } from 'react'
import taskContext from "../context/tasks/taskContext.js"
import Taskitem from './Taskitem.js';
import AddTask from './AddTask';
import { useNavigate } from 'react-router-dom'
const Tasks = (props) => {
    let navigate = useNavigate();
    const context = useContext(taskContext);
    const { tasks, getTasks,editTask } = context;
    console.log(tasks);
    useEffect(() => {
        if(localStorage.getItem('token')){
            getTasks()
        }
        else{
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose=useRef(null)
    const [task, setTask] = useState({id:"",etitle: "", edescription: ""})

    const updateTask = (currentTask) => {
        ref.current.click();
        setTask({id:currentTask._id,etitle: currentTask.title, edescription: currentTask.description})
        
    }

    const handleClick = (e)=>{
        console.log("Updating the task...", task)
        editTask(task.id,task.etitle,task.edescription)
        refClose.current.click();
        // props.showAlert("updated successfully","success")
    }

    const onChange = (e)=>{
        setTask({...task, [e.target.name]: e.target.value})
    }

    return (
        <>
            <AddTask showAlert={props.showAlert}/>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Task</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Edit Task</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" minLength={5} required value={task.etitle} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" minLength={5} required value={task.edescription} onChange={onChange} />
                                </div>
                               
 
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" disabled={task.etitle.length<5 || task.edescription.length<5} className="btn btn-primary">Update Task</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-3">
                <h2>Your Tasks</h2>
                <div className="row">
                    <div className="container">
                    {tasks.length===0 && 'No tasks to display'}</div>
                {tasks.map((task) => {
                    return <Taskitem key={task._id} updateTask={updateTask} showAlert={props.showAlert} task={task} />
                })}
                </div>
            </div>
        </>
    )
}

export default Tasks
