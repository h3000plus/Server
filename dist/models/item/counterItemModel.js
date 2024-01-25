import mongoose, { Schema } from 'mongoose';
const counterItemSchema = new Schema({
    _id: { type: String, required: true },
    sequence_value: { type: Number, default: 1 },
});
const CounterItemModel = mongoose.model('CounterItem', counterItemSchema);
export default CounterItemModel;
//# sourceMappingURL=counterItemModel.js.map