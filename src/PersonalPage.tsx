import { useState, useRef } from "react";
import React from "react";
import "./PersonalPage.css";
import Personal from "./Personal";
import type { Task } from "./types";

interface PersonalPageProps {
  tasks: Task[];
  onDoneTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onAddTask: (task: Task) => void;
  onBack: () => void;
  selectedDate: string;
}

export default function PersonalPage({
  tasks,
  onDoneTask,
  onDeleteTask,
  onAddTask,
  onBack,
  selectedDate,
}: PersonalPageProps) {
  const [newTaskText, setNewTaskText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const uncompletedTasks = tasks.filter((task) => !task.done);
  const completedTasks = tasks.filter((task) => task.done);
  const isPastDate = selectedDate < new Date().toDateString();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    if (isPastDate) { alert("You cannot add tasks to past dates!"); return; }
    onAddTask({ id: String(Date.now()), text: newTaskText, category: "personal", done: false, date: selectedDate });
    setNewTaskText("");
    setTimeout(() => { if (inputRef.current) inputRef.current.blur(); }, 100);
  }

  return (
    <div className="personal-page">
      <button onClick={onBack}>Back</button>
      <Personal tasks={uncompletedTasks} onDoneTask={onDoneTask} onDeleteTask={onDeleteTask} showHeader={true} onNavigate={onBack} />
      {completedTasks.length > 0 && (
        <>
          <div className="completed-header">COMPLETED</div>
          <Personal tasks={completedTasks} onDoneTask={onDoneTask} onDeleteTask={onDeleteTask} showHeader={false} onNavigate={onBack} />
        </>
      )}
      {!isPastDate && (
        <form onSubmit={handleSubmit} className="add-task-form">
          <input ref={inputRef} type="text" value={newTaskText} onChange={(e) => setNewTaskText(e.target.value)} placeholder="Add new task..." />
          <button type="submit">Add</button>
        </form>
      )}
    </div>
  );
}