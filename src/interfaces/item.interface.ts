// // interface

import { ObjectId } from "mongoose";

export interface IItem {
  resId: ObjectId;
  name: string;
  image: string;
  description: string;
  like: string;
  price: number;
  category: string;
  addon?: [IIngredient];
  no?: [IIngredient];
}

export interface IIngredient {
  name: string;
  price?: number;
  id?: number;
}

// export interface PackagingInterface {
//     dimensionLength?: number,
//     dimensionWidth?: number,
//     dimensionHeight?: number,
// }
// export interface IngredientsInterface {
//     id: number,
//     restaurantId: number,
//     ingredientName: string,
//     unitOfStock: string,
//     quantity: number,
//     costPerUnit: number,
//     unitOfPrice: string;
//     caloriesPerUnit: number
// }
// export interface AddOptionInterface {
//     ingredientName: string,
//     quantity?: number,
//     ingredients: IngredientsInterface[]
// }
// export interface NoOptionInterface {
//     ingredientName: string,
//     quantity?: number,
//     ingredients: IngredientsInterface[]
// }
// export interface ItemDietaryRestrictionsInterface{
//     allergens?: string
// }
// export interface ItemInterface {
//     itemId: number,
//     itemName: string,
//     itemImage: string,
//     itemDescription?: string,
//     itemPrice: number,
//     itemCalories: number,
//     timeOfDay: [string, string, string],
//     itemPortionsize: number,
//     itemPreparationtime: number,
//     itemLastingTime: number,
//     itemPackingType: number,
//     servingTemperature: number,
//     itemDietaryRestrictions: ItemDietaryRestrictionsInterface[],
//     itemPackingDimention: PackagingInterface[],
//     ingredients: IngredientsInterface[],
//     options: { add : AddOptionInterface[] , no: NoOptionInterface[]}
// }
