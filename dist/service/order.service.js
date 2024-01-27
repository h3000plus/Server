import { getMenuItemsByRestaurant } from "./restaurant.service.js";
export const sendToSkeleton = async (orderData) => {
    const allMenuItemsWithAdditionalDetails = await getMenuItemsByRestaurant(orderData.cartItems[0].resId);
    const addAdditionalDetails = await addDetailsToRestaurants(orderData, allMenuItemsWithAdditionalDetails);
};
const addDetailsToRestaurants = async (orderData, allMenuItemsWithAdditionalDetails) => {
    console.log(orderData);
    // const itemsWithDetails =  orderData.map(()=>{
    // })
};
//# sourceMappingURL=order.service.js.map