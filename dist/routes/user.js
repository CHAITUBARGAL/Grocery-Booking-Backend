"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Grocery_1 = __importDefault(require("../models/Grocery"));
const Order_1 = __importDefault(require("../models/Order"));
const router = (0, express_1.Router)();
// View available grocery items (inventory > 0)
router.get('/grocery', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groceries = yield Grocery_1.default.find({ inventory: { $gt: 0 } });
        res.json(groceries);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch grocery items' });
    }
}));
// Book multiple grocery items in a single order
router.post('/booking', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, items } = req.body; // items: array of { groceryId, quantity }
        // Check and update inventory for each item
        for (const item of items) {
            const grocery = yield Grocery_1.default.findById(item.groceryId);
            if (!grocery || grocery.inventory < item.quantity) {
                return res.status(400).json({ error: `Insufficient inventory for item: ${item.groceryId}` });
            }
            grocery.inventory -= item.quantity;
            yield grocery.save();
        }
        const order = new Order_1.default({
            userId,
            items: items.map((item) => ({ grocery: item.groceryId, quantity: item.quantity }))
        });
        yield order.save();
        res.status(201).json(order);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create order' });
    }
}));
exports.default = router;
