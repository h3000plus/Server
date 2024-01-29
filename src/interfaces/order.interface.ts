import { ObjectId } from "mongoose";

export interface IOrder {
  _id?: string;
  userId?: string;
  deliveryFee?: number;
  deliveryTime?: number;
  cartItems: ICart[];
  subtotal: number;
  orderStatus?: string;
  ordertype: string;
  delivery: boolean;
  pickup: boolean;
  createdAt: Date
}

export interface ICart {
  _id: ObjectId;
  resId: string;
  cartId: string;
  name: string;
  image: string;
  description: string;
  quantity: number;
  price: number;
  addon?: IIngredient[];
  no?: IIngredient[];
}

export interface IIngredient {
  name: string;
  price: number;
  _id?: ObjectId;
}

export interface IScheduleOrder {
  userId?: string;
  deliveryFee?: number;
  deliveryTime?: number;
  cartItems: ICart[];
  subtotal: number;
  orderStatus?: string;
  ordertype: string;
  delivery: boolean;
  pickup: boolean;
  date: string;
  schedule: string;
}
