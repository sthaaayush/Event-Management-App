import React from 'react'

export default function Home() {
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
                const id = Date.now() + index; // unique key like event-<timestamp>-<index>
                localStorage.setItem(id, JSON.stringify(event));
        });

        alert("Sample events added to localStorage.");
    }
    return (
        <div>
            <button onClick={addSampleEventsToLocalStorage}>Add Sample Events</button>
            <button onClick={() => { localStorage.clear(); }}>Clear data</button>
        </div>
    )
}
