import mongoose, { Schema } from 'mongoose';
import { getNextSequenceValue } from '../../utilities/nextSequence.js';
const consumerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    consumerId: {
        type: Number
    },
});
// Middleware to auto-increment
consumerSchema.pre('save', async function (next) {
    const doc = this;
    if (!doc.consumerId) {
        doc.consumerId = await getNextSequenceValue('consumerIdCounter');
    }
    next();
});
const ConsumerSchema = mongoose.model('Consumer', consumerSchema);
export default ConsumerSchema;
//# sourceMappingURL=model.js.map