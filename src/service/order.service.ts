import { IOrder } from "../interfaces/order.interface.js"
import { getMenuItemsByRestaurant } from "./restaurant.service.js"
export const sendToSkeleton = async (orderData : IOrder) => {
 const allMenuItemsWithAdditionalDetails = await getMenuItemsByRestaurant(orderData.cartItems[0].resId);
    const addAdditionalDetails = await addDetailsToRestaurants(orderData,allMenuItemsWithAdditionalDetails);

}

const addDetailsToRestaurants = (orderData : IOrder,allMenuItemsWithAdditionalDetails : any) => {

    const itemsWithDetails =  orderData.map(()=>{

    })


} 