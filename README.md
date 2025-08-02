# Event Management React App

## Description
This is a modern, responsive Event Management web application built with React. It allows users to add, view, update, and delete events stored in the browser's localStorage. The app features a clean UI with a calendar for date selection and event highlighting, and an event list for easy browsing. Users can also add sample events for quick testing.

The project demonstrates practical React skills including state management, effects, form handling, conditional rendering, and integration with browser storage. It uses Bootstrap 5 for styling and layout and `react-calendar` for an interactive calendar UI.

---

## Features

- **Add Events:** Fill out a form to create new events with title, description, venue, date, and optional organizer.
- **View Events:** Click dates on the calendar or select from the event list to see detailed event info.
- **Update Events:** Edit event details with real-time validation to prevent date/venue collisions.
- **Delete Events:** Remove unwanted events with confirmation.
- **Calendar Highlights:** Dates with events are visually highlighted on the calendar.
- **Sample Data:** Quickly populate the app with sample events to test functionality.
- **Responsive Design:** Layout adjusts smoothly for different screen sizes.
- **Persistent Storage:** Uses localStorage to persist event data across sessions.

---

## Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/sthaaayush/Event-Management-App.git
   cd Event-Management-App
  
2. **Install dependencies** 
###### *This project depends on:*

- React (create-react-app or similar setup)
- react-calendar
- bootstrap-icons
```bash
npm i react 
npm i react-router-dom react-calendar 
npm i bootstrap bootstrap-icons
```

3. **Run the development server**
```bash
npm start
```

### Usage Notes
- Events are saved in localStorage with timestamp keys.
- The app prevents adding or updating events with the same venue and date to avoid conflicts.
- Alerts provide feedback on successful or failed actions.
- The calendar visually marks dates with scheduled events.
- pdating events opens a form overlay prefilled with existing event data.
- Bootstrap 5 and bootstrap-icons are used for styling and UI icons, ensuring a consistent modern look.
