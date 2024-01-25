// import CounterItemModel from './counterItemModel.js';
// import ItemModel from './model.js';

// export const createItemQuery = async (itemData: any) => {
//   try {
//     return await ItemModel.create(itemData);
//   } catch (error) {
//     throw new Error('Error creating item');
//   }
// };

// export const getNextSequenceValue = async function (sequenceName: any) {
//   const sequenceDoc = await CounterItemModel.findOneAndUpdate(
//     { _id: sequenceName },
//     { $inc: { sequence_value: 1 } },
//     { new: true, upsert: true }
//   );
//   return sequenceDoc.sequence_value;
// };






// import ItemModel from './model.js';

// export const createItemQuery = async (itemData: any) => {
//   try {
//     return await ItemModel.create(itemData);
//   } catch (error) {
//     console.error(error); // Log the error for debugging
//     throw new Error('Error creating item');
//   }
// };

import { IItem } from "../../interfaces/item.interface.js";
import { itemModel } from "./model.js";
// import { AddOptionInterface,NoOptionInterface,IngredientsInterface,PackagingInterface,ItemDietaryRestrictionsInterface,IItem } from "../../interfaces/item.interface.js";
const createMenuItem = async(menuItemObject: IItem)=>{
    const newMealItem = await itemModel.create({...menuItemObject});
    return newMealItem;
}

const getMenuItemById = async (id: string)=>{
    const singleItem =  await itemModel.findOne({_id : id})
    return singleItem;
}

const getMenuItemByResId = async (id: string)=>{
    const resItems =  await itemModel.find({resId : id})
    return resItems;
}

const searchRestaurantItems = async (restaurantId: string, searchTerm: string): Promise<IItem[]> => {
    try {
        const query = {
            resId: restaurantId,
            name: { $regex: new RegExp(searchTerm, 'i') }
        };
        return await itemModel.find(query);
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};


export{
    createMenuItem,
    getMenuItemById,
    getMenuItemByResId,
    searchRestaurantItems
}