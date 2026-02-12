import React, { useState } from "react";
import "./PersonalPage.css";
import Personal from "./Personal";

export default function PersonalPage({
  tasks,
  onDoneTask,
  onDeleteTask,
  onAddTask,
  onBack,
}) {
  const [newTaskText, setNewTaskText] = useState("");

  // Sort tasks into uncompleted and completed
  const uncompletedTasks = tasks.filter((task) => !task.done);
  const completedTasks = tasks.filter((task) => task.done);

  function handleSubmit(e) {
    e.preventDefault();

    if (!newTaskText.trim()) return;

    onAddTask({
      id: Date.now(),
      text: newTaskText,
      category: "personal",
      done: false,
    });

    setNewTaskText("");
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

      {/* <Personal tasks={tasks} onDoneTask={onDoneTask} /> */}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add new personal task..."
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>
    </div>
  );
}
