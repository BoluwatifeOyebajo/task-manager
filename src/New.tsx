import { useState, useRef } from "react";
import React from "react";
import CustomSelect from "./CustomSelect";
import type { Task } from "./types";

interface NewProps {
  onAddTask: (task: Task) => void;
}

export default function New({ onAddTask }: NewProps) {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("work");
  const inputRef = useRef<HTMLInputElement>(null);

  const categoryOptions = [
    { value: "work", label: "Work" },
    { value: "personal", label: "Personal" },
    { value: "house", label: "House" },
  ];

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!task.trim()) return;

    const newTask: Task = {
      id: String(Date.now()),
      text: task,
      done: false,
      category,
      date: new Date().toDateString(),
    };

    onAddTask(newTask);
    setTask("");

    setTimeout(() => {
      if (inputRef.current) inputRef.current.blur();
    }, 100);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a task..."
      />
      <CustomSelect
        value={category}
        onChange={setCategory}
        options={categoryOptions}
      />
      <button type="submit">Add</button>
    </form>
  );
}