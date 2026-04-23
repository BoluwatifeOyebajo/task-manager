interface Task {
  id: string;
  text: string;
  done: boolean;
}

interface DesignProps {
  tasks: Task[];
  onDoneTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onNavigate: () => void;
  showHeader?: boolean;
}

export default function Design({
  tasks,
  onDoneTask,
  onDeleteTask,
  onNavigate,
  showHeader = true,
}: DesignProps) {
  return (
    <div className="DesignC">
      {showHeader && (
        <h4
          className="DesignH"
          onClick={onNavigate}
          style={{ cursor: "pointer" }}
        >
          WORK
        </h4>
      )}
      {tasks.map((task) => (
        <span key={task.id} className="DesignS">
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => onDoneTask(task.id)}
          />
          <span className="DesignS2">{task.text}</span>

          <button className="DeleteBtn" onClick={() => onDeleteTask(task.id)}>
            Delete
          </button>
        </span>
      ))}
    </div>
  );
}