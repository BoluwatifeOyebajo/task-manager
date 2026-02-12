import React from "react";
import "./WeekCalendar.css";

export default function WeekCalendar({ selectedDate, onDateSelect }) {
  // Get current week days
  function getWeekDays() {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const diff = currentDay === 0 ? -6 : 1 - currentDay; // Adjust to start week on Monday

    const monday = new Date(today);
    monday.setDate(today.getDate() + diff);

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      weekDays.push(day);
    }

    return weekDays;
  }

  const weekDays = getWeekDays();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  function isSameDay(date1, date2) {
    // Handle comparison between Date object and string
    const dateStr1 = typeof date1 === "string" ? date1 : date1.toDateString();
    const dateStr2 = typeof date2 === "string" ? date2 : date2.toDateString();
    return dateStr1 === dateStr2;
  }

  return (
    <div className="week-calendar">
      <h2 className="calendar-title">Today</h2>
      <div className="calendar-grid">
        {weekDays.map((day, index) => {
          const isToday = isSameDay(day, today);
          const isSelected = isSameDay(day.toDateString(), selectedDate);

          return (
            <button
              key={index}
              className={`calendar-day ${isToday ? "today" : ""} ${
                isSelected ? "selected" : ""
              }`}
              onClick={() => onDateSelect(day)}
            >
              <span className="day-name">
                {day
                  .toLocaleDateString("en-US", { weekday: "short" })
                  .toUpperCase()}
              </span>
              <span className="day-number">{day.getDate()}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
