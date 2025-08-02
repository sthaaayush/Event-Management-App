import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function EventView() {
    // state to track currently selected date in the calendar
    const [selectedDate, setSelectedDate] = useState(new Date());

    // custom style to hide scrollbar but keep scrolling functionality
    const hideScrollbar = {
        overflowY: 'scroll',
        scrollbarWidth: 'none',        // hides scrollbar in Firefox
        msOverflowStyle: 'none',        // hides scrollbar in IE 10+
        height: '50em'
    }

    // state to track the event currently being displayed in detail
    const [eventDetails, setEventDetails] = useState(() => {
        // find the most recent event by checking timestamp-like keys (13 digit numbers)
        let latestKey = null;
        let max = 0;

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (/^\d{13}$/.test(key)) { // checks if the key is a 13-digit number
                const numKey = parseInt(key);
                if (numKey > max) {
                    max = numKey;
                    latestKey = key;
                }
            }
        }

        // load the latest event or return default empty event object
        return latestKey ? JSON.parse(localStorage.getItem(latestKey)) : {
            title: '',
            description: '',
            venue: '',
            date: '',
            organizer: ''
        };
    });

    // state to store all events loaded from localStorage
    const [eventData, setEventData] = useState([]);

    // this runs once when the component is mounted
    useEffect(() => {
        const data = [];

        // loop through all localStorage keys to find event data
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (/^\d{13}$/.test(key)) { // only consider 13-digit numeric keys
                const item = localStorage.getItem(key);
                if (item) {
                    // store each event with its key
                    data.push({ ...JSON.parse(item), key });
                }
            }
        }

        setEventData(data); // update the state with all events

        // check if there's an event for today's date and show it by default
        const todayEvent = data.find(item => item.date === new Date().toISOString().split('T')[0]);
        if (todayEvent) setEventDetails(todayEvent);
    }, []);

    // delete event from localStorage and also update UI
    const deleteEvent = (key) => {
        localStorage.removeItem(key);
        setEventData(prev => prev.filter(event => event.key !== key));
    }

    return (
        <div className='d-flex'>
            <div className='container mx-2 my-2'>
                {/* Event detail section */}
                <div className='w-100 border border-black rounded mb-3 d-flex flex-column justify-content-evenly px-4' style={{ height: "20em" }}>
                    <h2>Event Details</h2>
                    <p><strong>Title:</strong> {eventDetails.title}</p>
                    <p><strong>Description:</strong> {eventDetails.description}</p>
                    <p><strong>Venue:</strong> {eventDetails.venue}</p>
                    <p><strong>Date:</strong> {eventDetails.date}</p>
                    <p><strong>Organizer:</strong> {eventDetails.organizer}</p>
                </div>

                {/* Calendar section */}
                <div className='h-50 w-100 border border-black rounded mb-5 p-4'>
                    <Calendar
                        onChange={setSelectedDate}
                        value={selectedDate}
                        onClickDay={(date) => {
                            const formattedDate = date.toLocaleDateString('en-CA');
                            const matchedEvent = eventData.find(event => event.date === formattedDate);
                            if (matchedEvent) {
                                setEventDetails(matchedEvent);
                            } else {
                                setEventDetails({
                                    title: '',
                                    description: '',
                                    venue: '',
                                    date: formattedDate,
                                    organizer: ''
                                });
                            }
                        }}
                        tileClassName={({ date, view }) => {
                            const formattedDate = date.toLocaleDateString('en-CA');
                            if (view === 'month' && eventData.some(event => event.date === formattedDate)) {
                                return 'occupied-date';
                            }
                            return null;
                        }}
                    />

                </div>
            </div>

            {/* List of all events on the right */}
            <div className='container w-50 d-flex flex-column overflow-y-scroll' style={hideScrollbar}>
                {
                    eventData.map((item) => (
                        <div key={item.key} className='border border-black rounded w-100 my-2 mx-2 d-flex justify-content-between' >
                            {/* Clickable event summary */}
                            <ul className='d-flex flex-column justify-content-between' onClick={() => { setEventDetails(item) }} style={{ cursor: 'pointer' }}>
                                <li>{item.title}</li>
                                <li>{item.venue}</li>
                                <li>{item.date}</li>
                            </ul>

                            {/* Action buttons for each event */}
                            <div className='d-flex flex-column w-25'>
                                <button className='btn btn-info my-2 mx-2' onClick={() => { console.log("Update") }}>Update</button>
                                <button className='btn btn-danger my-2 mx-2' onClick={() => { deleteEvent(item.key) }}>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
