import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css' // ensure this is imported

export default function Home({ setAlert }) {

    // Function to add predefined sample events to localStorage
    function addSampleEventsToLocalStorage() {
        const sampleEvents = [
            {
                title: "Tech Talk 2025",
                description: "A seminar on emerging technologies and innovations.",
                venue: "KIST Seminar Hall",
                date: "2025-08-05",
                organizer: "Computer Club"
            },
            {
                title: "HackFest 2025",
                description: "48-hour coding competition for tech enthusiasts.",
                venue: "Main Lab, KIST",
                date: "2025-09-10",
                organizer: "Tech Society"
            },
            {
                title: "Design Sprint",
                description: "UI/UX challenge for creative minds.",
                venue: "Auditorium",
                date: "2025-08-20",
                organizer: "Design Cell"
            },
            {
                title: "Startup Meet",
                description: "Interaction with startup founders and investors.",
                venue: "Room 305",
                date: "2025-10-01",
                organizer: "Entrepreneurship Club"
            },
            {
                title: "AI Workshop",
                description: "Hands-on workshop on AI and ML tools.",
                venue: "Lab 4, KIST",
                date: "2025-08-15",
                organizer: "AI Enthusiasts Group"
            }
        ];

        sampleEvents.forEach((event, index) => {
            const id = Date.now() + index;
            localStorage.setItem(id, JSON.stringify(event));
        });

        setAlert("Sample events added to localStorage.", 'success');
    }

    return (
        <div className="container my-5">

            {/* Introduction Section */}
            <div className="mb-4 p-4 bg-light border rounded shadow-sm">
                <h2 className="mb-3">
                    <i className="bi bi-calendar-week me-2 text-primary"></i>
                    Welcome to the Event Management Panel
                </h2>
                <p className="lead">
                    This platform helps you organize, manage, and track various academic and extracurricular events with ease. Whether it’s a hackathons, workshop, or seminar — plan everything seamlessly in one place.
                </p>
            </div>

            {/* Localstorage Action Buttons */}
            <div className="mb-4 d-flex gap-3 flex-wrap">
                <button
                    onClick={addSampleEventsToLocalStorage}
                    className="btn btn-outline-success"
                >
                    <i className="bi bi-plus-circle me-2"></i>
                    Add Sample Events
                </button>

                <button
                    onClick={() => {
                        localStorage.clear();
                        setAlert("Cleared Local Storage", 'danger');
                    }}
                    className="btn btn-outline-danger"
                >
                    <i className="bi bi-trash3 me-2"></i>
                    Clear Data
                </button>
            </div>

            {/* General Info Section */}
            <div className="card border-primary shadow-sm">
                <div className="card-header bg-primary text-white">
                    <i className="bi bi-info-circle me-2"></i>
                    General Event Info
                </div>
                <div className="card-body">
                    <p className="card-text">
                        <i className="bi bi-calendar-event me-2 text-primary"></i>
                        <strong>Plan Events:</strong> Schedule events like seminars, hackathons, or workshops easily.
                    </p>
                    <p className="card-text">
                        <i className="bi bi-geo-alt-fill me-2 text-success"></i>
                        <strong>Venue Management:</strong> Assign appropriate venues to avoid overlaps.
                    </p>
                    <p className="card-text">
                        <i className="bi bi-people-fill me-2 text-warning"></i>
                        <strong>Organizers:</strong> Keep track of clubs and groups responsible for each event.
                    </p>
                    <p className="card-text">
                        <i className="bi bi-laptop me-2 text-danger"></i>
                        <strong>Tech Focus:</strong> Ideal for managing technical events in college or community.
                    </p>
                </div>
            </div>
        </div>
    );
}
