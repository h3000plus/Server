import { Schema, model } from "mongoose";
// import { AddOptionInterface,NoOptionInterface,IngredientsInterface,PackagingInterface,ItemDietaryRestrictionsInterface,ItemInterface } from "../../interfaces/item.interface.js";
// import { getNextSequenceValue } from "../../utilities/nextSequence.js";
// const ItemDietaryRestrictions= new Schema<ItemDietaryRestrictionsInterface>({
//     allergens: String
// })
// const packaging = new Schema<PackagingInterface>({
//     dimensionLength: Number,
//     dimensionWidth: Number,
//     dimensionHeight: Number,
// })
// const ingredients = new Schema<IngredientsInterface>({
//         id: Number,
//         restaurantId: Number,
//         ingredientName: String,
//         unitOfStock: String,
//         quantity: Number,
//         costPerUnit: Number,
//         caloriesPerUnit: Number
// })
// const addOption = new Schema<AddOptionInterface>({
//     ingredientName: String,
//     quantity: Number,
//     ingredients: [ingredients]
// })
// const noOption = new Schema<NoOptionInterface>({
//     ingredientName: String,
//     quantity: Number,
//     ingredients: [ingredients]
// })
// const itemSchema = new Schema<ItemInterface>({
//     itemId: Number,
//     itemName: String,
//     itemImage: String,
//     itemDescription: String,
//     itemPrice: Number,
//     itemCalories: Number,
//     timeOfDay: [String, String, String],
//     itemPortionsize: Number,
//     itemPreparationtime: Number,
//     itemLastingTime: Number,
//     itemPackingType: String,
//     servingTemperature: Number,
//     itemDietaryRestrictions: [ItemDietaryRestrictions],
//     itemPackingDimention: packaging,
//     ingredients: [ingredients],
//     options: { add : [addOption] , no: [noOption]}
// })
// const menuItemSchema = new Schema({
//     restaurantId : Number,
//     categoryId: Number,
//     item: [itemSchema],
// })
// Middleware to auto-increment
// itemSchema.pre('save', async function (next) {
//   const doc = this;
//   if (!doc.itemId) {
//       doc.itemId = await getNextSequenceValue('itemIdCounter');
//   }
//   next();
// });
const IngredientSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true }
});
const itemSchema = new Schema({
    resId: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    like: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    addon: [{ type: IngredientSchema }],
    no: [{ type: IngredientSchema }]
});
export const itemModel = model('items', itemSchema);
//# sourceMappingURL=model.js.map