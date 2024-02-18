import axios from "axios";
export const prepareForSkeleton = async (orderData) => {
    //   const allMenuItemsWithAdditionalDetails = await getMenuItemsByRestaurant(
    //     orderData.cartItems[0].resId
    //   );
    const headers = {
        "Content-Type": "application/json",
        Authorization: process.env.SKELETON_TOKEN,
    };
    const response = await axios.get(`${process.env.MENU_ITEMS}${orderData.cartItems[0].resId}`, { headers });
    const allMenuItemsWithAdditionalDetails = response.data;
    // console.log(allMenuItemsWithAdditionalDetails);
    const addAdditionalDetails = await addDetailsToRestaurants(orderData, allMenuItemsWithAdditionalDetails);
    return {
        _id: orderData._id,
        restaurantId: parseInt(orderData.cartItems[0].resId),
        ...addAdditionalDetails,
    };
};
export const prepareForRider = async (orderData, userId) => {
    return {
        _id: orderData._id,
        riderId: null,
        userId: userId,
        restaurantId: orderData.restaurantId,
        items: orderData.items,
        orderTemperatureType: 'HOT',
        deliveryPoint: {
            longitude: 53.515333,
            latitude: -6.190796
        },
        orderDeliveryTime: {
            minTime: calculateDeliveryTime(orderData)[0],
            maxTime: calculateDeliveryTime(orderData)[1]
        }
    };
};
function calculateDeliveryTime(order) {
    let maxPreparationTime = 0;
    let minLastingTime = 0;
    if (order.items[0].item.itemLastingTime) {
        minLastingTime = order.items[0].item.itemLastingTime;
    }
    for (let i = 0; i < order.items.length; i++) {
        if (order.items[i].item.itemPreparationTime > maxPreparationTime) {
            maxPreparationTime = order.items[i].item.itemPreparationTime;
        }
        if (order.items[i].item.itemLastingTime < minLastingTime) {
            minLastingTime = order.items[i].item.itemLastingTime;
        }
    }
    let totalMinutesForMin = maxPreparationTime + minLastingTime - 20;
    let totalMinutesForMax = maxPreparationTime + minLastingTime - 10;
    const minTime = new Date(Date.now());
    minTime.setMinutes(minTime.getMinutes() + totalMinutesForMin);
    const maxTime = new Date(Date.now());
    maxTime.setMinutes(maxTime.getMinutes() + totalMinutesForMax);
    return [minTime, maxTime];
}
const addDetailsToRestaurants = async (orderData, allMenuItemsWithAdditionalDetails) => {
    const itemsWithDetails = orderData.cartItems.map((cartItem) => {
        const menuItem = allMenuItemsWithAdditionalDetails.filter((item) => {
            return item._id === cartItem._id;
        })[0];
        const addons = cartItem.addon?.map((item) => {
            const addon = menuItem.item.options.add.filter((ing) => {
                return item._id == ing._id;
            })[0];
            return addon;
        });
        const no = cartItem.no?.map((item) => {
            const no = menuItem.item.options.no.filter((ing) => {
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
export const sendToSkeleton = async (preparedOrder) => {
    const res = await axios.post(process.env.CREATE_ORDER, { order: preparedOrder }, { headers: { Authorization: process.env.SKELETON_TOKEN } });
    return res.data;
};
//# sourceMappingURL=order.service.js.map