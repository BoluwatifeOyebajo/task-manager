import { useState, useRef } from "react";
import React from "react";
import "./HousePage.css";
import House from "./House";
import type { Task } from "./types";

interface HousePageProps {
  tasks: Task[];
  onDoneTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onAddTask: (task: Task) => void;
  onBack: () => void;
  selectedDate: string;
}

export default function HousePage({
  tasks, onDoneTask, onDeleteTask, onAddTask, onBack, selectedDate,
}: HousePageProps) {
  const [newTaskText, setNewTaskText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const uncompletedTasks = tasks.filter((task) => !task.done);
  const completedTasks = tasks.filter((task) => task.done);
  const isPastDate = selectedDate < new Date().toDateString();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    if (isPastDate) { alert("You cannot add tasks to past dates!"); return; }
    onAddTask({ id: String(Date.now()), text: newTaskText, category: "house", done: false, date: selectedDate });
    setNewTaskText("");
    setTimeout(() => { if (inputRef.current) inputRef.current.blur(); }, 100);
  }

  return (
    <div className="house-page">
      <button onClick={onBack}>Back</button>
      <House tasks={uncompletedTasks} onDoneTask={onDoneTask} onDeleteTask={onDeleteTask} showHeader={true} onNavigate={onBack} />
      {completedTasks.length > 0 && (
        <>
          <div className="completed-header">COMPLETED</div>
          <House tasks={completedTasks} onDoneTask={onDoneTask} onDeleteTask={onDeleteTask} showHeader={false} onNavigate={onBack} />
        </>
      )}
      {!isPastDate ? (
        <form onSubmit={handleSubmit}>
          <input ref={inputRef} type="text" placeholder="Add new house task..." value={newTaskText} onChange={(e) => setNewTaskText(e.target.value)} />
          <button type="submit">Add</button>
        </form>
      ) : (
        <div className="past-date-message">You cannot add tasks to past dates.</div>
      )}
    </div>
  );
}