import "./App.css";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import WeekCalendar from "./WeekCalendar";
import Design from "./Design";
import Personal from "./Personal";
import House from "./House";
import New from "./New";
import PersonalPage from "./PersonalPage";
import DesignPage from "./DesignPage";
import HousePage from "./HousePage";
import Intro from "./Intro";
import Login from "./Login";
import type { Task } from "./types";

interface DeferredPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const savedTasks = localStorage.getItem("tasks");
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error("Failed to parse tasks from localStorage", error);
      return [];
    }
  });

  const [page, setPage] = useState("login");
  const [authReady, setAuthReady] = useState(false); // ← prevents flash of login screen
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
  const [deferredPrompt, setDeferredPrompt] = useState<DeferredPromptEvent | null>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  // ✅ Listen to Firebase auth state — redirects to login if signed out
   useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (!user) {
      setPage("login");
    }
    setAuthReady(true);
  });

  return () => unsubscribe();
}, []); // eslint-disable-line react-hooks/exhaustive-deps

  const isPastDate = () => {
    const selected = new Date(selectedDate);
    const today = new Date();
    selected.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return selected < today;
  };

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as DeferredPromptEvent);
      setShowInstallButton(true);
    };

    const handleAppInstalled = () => {
      setShowInstallButton(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

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

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleAddTask(task: Task) {
    if (isPastDate()) {
      alert("You cannot add tasks to past dates!");
      return;
    }
    const taskWithDate: Task = { ...task, date: selectedDate };
    setTasks((prev: Task[]) => [...prev, taskWithDate]);
  }

  function handleDoneTask(id: string) {
    setTasks((prev: Task[]) =>
      prev.map((task: Task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  }

  function handleDeleteTask(taskId: string) {
    setTasks((prev: Task[]) => prev.filter((task: Task) => task.id !== taskId));
  }

  function handleNavigate(pageName: string) {
    setPage(pageName);
  }

  function handleDateSelect(date: Date) {
    setSelectedDate(date.toDateString());
  }

  function handleContinueFromIntro() {
    setPage("home");
  }

  const tasksForSelectedDate = tasks.filter(
    (task: Task) => task.date === selectedDate,
  );

  const designTasks = tasksForSelectedDate.filter(
    (task: Task) => task.category === "work",
  );
  const personalTasks = tasksForSelectedDate.filter(
    (task: Task) => task.category === "personal",
  );
  const houseTasks = tasksForSelectedDate.filter(
    (task: Task) => task.category === "house",
  );

  // ✅ Don't render anything until Firebase has checked auth state
  if (!authReady) {
    return <div style={{ textAlign: "center", marginTop: "100px" }}>Loading...</div>;
  }

  if (page === "login") return <Login onLogin={() => setPage("intro")} />;
  if (page === "intro") return <Intro onContinue={handleContinueFromIntro} />;

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
      {!isPastDate() && <New onAddTask={handleAddTask} />}
      {isPastDate() && (
        <div className="past-date-message">
          You cannot add tasks to past dates. Select today or a future date.
        </div>
      )}
    </div>
  );
}