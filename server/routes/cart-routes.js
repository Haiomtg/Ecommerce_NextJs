import express from 'express';

function createCartRouter(connection) {
    const router = express.Router();

    // ... existing routes ...

    // New route to view cart items
    router.get('/all', async (req, res) => {
        try {
            const sql = 'SELECT * FROM cart;';
            const [results] = await connection.query(sql);
            res.json(results);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // New route to update item quantity in cart
    router.put('/update/:id', async (req, res) => {
        try {
            const { quantity } = req.body; // Assuming quantity is sent in the request body

            // Validate required fields
            if (!quantity) {
                return res.status(400).json({ error: 'Quantity is required' });
            }

            const sql = 'UPDATE cart SET quantity = ? WHERE id = ?';
            const result = await connection.query(sql, [quantity, req.params.id]);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Cart item not found' });
            }
            res.json({ message: 'Cart item updated successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // New route to remove item from cart
    router.delete('/remove/:id', async (req, res) => {
        try {
            const sql = 'DELETE FROM cart WHERE id = ?';
            const result = await connection.query(sql, [req.params.id]);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Cart item not found' });
            }
            res.json({ message: 'Cart item removed successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // New route to add item to cart
    router.post('/add-to-cart/:productId', async (req, res) => {
        try {
            const productId = req.params.productId;

            // Check if the product already exists in the cart
            const checkSql = 'SELECT quantity FROM cart WHERE product_id = ?';
            const [existingProduct] = await connection.query(checkSql, [productId]);

            if (existingProduct.length > 0) {
                // Product exists, update the quantity
                const newQuantity = existingProduct[0].quantity + 1;
                const updateSql = 'UPDATE cart SET quantity = ? WHERE product_id = ?';
                await connection.query(updateSql, [newQuantity, productId]);
                return res.json({ message: 'Product quantity updated successfully' });
            }

            // Insert into cart table using SELECT
            const sql = `INSERT INTO cart (product_id, quantity, name, price) 
                             SELECT id, 1, title, price 
                             FROM product_list 
                             WHERE id = ?`;
            const result = await connection.query(sql, [productId]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Product not found' });
            }

            res.status(201).json({ message: 'Product added to cart successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // New route to get a specific cart item by ID
    router.get('/item/:id', async (req, res) => {
        try {
            const sql = 'SELECT * FROM cart WHERE id = ?';
            const results = await connection.query(sql, [req.params.id]);
            if (results.length === 0) {
                return res.status(404).json({ message: 'Cart item not found' });
            }
            res.json(results[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // New route to clear all items in the cart
    router.delete('/clear', async (req, res) => {
        try {
            const sql = 'DELETE FROM cart;';
            await connection.query(sql);
            res.json({ message: 'All items removed from cart successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // New route to checkout
    router.post('/checkout', async (req, res) => {
        try {
            const { paymentMethod } = req.body;
            const sql = 'INSERT INTO orders (payment_method) VALUES (?)';
            await connection.query(sql, [paymentMethod]);
            res.json({ message: 'Checkout successful' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });


    return router;
}

module.exports = createCartRouter;
