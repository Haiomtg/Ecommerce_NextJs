import connection from '../lib/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const [rows] = await connection.query('SELECT * FROM products');
            res.status(200).json(rows);
        } catch (error) {
            res.status(500).json({ error: 'Database query failed' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}