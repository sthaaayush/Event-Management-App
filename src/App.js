import './App.css';
import NavBar from './Component/NavBar';
import EventController from './Component/EventController';
import EventView from './Component/EventView';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/eventDetails" element={<EventView />} />
          <Route exact path="/eventController" element={ <EventController />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
