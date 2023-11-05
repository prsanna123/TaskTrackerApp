import React, {useContext} from 'react'
import taskContext from "../context/tasks/taskContext.js"
import './style.css'

const Taskitem = (props) => {
    const context = useContext(taskContext);
    const { deleteTask,MarkDone } = context;
    const { task, updateTask } = props;
    let datePart=""
    
      const datetimeString = task.date; // Replace this with your datetime string
    
 datePart = datetimeString.split('T')[0];



    function getPriorityColor(priority) {
        if (priority === "low") {
          return "rgba(0, 0, 255, 0.5)"; // Blue circle for low priority
        } else if (priority === "medium") {
          return "rgba(0, 255, 0, 0.5)"; // Green circle for medium priority
        } else if (priority === "high") {
          return "rgba(255, 0, 0, 0.5)"; // Red circle for high priority
        } else {
          return "gray"; // Default gray circle for unknown priority
        }
      }
      
    return (
        <div className="col-md">
            <div className="card my-3" style={{width: "18rem"}}>
                <div className="card-body" style={{ marginBottom: "10px", backgroundColor: getPriorityColor(task.Priority) }}>
                        <h5 className="card-title">{task.title}</h5>
                        <h6>Status::
                        <input type="checkbox" style={{transform: "scale(1.5)"}} disabled={task.complete} checked={task.complete} onChange={()=>{MarkDone(task)}} name="complete" />{task.complete}</h6>
                        <div>
                        <div className='button-group'>
                        <div className='btn btn-primary' onClick={()=>{deleteTask(task._id)}}>delete</div>
                        {
                          task.complete?<div className='btn btn-primary' disabled onClick={()=>{updateTask(task)}}>update</div>
                          :<div className='btn btn-primary'  onClick={()=>{updateTask(task)}}>update</div>
                          
                        }
                        </div></div>
                        <div className="priority-circle" >
                        </div>
                    <p className="card-text">{task.description}</p>
                    <p className="card-text">{datePart}</p>
                </div>
            </div>
        </div>
    )
}

export default Taskitem
