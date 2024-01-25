import mongoose, { Schema } from 'mongoose';
const counterConsumerSchema = new Schema({
    _id: { type: String, required: true },
    sequence_value: { type: Number, default: 1 },
});
const CounterConsumerModel = mongoose.model('CounterConsumer', counterConsumerSchema);
export default CounterConsumerModel;
//# sourceMappingURL=counterConsumerModel.js.map