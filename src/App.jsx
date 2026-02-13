import "./App.css";
import React, { useState, useEffect } from "react";
import WeekCalendar from "./WeekCalendar";
import Design from "./Design";
import Personal from "./Personal";
import House from "./House";
import New from "./New";
import PersonalPage from "./PersonalPage";
import DesignPage from "./DesignPage";
import HousePage from "./HousePage";
import Intro from "./Intro";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("tasks");
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error("Failed to parse tasks from localStorage", error);
      return [];
    }
  });

  const [page, setPage] = useState("intro"); // Start with intro page
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  // PWA Install Prompt
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Show your own install button
      setShowInstallButton(true);
      console.log("PWA install prompt available");
    });

    // Detect if app is already installed
    window.addEventListener("appinstalled", () => {
      console.log("PWA installed successfully");
      setShowInstallButton(false);
    });
  }, []);

  // Function to trigger install
  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        }
        setDeferredPrompt(null);
        setShowInstallButton(false);
      });
    }
  };

  // LOAD
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  // SAVE
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // function handleAddTask(task) {
  //   const taskWithDate = {
  //     ...task,
  //     date: selectedDate,
  //   };
  //   setTasks((tasks) => [...tasks, taskWithDate]);
  // }

  function handleAddTask(task) {
    // Get today's date string (without time)
    const today = new Date().toDateString();

    // Check if selected date is in the past
    if (selectedDate < today) {
      alert("You cannot add tasks to past dates!");
      return;
    }

    const taskWithDate = {
      ...task,
      date: selectedDate,
    };
    setTasks((tasks) => [...tasks, taskWithDate]);
  }

  function handleDoneTask(id) {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  }

  function handleDeleteTask(taskId) {
    setTasks((tasks) => tasks.filter((task) => task.id !== taskId));
  }

  function handleNavigate(pageName) {
    setPage(pageName);
  }

  function handleDateSelect(date) {
    setSelectedDate(date.toDateString());
  }

  function handleContinueFromIntro() {
    setPage("home");
  }

  const tasksForSelectedDate = tasks.filter(
    (task) => task.date === selectedDate,
  );

  const designTasks = tasksForSelectedDate.filter(
    (task) => task.category === "work",
  );
  const personalTasks = tasksForSelectedDate.filter(
    (task) => task.category === "personal",
  );
  const houseTasks = tasksForSelectedDate.filter(
    (task) => task.category === "house",
  );

  // Show intro page first
  if (page === "intro") {
    return <Intro onContinue={handleContinueFromIntro} />;
  }

  if (page === "work") {
    return (
      <DesignPage
        tasks={designTasks}
        onDoneTask={handleDoneTask}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        onBack={() => handleNavigate("home")}
        selectedDate={selectedDate}
      />
    );
  }

  if (page === "personal") {
    return (
      <PersonalPage
        tasks={personalTasks}
        onDoneTask={handleDoneTask}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        onBack={() => handleNavigate("home")}
        selectedDate={selectedDate}
      />
    );
  }

  if (page === "house") {
    return (
      <HousePage
        tasks={houseTasks}
        onDoneTask={handleDoneTask}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        onBack={() => handleNavigate("home")}
        selectedDate={selectedDate}
      />
    );
  }

  return (
    <div className="app">
      {/* Install Button - shows only when PWA is installable */}
      {showInstallButton && (
        <button className="install-button" onClick={handleInstallClick}>
          Install App
        </button>
      )}

      <WeekCalendar
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
      />
      <Design
        tasks={designTasks}
        onDoneTask={handleDoneTask}
        onDeleteTask={handleDeleteTask}
        onNavigate={() => handleNavigate("work")}
      />
      <Personal
        tasks={personalTasks}
        onDoneTask={handleDoneTask}
        onDeleteTask={handleDeleteTask}
        onNavigate={() => handleNavigate("personal")}
      />
      <House
        tasks={houseTasks}
        onDoneTask={handleDoneTask}
        onDeleteTask={handleDeleteTask}
        onNavigate={() => handleNavigate("house")}
      />

      {/* Only show form if selected date is today or future */}
      {selectedDate >= new Date().toDateString() && (
        <New onAddTask={handleAddTask} />
      )}

      {/* Show message for past dates */}
      {selectedDate < new Date().toDateString() && (
        <div className="past-date-message">
          You cannot add tasks to past dates. Select today or a future date.
        </div>
      )}
    </div>
  );
}
