// pages/notes/index.js
import React from 'react';

const NotesPage = ({ notes }) => {
    const navigateToNote = (noteId) => {
        // Redirect to the note page
        window.location.href = `/notes/${noteId}`;
    };

    return (
        <div>
            <h1>Notes</h1>
            <ul>
                {notes.map((note) => (
                    <li key={note.id}>
                        <a
                            style={{ cursor: 'pointer', textDecoration: 'underline' }}
                            onClick={() => navigateToNote(note.id)}
                        >
                            {note.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export async function getStaticProps() {
    // Fetch notes data, replace this with your data fetching logic
    const notes = [
        { id: '1', title: 'Note 1' },
        { id: '2', title: 'Note 2' },
        { id: '3', title: 'Note 3' },
    ];

    return {
        props: {
            notes,
        },
    };
}

export default NotesPage;
