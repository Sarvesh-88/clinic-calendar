import React, { useState, useEffect } from "react";

// --- XSS Protection ---
const sanitizeInput = (str) => {
  if (!str) return "";
  return str.replace(/[&<>'"]/g, (tag) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[tag]);
};

// --- Analytics ---
const trackAnalytics = (action) => {
  console.log(`[Analytics] User interacted with Calendar Widget: ${action}`);
};

// --- Mock Data ---
const mockDataMap = {
  "2026-07-15": [{ id: 1, name: "John Doe", time: "10:00 AM" }],
};

export default function CalendarWidget() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [patientName, setPatientName] = useState("");
  const [time, setTime] = useState("");
  const [errors, setErrors] = useState({});

  // --- Load Data ---
  useEffect(() => {
    setLoading(true);
    setAppointments([]);
    setErrors({});

    const timer = setTimeout(() => {
      setAppointments(mockDataMap[selectedDate] || []);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [selectedDate]);

  // --- Date Change ---
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    trackAnalytics("Date Changed");
  };

  // --- Add Appointment ---
  const handleSubmit = (e) => {
    e.preventDefault();
    trackAnalytics("Add Appointment Attempt");

    let newErrors = {};

    if (!patientName.trim()) newErrors.patientName = "Required field";
    if (!time.trim()) newErrors.time = "Required field";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newAppointment = {
      id: Date.now(),
      name: sanitizeInput(patientName),
      time: sanitizeInput(time),
    };

    setAppointments((prev) => [...prev, newAppointment]);

    setPatientName("");
    setTime("");
    setErrors({});

    trackAnalytics("Appointment Added");
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Clinic Calendar</h1>
      </header>

      {/* DATE */}
      <section className="card">
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="input"
        />
      </section>

      {/* APPOINTMENTS */}
      <section className="card">
        <h2>Appointments</h2>

        {loading ? (
          <p className="loading">Loading...</p>
        ) : appointments.length === 0 ? (
          <p className="empty">No appointments found</p>
        ) : (
          <ul>
            {appointments.map((a) => (
              <li key={a.id}>
                <b>{a.time}</b> - {a.name}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* FORM */}
      <section className="card">
        <h2>Add Appointment</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Patient Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className={errors.patientName ? "error" : ""}
          />
          {errors.patientName && <p className="error-text">{errors.patientName}</p>}

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={errors.time ? "error" : ""}
          />
          {errors.time && <p className="error-text">{errors.time}</p>}

          <button type="submit">Save</button>
        </form>
      </section>
    </div>
  );
}