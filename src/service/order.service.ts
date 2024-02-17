import axios from "axios";
import { IOrder } from "../interfaces/order.interface.js";
import { IOrderToSend } from "../interfaces/orderToSend.interface.js";

export const prepareForSkeleton = async (orderData: IOrder) => {
  //   const allMenuItemsWithAdditionalDetails = await getMenuItemsByRestaurant(
  //     orderData.cartItems[0].resId
  //   );
  const headers = {
    "Content-Type": "application/json",
    Authorization: process.env.SKELETON_TOKEN,
  };
  const response = await axios.get(
    `${process.env.MENU_ITEMS}${orderData.cartItems[0].resId}`,
    { headers }
  );

  const allMenuItemsWithAdditionalDetails = response.data;
  // console.log(allMenuItemsWithAdditionalDetails);
  const addAdditionalDetails = await addDetailsToRestaurants(
    orderData,
    allMenuItemsWithAdditionalDetails
  );

  return {
    _id: orderData._id,
    restaurantId: parseInt(orderData.cartItems[0].resId),
    ...addAdditionalDetails,
  };
};

const addDetailsToRestaurants = async (orderData: IOrder, allMenuItemsWithAdditionalDetails: any) => {
  const itemsWithDetails = orderData.cartItems.map((cartItem) => {

    // Searching out the ordered items from MENU
    const menuItem = allMenuItemsWithAdditionalDetails.filter((item: any) => {
      return item._id === cartItem._id;
    })[0];

    const addons = cartItem.addon?.map((item) => {
      const addon = menuItem.item.options.add.filter((ing: any) => {
        return item._id == ing._id;
      })[0];
      return addon;
    });

    const no = cartItem.no?.map((item) => {
      const no = menuItem.item.options.no.filter((ing: any) => {
        return item._id == ing._id;
      })[0];
      return no;
    });

    return {
      _id: cartItem._id,
      restaurantId: parseInt(cartItem.resId),
      categoryId: menuItem.categoryId,
      categoryName: menuItem.categoryName,
      mealTimeId: menuItem.mealTimeId,
      item: {
        _id: menuItem.item._id,
        itemId: 72,
        itemName: menuItem.item.itemName,
        itemImage: menuItem.item.itemImage,
        itemDescription: menuItem.item.itemDescription,
        itemQuantity: cartItem.quantity,
        itemPreparationTime: menuItem.item.itemPreparationTime,
        itemPackingType: menuItem.item.itemPackingType,
        itemLastingTime: menuItem.item.itemLastingTime,
        itemPortionSize: menuItem.item.itemPortionSize,
        ingredients: { ...menuItem.item.ingredients },
        options: menuItem.item.options,
        chosenOptions: {
          add: addons,
          no: no,
          _id: "65b5044ebb8664a60a98dce2",
        },
        optionalNotes: "No salt please",
        itemPrice: menuItem.item.itemPrice,
        itemCalories: menuItem.item.itemCalories,
        timeOfDay: menuItem.item.timeOfDay,
        itemProfileTastyTags: menuItem.item.itemProfileTastyTags,
        typeOfFoods: menuItem.item.typeOfFoods,
        servingTemperature: menuItem.item.servingTemperature,
        itemDietaryRestrictions: menuItem.item.itemDietaryRestrictions,
        itemPackingDimension: menuItem.item.itemPackingDimension,
      },
    };
  });

  return {
    type: orderData.delivery ? "delivery" : "pickup",
    bill: orderData.subtotal,
    unit: "USD",
    status: "pending",
    vipCustomer: false,
    items: itemsWithDetails,
    createdAt: "",
  };
};

export const sendToSkeleton = async (preparedOrder: any): Promise<any> => {
  const res = await axios.post<any>(
    process.env.CREATE_ORDER as string,
    { order: preparedOrder },
    { headers: { Authorization: process.env.SKELETON_TOKEN } }
  );

  return res.data;
};
