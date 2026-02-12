export default function Personal({
  tasks,
  onDoneTask,
  onDeleteTask,
  onNavigate,
  showHeader = true,
}) {
  return (
    <div className="PersonalC">
      {showHeader && (
        <h4
          className="PersonalH"
          onClick={onNavigate}
          style={{ cursor: "pointer" }}
        >
          PERSONAL
        </h4>
      )}
      {tasks.map((task) => (
        <span key={task.id} className="PersonalS">
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => onDoneTask(task.id)}
          />
          <span className="PersonalS2">{task.text} </span>

          {/* delete button */}
          <button className="DeleteBtn" onClick={() => onDeleteTask(task.id)}>
            Delete
          </button>
        </span>
      ))}
    </div>
  );
}
