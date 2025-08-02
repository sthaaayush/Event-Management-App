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
        height: '43em'
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
    <div className='d-flex flex-wrap bg-light' style={{ minHeight: '100vh', padding: '2em' }}>
        {/* Left Panel: Calendar and Event Details */}
        <div className='container shadow-sm bg-white rounded p-4 me-4 mb-4' style={{ flex: '1', minWidth: '350px', maxWidth: '600px' }}>
            {/* Event Details */}
            <div className='mb-4'>
                <h4 className='text-primary mb-3 border-bottom pb-2'>📌 Event Details</h4>
                <p><strong>📝 Title:</strong> {eventDetails.title || <span className="text-muted">N/A</span>}</p>
                <p><strong>🗒️ Description:</strong> {eventDetails.description || <span className="text-muted">N/A</span>}</p>
                <p><strong>📍 Venue:</strong> {eventDetails.venue || <span className="text-muted">N/A</span>}</p>
                <p><strong>📅 Date:</strong> {eventDetails.date || <span className="text-muted">N/A</span>}</p>
                <p><strong>👤 Organizer:</strong> {eventDetails.organizer || <span className="text-muted">N/A</span>}</p>
            </div>

            {/* Calendar */}
            <div className='border p-3 rounded'>
                <h5 className='mb-3'>📆 Select a Date</h5>
                <Calendar
                    className="rounded shadow-sm"
                    onChange={setSelectedDate}
                    value={selectedDate}
                    tileClassName={({ date, view }) => {
                        const formattedDate = date.toLocaleDateString('en-CA');
                        if (view === 'month' && eventData.some(event => event.date === formattedDate)) {
                            return 'bg-warning text-white rounded'; // highlight dates with events
                        }
                        return null;
                    }}
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
                    style={{
                        width: '100%',
                        fontSize: '1.1rem',
                        transform: 'scale(1.05)',
                        transformOrigin: 'top left'
                    }}
                />
            </div>
        </div>

        {/* Right Panel: Event List */}
        <div className='container shadow-sm bg-white rounded p-4' style={{ flex: '1', minWidth: '350px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h4 className='text-success mb-3 border-bottom pb-2'>📚 All Events</h4>
            {
                eventData.length === 0 ? (
                    <p className='text-muted'>No events available.</p>
                ) : (
                    eventData.map((item) => (
                        <div key={item.key} className='card mb-3 shadow-sm'>
                            <div className='card-body d-flex justify-content-between align-items-start'>
                                <div className='me-3' style={{ cursor: 'pointer' }} onClick={() => setEventDetails(item)}>
                                    <h5 className='card-title'>{item.title}</h5>
                                    <p className='card-text mb-1'><small>📍 {item.venue}</small></p>
                                    <p className='card-text'><small>📅 {item.date}</small></p>
                                </div>
                                <div className='d-flex flex-column'>
                                    <button className='btn btn-outline-info btn-sm mb-2' onClick={() => console.log("Update")}>✏️ Update</button>
                                    <button className='btn btn-outline-danger btn-sm' onClick={() => deleteEvent(item.key)}>🗑️ Delete</button>
                                </div>
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    </div>
)

}
