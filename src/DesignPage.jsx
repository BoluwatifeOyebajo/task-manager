import React, { useState } from "react";
import "./DesignPage.css";
import Design from "./Design";

export default function DesignPage({
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
      category: "design",
      done: false,
    });

    setNewTaskText("");
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

      {/* <Design tasks={tasks} onDoneTask={onDoneTask} /> */}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add new design task..."
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>
    </div>
  );
}
