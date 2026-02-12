import React, { useState } from "react";
import "./HousePage.css";
import House from "./House";

export default function HousePage({
  tasks,
  onDoneTask,
  onDeleteTask,
  onAddTask,
  onBack,
}) {
  const [newTaskText, setNewTaskText] = useState("");

  const uncompletedTasks = tasks.filter((task) => !task.done);
  const completedTasks = tasks.filter((task) => task.done);

  function handleSubmit(e) {
    e.preventDefault();

    if (!newTaskText.trim()) return;

    onAddTask({
      id: Date.now(),
      text: newTaskText,
      category: "house",
      done: false,
    });

    setNewTaskText("");
  }

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

      {/* <House tasks={tasks} onDoneTask={onDoneTask} /> */}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add new house task..."
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>
    </div>
  );
}
