import { getConnection } from "../database/db.js";

export const getAllProducts = async (req, res) => {
    try {
        const db = await getConnection();
        const sql = 'SELECT * FROM product_list;';
        const [results] = await db.execute(sql);
        return res.json(results);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
};

export const getProductById = async (req, res) => {
    try {
        const db = await getConnection();
        const sql = 'SELECT * FROM product_list WHERE id = ?';
        const [results] = await db.execute(sql, [req.params.id]);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.json(results[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
    };

export const addProduct = async (req, res) => {
    try {
        const db = await getConnection();
        const { title, img, description, price, category, details } = req.body;

        // Validate required fields
        if (!title || !img || !description || !price || !category || !details) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const sql = `INSERT INTO product_list (title, img, description, price, category, details) VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [title, img, description, price, category, JSON.stringify(details)];

        const [result] = await db.execute(sql, values);
        return res.status(201).json({ id: result.insertId, title, img, description, price, category, details });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const db = await getConnection();
        const { title, img, description, price, category, detail } = req.body;
        const sql = 'UPDATE product_list SET title = ?, img = ?, description = ?, price = ?, category = ?, details = ? WHERE id = ?';
        const [result] = await db.execute(sql, [title, img, description, price, category, detail, req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.json({ id: req.params.id, title, img, description, price, category, detail });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const db = await getConnection();
        const sql = 'DELETE FROM product_list WHERE id = ?';
        const [result] = await db.execute(sql, [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

