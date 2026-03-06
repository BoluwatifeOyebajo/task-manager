import { useState, useRef } from "react";
import "./PersonalPage.css";
import Personal from "./Personal";

export default function PersonalPage({
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
      category: "work",
      done: false,
    });

    setNewTaskText("");

    // Blur input to dismiss keyboard AFTER state update
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }, 100);
  }

  return (
    <div className="personal-page">
      <button onClick={onBack}>Back</button>
      <Personal
        tasks={uncompletedTasks}
        onDoneTask={onDoneTask}
        onDeleteTask={onDeleteTask}
        showHeader={true}
      />
      {completedTasks.length > 0 && (
        <>
          <div className="completed-header">COMPLETED</div>
          <Personal
            tasks={completedTasks}
            onDoneTask={onDoneTask}
            onDeleteTask={onDeleteTask}
            showHeader={false}
          />
        </>
      )}
      {!isPastDate && (
        <form onSubmit={handleSubmit} className="add-task-form">
          <input
            ref={inputRef}
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Add new task..."
          />
          <button type="submit">Add</button>
        </form>
      )}
    </div>
  );
}
