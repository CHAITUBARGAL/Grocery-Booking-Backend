import { Router } from 'express';
import Grocery from '../models/Grocery';
import Order from '../models/Order';

const router = Router();

// View available grocery items (inventory > 0)
router.get('/grocery', async (req, res) => {
  try {
    const groceries = await Grocery.find({ inventory: { $gt: 0 } });
    res.json(groceries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch grocery items' });
  }
});

// Book multiple grocery items in a single order
router.post('/booking', async (req, res) => {
  try {
    const { userId, items } = req.body; // items: array of { groceryId, quantity }
    
    // Check and update inventory for each item
    for (const item of items) {
      const grocery = await Grocery.findById(item.groceryId);
      if (!grocery || grocery.inventory < item.quantity) {
        return res.status(400).json({ error: `Insufficient inventory for item: ${item.groceryId}` });
      }
      grocery.inventory -= item.quantity;
      await grocery.save();
    }
    
    const order = new Order({
      userId,
      items: items.map((item: any) => ({ grocery: item.groceryId, quantity: item.quantity }))
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});


export default router;
