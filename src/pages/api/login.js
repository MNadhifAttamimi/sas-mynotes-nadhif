// Import library dan modul yang diperlukan
import { generateRandomToken } from '../../utils/RandomToken';
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
import Users from '../../models/User';
import { connectMongoDB } from '../../db/mongoDB';

connectMongoDB();

// Handler untuk API login
export default async function handler(req, res) {
    try {
        if (req.method !== 'POST') {
            return res
                .status(405)
                .json({ error: true, message: 'method tidak diijinkan' });
        }

        const { username, password } = req.body;

        if (!username) {
            return res.status(400).json({ error: true, message: 'tidak ada username' });
        }

        if (!password) {
            return res
                .status(400)
                .json({ error: true, message: 'tidak ada Password' });
        }

        const user = await Users.findOne({ username, password });

        if (!user || !user.username) {
            return res.status(400).json({
                error: true,
                message: 'user tidak ditemukan',
            });
        }

        const token = generateRandomToken(10);

        const updatedUser = await Users.findOneAndUpdate(
            { username, password },
            { token },
            { new: true }
        );

        return res.status(200).json({ token });
    } catch (error) {
        console.error('error:', error);
        res.status(500).json({ error: true, message: 'ada masalah harap hubungi developer' });
    }
}
