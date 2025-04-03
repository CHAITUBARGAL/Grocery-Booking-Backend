import mongoose, { Schema, Document } from 'mongoose';

interface IOrderItem {
  grocery: mongoose.Types.ObjectId;
  quantity: number;
}

export interface IOrder extends Document {
  userId: string;
  items: IOrderItem[];
  createdAt: Date;
}

const OrderSchema: Schema = new Schema({
  userId: { type: String, required: true },
  items: [{
    grocery: { type: mongoose.Schema.Types.ObjectId, ref: 'Grocery', required: true },
    quantity: { type: Number, required: true }
  }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IOrder>('Order', OrderSchema);
