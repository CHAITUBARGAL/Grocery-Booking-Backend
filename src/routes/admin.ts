import { Router } from 'express';
import Grocery from '../models/Grocery';

const router = Router();

// Add new grocery item
router.post('/grocery', async (req, res) => {
  try {
    const { name, price, inventory } = req.body;
    const grocery = new Grocery({ name, price, inventory });
    await grocery.save();
    res.status(201).json(grocery);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add grocery item' });
  }
});

// View existing grocery items
router.get('/grocery', async (req, res) => {
  try {
    const groceries = await Grocery.find();
    res.json(groceries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch grocery items' });
  }
});

// Update grocery item details
router.put('/grocery/:id', async (req, res) => {
  try {
    const { name, price, inventory } = req.body;
    const grocery = await Grocery.findByIdAndUpdate(
      req.params.id,
      { name, price, inventory },
      { new: true }
    );
    if (!grocery) return res.status(404).json({ error: 'Grocery item not found' });
    res.json(grocery);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update grocery item' });
  }
});

// Remove grocery item
router.delete('/grocery/:id', async (req, res) => {
  try {
    const grocery = await Grocery.findByIdAndDelete(req.params.id);
    if (!grocery) return res.status(404).json({ error: 'Grocery item not found' });
    res.json({ message: 'Grocery item removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove grocery item' });
  }
});

export default router;
