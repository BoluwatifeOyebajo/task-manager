import React, { useState, useRef } from "react";
import "./DesignPage.css";
import Design from "./Design";

export default function DesignPage({
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

  // Check if selected date is in the past
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
    <div className="design-page">
      <button onClick={onBack}>Back</button>

      {/* Uncompleted Tasks */}
      <Design
        tasks={uncompletedTasks}
        onDoneTask={onDoneTask}
        onDeleteTask={onDeleteTask}
        showHeader={true}
      />

      {/* Completed Section */}
      {completedTasks.length > 0 && (
        <>
          <div className="completed-header">COMPLETED</div>
          <Design
            tasks={completedTasks}
            onDoneTask={onDoneTask}
            onDeleteTask={onDeleteTask}
            showHeader={false}
          />
        </>
      )}

      {/* Only show form if not a past date */}
      {!isPastDate ? (
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Add new work task..."
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
