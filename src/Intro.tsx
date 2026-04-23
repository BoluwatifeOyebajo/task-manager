import { useState, useEffect } from "react";
import "./Intro.css";

interface IntroProps {
  onContinue: () => void;
}

export default function Intro({ onContinue }: IntroProps) {
  const [greeting, setGreeting] = useState("");
  const [quote, setQuote] = useState("");

  const quotes: string[] = [
    "Small daily improvements are the key to staggering long-term results.",
    "Success is the sum of small efforts repeated day in and day out.",
    "You don't have to be great to start, but you have to start to be great.",
    "The secret of getting ahead is getting started.",
    "A journey of a thousand miles begins with a single step.",
    "Discipline is choosing between what you want now and what you want most.",
    "Your future is created by what you do today, not tomorrow.",
    "Excellence is not a destination; it is a continuous journey that never ends.",
    "The only way to do great work is to love what you do.",
    "Consistency is the key to achieving and maintaining momentum.",
  ];

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good Morning");
    } else if (hour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="intro-page">
      <div className="intro-content">
        <h1 className="intro-greeting">{greeting}</h1>
        <p className="intro-quote">"{quote}"</p>
        <p className="intro-message">
          Ready to organize your day and build great habits?
        </p>
        <button className="intro-button" onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}