// pages/notes/index.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Notes = () => {
    const router = useRouter();
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch('/api/notes/list');
                if (response.ok) {
                    const data = await response.json();
                    setNotes(data.notes);
                } else {
                    console.error('Failed to fetch notes:', response.statusText);
                }
            } catch (error) {
                console.error('Error during fetch:', error);
            }
        };

        fetchNotes();
    }, []);

    const handleCreateNote = () => {
        router.push('/notes/create');
    };

    const handleViewDetail = (noteId) => {
        router.push(`/notes/${noteId}`);
    };

    return (
        <div>
            <h1>My Notes</h1>
            <button onClick={handleCreateNote}>Create Note</button>
            <ul>
                {notes.map((note) => (
                    <li key={note._id}>
                        <p>{note.title}</p>
                        <button onClick={() => handleViewDetail(note._id)}>View Detail</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notes;
