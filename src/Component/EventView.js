import React, { useState, useEffect } from 'react'

export default function EventView() {
    const [eventDetails, setEventDetails] = useState(() => {
        let latestKey = null;
        let max = 0;

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (/^\d{13}$/.test(key)) {
                const numKey = parseInt(key);
                if (numKey > max) {
                    max = numKey;
                    latestKey = key;
                }
            }
        }

        return latestKey ? JSON.parse(localStorage.getItem(latestKey)) : {
            title: '',
            description: '',
            venue: '',
            date: '',
            organizer: ''
        };
    });



    const [eventData, setEventData] = useState([]);
    useEffect(() => {
        const data = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (/^\d{13}$/.test(key)) {
                const item = localStorage.getItem(key);
                if (item) {
                    data.push(JSON.parse(item));
                }
            }
        }
        setEventData(data);
    }, []);

    return (
        <div className='d-flex'>
            <div className='w-100 border border-black rounded mx-2 my-2'>
                <h2>Event Details</h2>
                <p><strong>Title:</strong> {eventDetails.title}</p>
                <p><strong>Description:</strong> {eventDetails.description}</p>
                <p><strong>Venue:</strong> {eventDetails.venue}</p>
                <p><strong>Date:</strong> {eventDetails.date}</p>
                <p><strong>Organizer:</strong> {eventDetails.organizer}</p>
            </div>
            <div className='container w-75 d-flex flex-column-reverse'>
                {
                    eventData.map((item, index) => (
                        <div key={index} className='border border-black rounded w-75 my-3 mx-2 d-flex justify-content-between' onClick={() => { setEventDetails(item) }} style={{ cursor: 'pointer' }}>
                            <ul className='d-flex flex-column justify-content-between'>
                                <li>{item.title}</li>
                                <li>{item.venue}</li>
                                <li>{item.date}</li>
                            </ul>
                            <div className='d-flex flex-column w-25'>
                                <button className='btn btn-info my-2 mx-2' onClick={() => { console.log("Update") }}>Update</button>
                                <button className='btn btn-danger my-2 mx-2' onClick={() => { console.log("Delete") }}>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
