import express from 'express';

function createRouter(connection) {
    const router = express.Router();

    router.get('/all', async (req, res) => {
        try {
            const sql = 'SELECT * FROM product_list;';
            const [results] = await connection.query(sql);
            res.json(results);
        } catch (error) {
            res.status(500).json({ error: error.message });
        } 
    });

    router.get('/:id', async (req, res) => {
        try {
            const sql = 'SELECT * FROM product_list WHERE id = ?';
            const results = await connection.query(sql, [req.params.id]);
            if (results.length === 0) {
                res.status(404).json({ message: 'Product not found' });
                return;
            }
            res.json(results[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    router.post('/add', async (req, res) => {
        try {
            const { title, img, description, price, category, details } = req.body;

            // Validate required fields
            if (!title || !img || !description || !price || !category || !details) {
                return res.status(400).json({ error: 'All fields are required' });
            }

            const sql = `INSERT INTO product_list (title, img, description, price, category, details) VALUES (?, ?, ?, ?, ?, ?)`;
            const values = [title, img, description, price, category, JSON.stringify(details)];

            const result = await connection.query(sql, values);
            res.status(201).json({ id: result.insertId, title, img, description, price, category, details });
        } catch (error) {
            console.error(error); // Log the error for debugging
            res.status(500).json({ error: error.message });
        }
    });

    router.put('/update/:id', async (req, res) => {
        try {
            const { title, img, description, price, category, detail } = req.body;
            const sql = 'UPDATE product_list SET title = ?, img = ?, description = ?, price = ?, category = ?, details = ? WHERE id = ?';
            const result = await connection.query(sql, [title, img, description, price, category, detail, req.params.id]);
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Product not found' });
                return;
            }
            res.json({ id: req.params.id, title, img, description, price, category, detail });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    router.delete('/delete/:id', async (req, res) => {
        try {
            const sql = 'DELETE FROM product_list WHERE id = ?';
            const result = await connection.query(sql, [req.params.id]);
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Product not found' });
                return;
            }
            res.json({ message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
}

module.exports = createRouter;
