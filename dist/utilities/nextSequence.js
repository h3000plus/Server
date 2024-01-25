import CounterModel from "./counter.model.js";
export const getNextSequenceValue = async function (sequenceName) {
    const sequenceDoc = await CounterModel.findOneAndUpdate({ _id: sequenceName }, { $inc: { sequence_value: 1 } }, { new: true, upsert: true });
    return sequenceDoc.sequence_value;
};
//# sourceMappingURL=nextSequence.js.map