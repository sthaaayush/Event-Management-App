import React, { useState, useEffect } from 'react';

export default function UpdateComponent({ eventToEdit, onClose, onUpdate }) {
    const [formData, setFormData] = useState({ //initial data frame
        title: '',
        description: '',
        venue: '',
        date: '',
        organizer: ''
    });

    // whenever eventToEdit changes, update local form state
    useEffect(() => {
        if (eventToEdit) {
            setFormData({
                title: eventToEdit.title || '',
                description: eventToEdit.description || '',
                venue: eventToEdit.venue || '',
                date: eventToEdit.date || '',
                organizer: eventToEdit.organizer || ''
            });
        }
    }, [eventToEdit]);

    // handle input changes
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    // on form submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // Save updated data to localStorage using the existing event key
        if (eventToEdit && eventToEdit.key) {
            localStorage.setItem(eventToEdit.key, JSON.stringify(formData));
            onUpdate(formData, eventToEdit.key); // inform parent of update
            onClose(); // close the update form
        }
    };

    return (
        <div
            className="position-fixed top-50 start-50 translate-middle bg-white rounded shadow p-4"
            style={{
                width: '400px',
                zIndex: 1050
            }}
        >
            <h5 className="mb-3">Update Event</h5>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title <code>*</code></label>
                    <input
                        type="text"
                        id="title"
                        className="form-control"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        autoFocus
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description <code>*</code></label>
                    <textarea
                        id="description"
                        className="form-control"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        required
                        style={{ resize: 'none' }}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="venue" className="form-label">Venue <code>*</code></label>
                    <input
                        type="text"
                        id="venue"
                        className="form-control"
                        value={formData.venue}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date <code>*</code></label>
                    <input
                        type="date"
                        id="date"
                        className="form-control"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="organizer" className="form-label">Organizer (optional)</label>
                    <input
                        type="text"
                        id="organizer"
                        className="form-control"
                        value={formData.organizer}
                        onChange={handleChange}
                    />
                </div>

                <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-secondary me-2" onClick={onClose}>
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
