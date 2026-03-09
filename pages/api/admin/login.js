import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'naidu-cafe-secret-2024';
// Demo admin credentials (in prod, store in DB with hashed password)
const DEMO_ADMIN = { username: 'admin', password: 'naidu123' };

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { username, password } = req.body;
  if (username === DEMO_ADMIN.username && password === DEMO_ADMIN.password) {
    const token = jwt.sign({ username, role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
    return res.status(200).json({ success: true, token });
  }
  return res.status(401).json({ success: false, error: 'Invalid credentials' });
}
