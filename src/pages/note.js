// pages/notes/index.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Notes = () => {
    const router = useRouter();
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        // Gantilah URL API sesuai dengan backend Anda
        const apiUrl = '/api/server/notes';

        const fetchNotes = async () => {
            try {
                const response = await fetch(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Sesuaikan dengan cara penyimpanan token Anda
                    },
                });

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

    const handleCreateNote = async () => {
        try {
            const response = await fetch('/api/server/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Sesuaikan dengan cara penyimpanan token Anda
                },
                body: JSON.stringify({ title: 'New Note', note: 'Content of the new note' }),
            });

            if (response.ok) {
                const data = await response.json();
                const newNoteId = data.newNote._id;
                router.push(`/notes/${newNoteId}`);
            } else {
                console.error('Failed to create note:', response.statusText);
            }
        } catch (error) {
            console.error('Error during note creation:', error);
        }
    };

    const handleDeleteNote = async (noteId) => {
        try {
            const response = await fetch(`/api/server/notes/${noteId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Sesuaikan dengan cara penyimpanan token Anda
                },
            });

            if (response.ok) {
                // Hapus catatan dari state notes setelah berhasil menghapus
                setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
            } else {
                console.error('Failed to delete note:', response.statusText);
            }
        } catch (error) {
            console.error('Error during note deletion:', error);
        }
    };

    return (
        <div>
            <h1>My Notes</h1>
            <button onClick={handleCreateNote}>Create Note</button>
            <ul>
                {notes.map((note) => (
                    <li key={note._id}>
                        <p>{note.title}</p>
                        <button onClick={() => router.push(`/notes/${note._id}`)}>View Detail</button>
                        <button onClick={() => handleDeleteNote(note._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notes;
