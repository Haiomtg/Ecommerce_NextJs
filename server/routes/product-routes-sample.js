import express from 'express';
const router = express.Router();
import { Product, Tag } from '../../models';

// GET all products
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
        include: [{ model: Tag }],
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single product by id
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Tag }],
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// POST a new product
router.post('/', async (req, res) => {
  try {
    const productData = await Product.create(req.body);
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// PUT update a product by id
router.put('/:id', async (req, res) => {
  try {
    const productData = await Product.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// DELETE a product by id
router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;