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
const router = (0, express_1.Router)();
// Add new grocery item
router.post('/grocery', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, inventory } = req.body;
        const grocery = new Grocery_1.default({ name, price, inventory });
        yield grocery.save();
        res.status(201).json(grocery);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to add grocery item' });
    }
}));
// View existing grocery items
router.get('/grocery', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groceries = yield Grocery_1.default.find();
        res.json(groceries);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch grocery items' });
    }
}));
// Update grocery item details
router.put('/grocery/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, inventory } = req.body;
        const grocery = yield Grocery_1.default.findByIdAndUpdate(req.params.id, { name, price, inventory }, { new: true });
        if (!grocery)
            return res.status(404).json({ error: 'Grocery item not found' });
        res.json(grocery);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update grocery item' });
    }
}));
// Remove grocery item
router.delete('/grocery/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const grocery = yield Grocery_1.default.findByIdAndDelete(req.params.id);
        if (!grocery)
            return res.status(404).json({ error: 'Grocery item not found' });
        res.json({ message: 'Grocery item removed successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to remove grocery item' });
    }
}));
exports.default = router;
