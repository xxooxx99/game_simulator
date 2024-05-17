import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  item_code: { type: Number, required: true, unique: true },
  item_name: { type: String, required: true },
  item_stat: {
    health: { type: Number, default: 0 },
    power: { type: Number, default: 0 },
  },
});

const Item = mongoose.model('Item', ItemSchema);

export default Item;
