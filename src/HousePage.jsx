import { useState, useRef, useEffect } from "react";
import "./HousePage.css";
import House from "./House";

export default function HousePage({
  tasks,
  onDoneTask,
  onDeleteTask,
  onAddTask,
  onBack,
  selectedDate,
}) {
  const [newTaskText, setNewTaskText] = useState("");
  const inputRef = useRef(null);

  const uncompletedTasks = tasks.filter((task) => !task.done);
  const completedTasks = tasks.filter((task) => task.done);

  const isPastDate = selectedDate < new Date().toDateString();

  function handleSubmit(e) {
    e.preventDefault();

    if (!newTaskText.trim()) return;

    if (isPastDate) {
      alert("You cannot add tasks to past dates!");
      return;
    }

    onAddTask({
      id: Date.now(),
      text: newTaskText,
      category: "house",
      done: false,
    });

    setNewTaskText("");
  }

  // Proper way to blur after submit
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  }, [newTaskText]);

  return (
    <div className="house-page">
      <button onClick={onBack}>Back</button>

      <House
        tasks={uncompletedTasks}
        onDoneTask={onDoneTask}
        onDeleteTask={onDeleteTask}
        showHeader={true}
      />

      {completedTasks.length > 0 && (
        <>
          <div className="completed-header">COMPLETED</div>
          <House
            tasks={completedTasks}
            onDoneTask={onDoneTask}
            onDeleteTask={onDeleteTask}
            showHeader={false}
          />
        </>
      )}

      {!isPastDate ? (
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Add new house task..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
      ) : (
        <div className="past-date-message">
          You cannot add tasks to past dates.
        </div>
      )}
    </div>
  );
}
