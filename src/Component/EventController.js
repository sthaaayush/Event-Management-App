import React, { useState } from 'react'

export default function EventController({setAlert}) {
    // state for the form inputs
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        venue: '',
        date: '',
        organizer: ''
    })

    // update form data on input change
    const handleChange = (e) => {
        const { id, value } = e.target
        setFormData((prev) => ({ ...prev, [id]: value }))
    }

    // form submit handler
    const handleSubmit = (e) => {
        e.preventDefault()

        // check for event conflict: same venue and date
        let isDuplicate = false
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i)
            if (/^\d{13}$/.test(key)) {
                const existingEventData = JSON.parse(localStorage.getItem(key))
                if (
                    formData.venue === existingEventData.venue &&
                    formData.date === existingEventData.date
                ) {
                    isDuplicate = true
                    break
                }
            }
        }

        if (isDuplicate) {
            setAlert('Oops! This event collides with an existing one.', 'danger');
        } else {
            // save event with current timestamp key
            localStorage.setItem(Date.now(), JSON.stringify(formData))
            setAlert("Event Created", 'success')
            // reset form for convenience
            setFormData({
                title: '',
                description: '',
                venue: '',
                date: '',
                organizer: ''
            })
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light my-5">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded p-5 h-10"
                style={{ width: '40em', maxWidth: '100vw' }}
            >
                <h3 className="mb-4 text-primary border-bottom pb-2 text-center">
                    Add New Event
                </h3>

                {/* Event Title */}
                <div className="mb-4">
                    <label htmlFor="title" className="form-label fw-semibold">
                        Event Title <code>*</code>
                    </label>
                    <input
                        type="text"
                        id="title"
                        className="form-control"
                        placeholder="Enter event title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label htmlFor="description" className="form-label fw-semibold">
                        Description <code>*</code>
                    </label>
                    <textarea
                        id="description"
                        className="form-control"
                        rows="4"
                        placeholder="Enter event description"
                        style={{ resize: 'none' }}
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Venue and Date side by side */}
                <div className="d-flex gap-3 mb-4">
                    <div className="flex-fill">
                        <label htmlFor="venue" className="form-label fw-semibold">
                            Venue <code>*</code>
                        </label>
                        <input
                            type="text"
                            id="venue"
                            className="form-control"
                            placeholder="Event venue"
                            value={formData.venue}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div style={{ minWidth: '150px' }}>
                        <label htmlFor="date" className="form-label fw-semibold">
                            Date <code>*</code>
                        </label>
                        <input
                            type="date"
                            id="date"
                            className="form-control"
                            value={formData.date}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {/* Organizer (optional) */}
                <div className="mb-4">
                    <label htmlFor="organizer" className="form-label fw-semibold">
                        Organizer <small className="text-muted">(optional)</small>
                    </label>
                    <input
                        type="text"
                        id="organizer"
                        className="form-control"
                        placeholder="Organizer name"
                        value={formData.organizer}
                        onChange={handleChange}
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-100 fw-semibold">
                    Add Event
                </button>
            </form>
        </div>
    )
}
