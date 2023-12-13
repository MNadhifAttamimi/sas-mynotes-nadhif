// pages/notes/[id].js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const NoteDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const [note, setNote] = useState({});

    useEffect(() => {
        const fetchNoteDetail = async () => {
            try {
                const token = localStorage.getItem('yourAuthToken');
                const response = await fetch(`/api/notes/${id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    setNote(data.note);
                } else {
                    console.error('Failed to fetch note detail:', data);
                }
            } catch (error) {
                console.error('Error during fetch note detail:', error);
            }
        };

        if (id) {
            fetchNoteDetail();
        }
    }, [id]);

    const navigateBack = () => {
        // Redirect back to the notes page
        router.push('/create');
    };

    return (
        <div>
            <h1>Note Detail</h1>
            <p>Title: {note.title}</p>
            <p>Note: {note.note}</p>
            <div style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={navigateBack}>
                Back to Notes
            </div>
        </div>
    );
};

export default NoteDetail;
