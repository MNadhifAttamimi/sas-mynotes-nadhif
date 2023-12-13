    // pages/api/server.js
    import connectDB from '../../db/mongoDB';
    import User from '../../models/User';
    import Note from '../../models/Note';
    import bcrypt from 'bcrypt';
    import jwt from 'jsonwebtoken';

    connectDB();

    // Tambahkan middleware untuk parse JSON body
    export const config = {
        api: {
            bodyParser: {
                sizeLimit: '1mb',
            },
        },
    };

    export default async function handler(req, res) {
        if (req.method === 'POST') {
            // API endpoint untuk registrasi
            try {
                const { name, username, password } = req.body;
                const hashedPassword = await bcrypt.hash(password, 10);

                const user = await User.create({
                    name,
                    username,
                    password: hashedPassword,
                });

                const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '30d' });
                user.token = token;
                await user.save();

                res.status(201).json({ user, token });
            } catch (error) {
                console.error('Error during registration:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        } else if (req.method === 'GET' && req.url === '/notes') {
            // API endpoint untuk mendapatkan semua catatan pengguna
            try {
                const userId = req.headers.authorization.split(' ')[1];
                const notes = await Note.find({ user_id: userId });
                res.status(200).json({ notes });
            } catch (error) {
                console.error('Error fetching notes:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        } else if (req.method === 'GET' && req.url === '/notes/[id]') {
            // API endpoint untuk mendapatkan detail catatan
            try {
                const userId = req.headers.authorization.split(' ')[1];
                const note = await Note.findOne({ _id: req.query.id, user_id: userId });

                if (!note) {
                    return res.status(404).json({ error: 'Note not found' });
                }

                res.status(200).json({ note });
            } catch (error) {
                console.error('Error fetching note detail:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        } else if (req.method === 'POST' && req.url === '/notes') {
            // API endpoint untuk membuat catatan baru
            try {
                const userId = req.headers.authorization.split(' ')[1];
                const { title, note } = req.body;

                const newNote = await Note.create({
                    title,
                    note,
                    user_id: userId,
                });

                res.status(201).json({ newNote });
            } catch (error) {
                console.error('Error creating note:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        } else if (req.method === 'DELETE' && req.url === '/notes/[id]') {
            // API endpoint untuk menghapus catatan
            try {
                const userId = req.headers.authorization.split(' ')[1];
                const noteId = req.query.id;

                const deletedNote = await Note.findOneAndDelete({ _id: noteId, user_id: userId });

                if (!deletedNote) {
                    return res.status(404).json({ error: 'Note not found' });
                }

                res.status(200).json({ message: 'Note deleted successfully' });
            } catch (error) {
                console.error('Error deleting note:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        } else {
            // Handle metode yang tidak diizinkan
            res.status(405).json({ error: 'Method Not Allowed' });
        }
    }
