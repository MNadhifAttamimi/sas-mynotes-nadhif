import { connectMongoDB } from "../../db/mongoDB";
import User from "@/models/User";
import Note from "@/models/Note";
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
const { format } = require('date-fns');
const { v4: uuidv4 } = require('uuid');

connectMongoDB();

export default async function handler(req, res) {
    try {
        if (req.method !== 'POST') {
            return res.status(405).json({ error: true, message: 'Salah method' });
        }

        const token = req.headers.authorization; // Extract token from headers
        const user = await User.findOne({ token });

        if (!user || !user.name) {
            deleteCookie('token', { req, res });
            return res.status(400).json({
                error: true,
                message: 'token tidak valid',
            });
        }

        const { title, note } = req.body;

        if (!title || !note) {
            return res.status(400).json({ error: true, message: 'Berkas yang anda kirimkan belum lengkap' });
        }

        if (title.length < 3 || title.length >= 60) {
            return res.status(400).json({
                error: true,
                message: 'title harus diantar 3 sampai 60 karakter',
            });
        } else if (note.length === 0 || note.length >= 2000) {
            return res.status(400).json({
                error: true,
                message: 'note tidak boleh lebih dari 2000 karakter',
            });
        }

        const userId = uuidv4();

        const today = new Date();
        const formattedDate = format(today, 'yyyy-MM-dd HH:mm:ss');

        const data = {
            title,
            note,
            userId,
            date: formattedDate
        };

        const newNote = new Note(data);
        await newNote.save();

        return res.status(201).json({ message: 'Data sudah berhasil diinputkan' });

    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: true, message: 'Internal Server Error', details: err.message });
    }
}
