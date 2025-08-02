import React, { useState } from 'react'

export default function EventController() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        venue: '',
        date: '',
        organizer: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let isDuplicate = false;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (/^\d{13}$/.test(key)) {
                const existingEventData = JSON.parse(localStorage.getItem(key));
                if (formData.venue === existingEventData.venue && formData.date === existingEventData.date) {
                    isDuplicate = true;
                    break;
                }
            }
        }
        if (isDuplicate) {
            alert("Collied with existing event");
        } else {
            localStorage.setItem(Date.now(), JSON.stringify(formData));
            setFormData({
                title: '',
                description: '',
                venue: '',
                date: '',
                organizer: ''
            });
        }
    }
    return (
        <div>
            <form className="container my-4 border border-black rounded p-5 w-50" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Event Title<code>*</code></label>
                    <input type="text" value={formData.title} className="form-control" id="title" placeholder="Enter event title" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description<code>*</code></label>
                    <textarea value={formData.description} className="form-control" id="description" rows="3" placeholder="Enter event description" required style={{ resize: 'none' }} onChange={handleChange}></textarea>
                </div>
                <div className='d-flex justify-content-between'>
                    <div className="mb-3 w-50">
                        <label htmlFor="venue" className="form-label">Venue<code>*</code></label>
                        <input type="text" value={formData.venue} className="form-control" id="venue" placeholder="Enter event venue" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="date" className="form-label" >Date<code>*</code></label>
                        <div className="input-group">
                            <input type="date" value={formData.date} className="form-control w-50" min={new Date().toISOString().split('T')[0]} id="date" required onChange={handleChange} />
                        </div>
                        <div className="form-text">Select calendar format</div>
                    </div>
                </div>
                {/* Optional Field */}
                <div className="mb-3">
                    <label htmlFor="organizer" className="form-label">Organizer (optional)</label>
                    <input type="text" value={formData.organizer} className="form-control" id="organizer" placeholder="Enter organizer name" onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Add Event</button>
            </form>

        </div>
    )
}
