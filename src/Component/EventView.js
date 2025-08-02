import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

export default function EventView({ setAlert }) {
    // track which date is selected on the calendar
    const [selectedDate, setSelectedDate] = useState(new Date())

    // custom styles to hide scrollbar but still allow scrolling on event list panel
    // had to keep some inline styles because Bootstrap doesn’t cover these exactly
    const hideScrollbar = {
        overflowY: 'scroll',        // enable vertical scrolling
        scrollbarWidth: 'none',     // hide scrollbar in Firefox
        msOverflowStyle: 'none',    // hide scrollbar in IE 10+
        flex: '1',                  // flex-grow so it fills remaining space nicely
        minWidth: '350px',          // prevent panel from getting too narrow
        maxHeight: '113vh',         // limit max height with viewport consideration
        height: '43em'              // fixed height for scrolling area
    }

    // holds details of the currently displayed event
    // initialize with the latest event found in localStorage by timestamp key
    const [eventDetails, setEventDetails] = useState(() => {
        let latestKey = null
        let max = 0

        // look through localStorage keys to find those that look like timestamps
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i)
            if (/^\d{13}$/.test(key)) { // 13-digit keys are treated as event timestamps
                const numKey = parseInt(key)
                if (numKey > max) {
                    max = numKey
                    latestKey = key
                }
            }
        }

        // return event data from the latest key, or empty event object if none found
        return latestKey
            ? JSON.parse(localStorage.getItem(latestKey))
            : {
                title: '',
                description: '',
                venue: '',
                date: '',
                organizer: ''
            }
    })

    // array of all event objects loaded from localStorage
    const [eventData, setEventData] = useState([])

    // load all events from localStorage once on mount
    useEffect(() => {
        const data = []

        // grab all localStorage items with 13-digit keys and parse them as events
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i)
            if (/^\d{13}$/.test(key)) {
                const item = localStorage.getItem(key)
                if (item) {
                    data.push({ ...JSON.parse(item), key })
                }
            }
        }

        setEventData(data) // save all events to state

        // if there's an event for today, show it by default
        const todayEvent = data.find(
            (item) => item.date === new Date().toISOString().split('T')[0]
        )
        if (todayEvent) setEventDetails(todayEvent)
    }, [])

    // removes event both from localStorage and the displayed list
    const deleteEvent = (key) => {
        if (window.confirm("Are you sure")) {
            localStorage.removeItem(key) // delete from storage
            setEventData((prev) => prev.filter((event) => event.key !== key)) // update UI
            setAlert("Event Deleted", 'danger');
        }
    }

    return (
        // main container with light background and padding
        <div className="d-flex flex-wrap bg-light min-vh-100 p-4">
            {/* Left panel: event details and calendar */}
            <div
                className="container shadow-sm bg-white rounded p-4 me-4 mb-4 flex-grow-1"
                style={{ flex: '2' }} // keep bigger than right panel
            >
                {/* Event details section */}
                <div className="mb-4">
                    <h4 className="text-primary mb-3 border-bottom pb-2">Event Details</h4>
                    <p>
                        <strong>Title:</strong>{' '}
                        {eventDetails.title || <span className="text-muted">N/A</span>}
                    </p>
                    <p>
                        <strong>Description:</strong>{' '}
                        {eventDetails.description || <span className="text-muted">N/A</span>}
                    </p>
                    <p>
                        <strong>Venue:</strong>{' '}
                        {eventDetails.venue || <span className="text-muted">N/A</span>}
                    </p>
                    <p>
                        <strong>Date:</strong>{' '}
                        {eventDetails.date || <span className="text-muted">N/A</span>}
                    </p>
                    <p>
                        <strong>Organizer:</strong>{' '}
                        {eventDetails.organizer || <span className="text-muted">N/A</span>}
                    </p>
                </div>

                <hr />

                {/* Calendar section */}
                <div className="border p-3 rounded">
                    <h5 className="mb-3">📆 Select a Date</h5>
                    <Calendar
                        className="w-100 h-100 d-flex flex-column justify-content-evenly rounded shadow-sm"
                        onChange={setSelectedDate}
                        value={selectedDate}
                        tileClassName={({ date, view }) => {
                            const formattedDate = date.toLocaleDateString('en-CA')
                            // highlight tiles with events using the global CSS occupied-date class
                            if (view === 'month' && eventData.some((e) => e.date === formattedDate)) {
                                return 'occupied-date'
                            }
                            return null
                        }}
                        onClickDay={(date) => {
                            // when user clicks a day, find event or show empty with date filled
                            const formattedDate = date.toLocaleDateString('en-CA')
                            const matchedEvent = eventData.find((e) => e.date === formattedDate)
                            if (matchedEvent) {
                                setEventDetails(matchedEvent)
                            } else {
                                setEventDetails({
                                    title: '',
                                    description: '',
                                    venue: '',
                                    date: formattedDate,
                                    organizer: ''
                                })
                            }
                        }}
                        style={{
                            width: '100%',
                            fontSize: '1.1rem',
                            transform: 'scale(1.05)', // gently enlarge calendar for better UX
                            transformOrigin: 'top left'
                        }}
                    />
                </div>
            </div>

            {/* Right panel: list of all events */}
            <div className="container shadow-sm bg-white rounded p-4" style={hideScrollbar}>
                <h4 className="text-success mb-3 border-bottom pb-2">All Events</h4>
                {eventData.length === 0 ? (
                    <p className="text-muted">No events available.</p>
                ) : (
                    eventData.map((item) => (
                        <div key={item.key} className="card mb-3 shadow-sm">
                            <div className="card-body d-flex justify-content-between align-items-start">
                                {/* click event summary to load details */}
                                <div
                                    className="me-3"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => setEventDetails(item)}
                                >
                                    <h5 className="card-title">{item.title}</h5>
                                    <p className="card-text mb-1">
                                        <small>{item.venue}</small>
                                    </p>
                                    <p className="card-text">
                                        <small>{item.date}</small>
                                    </p>
                                </div>

                                {/* update & delete buttons */}
                                <div className="d-flex flex-column">
                                    <button
                                        className="btn btn-outline-info btn-sm mb-2"
                                        onClick={() => console.log('Update')}
                                    >
                                        ✏️ Update
                                    </button>
                                    <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => deleteEvent(item.key)}
                                    >
                                        🗑️ Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
