import { FaArrowLeft, FaArrowRight, FaTrash } from "react-icons/fa";
import { TaskStatus } from "../utils/task_status";

export default function TaskCard({ task , onMoveNext, onMovePrev, onDelete}) {

  const statusClass =
    task.status === TaskStatus.done
      ? TaskStatus.done
      : task.status === TaskStatus.inProgress
      ? TaskStatus.inProgress
      : TaskStatus.todo;
      
    return (
    <div className="task-card" >
      <div className="task-header">
        <h4 >{task.title}</h4>
        <p className={`task-status ${statusClass}`}>{task.status}</p>
      </div>
      <div className="task-body">
        <p >{task.description}</p>
        <div className="move-buttons">
          <button onClick={onMovePrev} className="iconButtonStyle"><FaArrowLeft/></button>
          <button onClick={onMoveNext} className="iconButtonStyle"><FaArrowRight/></button>
        </div>
      </div>

      {/* Delete button below, centered */}
      <div className="delete-button-container">
        <button onClick={onDelete} className="iconButtonStyle"><FaTrash/></button>
      </div>
        </div>

    );
}
