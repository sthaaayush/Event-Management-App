import './App.css';
import NavBar from './Component/NavBar';
import EventController from './Component/EventController';
import EventView from './Component/EventView';
import Home from './Component/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Alert from './Component/Alert';
import { useState } from 'react';


function App() {
  const [message, setMessage] = useState(""); //Message for Alert
  const [type, setType] = useState("") //Type of alert

  //Define alert for certain event
  const setAlert = (message, type) => {
    setMessage(message);
    setType(type);
    setTimeout(() => {
      setMessage("");
      setType("");
    }, 3000);
  }

  return (
    <>
      <Router>
        <NavBar />
        <Alert message={message} type={type} />
        <Routes>
          <Route exact path='/' element={<Home setAlert={setAlert} />} />
          <Route exact path="/eventDetails" element={<EventView setAlert={setAlert} />} />
          <Route exact path="/eventController" element={<EventController setAlert={setAlert} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
