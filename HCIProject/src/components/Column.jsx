import { TaskStatus } from "../utils/task_status";
import TaskCard from "./TaskCard";
import { Droppable, Draggable } from "@hello-pangea/dnd";

export default function Column({ title, tasks,columnKey, moveTask, deleteTask  }) {

    return (
<Droppable droppableId={columnKey}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="board-column"
        >
          <h2 className="column-header">{title}</h2>

          {tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <TaskCard
                    task={task}
                    onMoveNext={() =>
                      moveTask(task.id,  
                        columnKey === TaskStatus.todo
                        ? TaskStatus.inProgress
                        : columnKey === TaskStatus.inProgress
                        ? TaskStatus.done
                        : null)
                    }
                    onMovePrev={() =>
                      moveTask(task.id,  columnKey === TaskStatus.done
                        ? TaskStatus.inProgress
                        : columnKey === TaskStatus.inProgress
                        ? TaskStatus.todo
                        : null)
                    }
                    onDelete={() => deleteTask(task.id, columnKey)}
                  />
                </div>
              )}
            </Draggable>
          ))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
    );
}