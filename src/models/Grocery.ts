import mongoose, { Schema, Document } from 'mongoose';

export interface IGrocery extends Document {
  name: string;
  price: number;
  inventory: number;
}

const GrocerySchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  inventory: { type: Number, required: true }
});

export default mongoose.model<IGrocery>('grocery', GrocerySchema);
