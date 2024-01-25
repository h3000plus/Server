import { createConsumerQuery } from '../models/consumer/query.js';
export const createCustomer = async (req, res) => {
    try {
        const consumer = await createConsumerQuery(req.body);
        res.status(201).json(consumer);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
//# sourceMappingURL=consumer.controller.js.map