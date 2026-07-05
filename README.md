# React Calendar Widget

## Project Overview
This project is a digital React Calendar Widget designed to transition a dental office from manual paper systems and Excel sheets to a robust digital solution. The widget allows floor staff to easily access, manage, and track schedules, preventing data loss and operational slowdowns. 
* Live Link-https://clinic-calendar-theta.vercel.app/

## Tech Stack
* **Framework:** React
* **Build Tool:** Vite
* **State Management:** React Hooks (`useState`, `useEffect`, Prop Drilling)
* **Constraints:** No Redux, no React Router.

## Features and Requirements

### Core Functionality (Happy Path)
* **Clear Interface:** Intuitive calendar layout optimized for quick access by floor staff.
* **Instant Responsiveness:** Optimized for immediate visual feedback without long loading screens.
* **Data Consistency:** Structured state management to ensure reliable data outputs for management.

### Edge Case Handling (Unhappy Path)
* **Empty States:** Displays a user-friendly "No data found" message when lists or search results are empty, avoiding blank screens.
* **Network Latency:** Includes visual loading indicators during asynchronous operations to accommodate slow 3G connections.
* **Validation & Error Handling:** Prevents form submission on invalid or missing data, actively highlighting offending fields in red.

---

## Non-Functional Requirements (NFRs)

### Accessibility (a11y)
* Target: 100% Lighthouse accessibility score.
* All interactive elements (buttons, form inputs) are fully keyboard navigable.
* Strict implementation of appropriate ARIA labels across the component tree.

### Telemetry Simulation
* Integrated simulated analytics.
* Outputs `[Analytics] User interacted with React Calendar Widget` to the console upon completion of primary actions.

### Security
* Automatic sanitization of all text inputs to prevent XSS injection attacks prior to state storage.

### Design System
* Adheres strictly to a clean, monochromatic corporate design system.
* Standardized spacing and padding utilizing 16px and 32px incremental steps.
* No unauthorized or rogue hex colors introduced.

