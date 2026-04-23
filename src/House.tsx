import type { Task } from "./types";

interface HouseProps {
  tasks: Task[];
  onDoneTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onNavigate: () => void;
  showHeader?: boolean;
}

export default function House({
  tasks, onDoneTask, onDeleteTask, onNavigate, showHeader = true,
}: HouseProps) {
  return (
    <div className="HouseC">
      {showHeader && (
        <h4 className="HouseH" onClick={onNavigate} style={{ cursor: "pointer" }}>HOUSE</h4>
      )}
      {tasks.map((task) => (
        <span key={task.id} className="HouseS">
          <input type="checkbox" checked={task.done} onChange={() => onDoneTask(task.id)} />
          <span className="HouseS2">{task.text}</span>
          <button className="DeleteBtn" onClick={() => onDeleteTask(task.id)}>Delete</button>
        </span>
      ))}
    </div>
  );
}