import ConsumerModel from './model.js';
export const createConsumerQuery = async (consumerData) => {
    try {
        return await ConsumerModel.create(consumerData);
    }
    catch (error) {
        throw new Error('Error creating customer');
    }
};
//# sourceMappingURL=query.js.map