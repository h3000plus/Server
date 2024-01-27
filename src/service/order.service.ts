import { IOrder } from "../interfaces/order.interface.js"
import { getMenuItemsByRestaurant } from "./restaurant.service.js"
export const sendToSkeleton = async (orderData : IOrder) => {
 const allMenuItemsWithAdditionalDetails = await getMenuItemsByRestaurant(orderData.cartItems[0].resId);
    const addAdditionalDetails = await addDetailsToRestaurants(orderData,allMenuItemsWithAdditionalDetails);

}

const addDetailsToRestaurants = async (orderData : IOrder,allMenuItemsWithAdditionalDetails : any) => {

    console.log(orderData);
    // const itemsWithDetails =  orderData.map(()=>{

    // })


} 