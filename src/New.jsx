import { useState } from "react";
import CustomSelect from "./CustomSelect";

export default function New({ onAddTask }) {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("work");

  const categoryOptions = [
    { value: "work", label: "Work" },
    { value: "personal", label: "Personal" },
    { value: "house", label: "House" },
  ];

  function handleSubmit(e) {
    e.preventDefault();
    if (!task.trim()) return;

    const newTask = {
      id: Date.now(),
      text: task,
      done: false,
      category: category,
    };

    onAddTask(newTask);
    setTask("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
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
