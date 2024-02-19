import axios from "axios";
import { IOrder } from "../interfaces/order.interface.js";
import { IOrderToSend } from "../interfaces/orderToSend.interface.js";
import { IIngredientForInventory, IOrderForInventory, IPackingForInventory, IRecipeForInventory } from "../interfaces/inventory.interface.js";



export const prepareForKDS = async (orderData: IOrder) => {
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


export const prepareForRider = async (fOrder: any, sOrder: any) => {

  return {
    _id: fOrder._id,
    riderId: null,
    userId: sOrder.userId,
    restaurantId: fOrder.restaurantId,
    items: fOrder.items,
    orderTemperatureType: 'Hot',
    deliveryPoint: {
      longitude: 53.515333,
      latitude: -6.190796
    },
    orderDeliveryTime: {
      minTime: calculateDeliveryTime(fOrder)[0],
      maxTime: calculateDeliveryTime(fOrder)[1]
    },
    deliveryFee: 5,
    subtotal: sOrder.subtotal,
    createdAt: sOrder.createdAt
  }
}

function calculateDeliveryTime(order: any) {
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

const addDetailsToRestaurants = async (
  orderData: IOrder,
  allMenuItemsWithAdditionalDetails: any
) => {
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


// -------------------------------------------------------------------------------------------

// Prepare data for Inventory
export function prepareDataForInventory(fullOrder: IOrderForInventory | any) {

  const itemsArray = fullOrder.items;

  const allItemIngredStorage: IIngredientForInventory[] = [];

  const allItemPackagingStorage: IPackingForInventory[] = []

  itemsArray?.forEach((orderItem: any) => {

    allItemPackagingStorage.push(orderItem.item.itemPackingType[0])

    const ingredsInThisItem: IIngredientForInventory[] = [...orderItem.item.ingredients.rawIngredients];

    // Deleting the No Ingreds
    if (orderItem.item.chosenOptions && orderItem.item.chosenOptions.no.length > 0) {
      const noIngreds = orderItem.item.chosenOptions?.no;
      noIngreds.forEach(((singleNoIngred: any) => {
        const foundIndex = ingredsInThisItem.findIndex((i) => i.id === singleNoIngred.id)
        if (foundIndex != -1) {
          ingredsInThisItem.splice(foundIndex, 1)
        }
      }))
    }

    // Adding the recipe Ingreds
    if (orderItem.item.ingredients.recipes) {
      const ingredsFromReceipes: IIngredientForInventory[] = extractIngredsFromRecipeArr(orderItem.item.ingredients.recipes)
      ingredsFromReceipes.forEach((ingred) => ingredsInThisItem.push(ingred))
    }

    // Adding the add option Ingreds
    if (orderItem.item.chosenOptions?.add && orderItem.item.chosenOptions.add.length > 0) {
      const addArr = orderItem.item.chosenOptions.add
      addArr.forEach((ingred: any) => ingredsInThisItem.push(ingred))
    }

    // Removing Duplicate ingreds and adjusting the quantity of ingreds based on how many time one ingredient is present
    const duplicateFreeIngreds = removeDuplicateIngredsAndAddQuantity(ingredsInThisItem);

    // Adding duplicatefree, quantity adjusted ingreds of each item to the allItemIngredStorage
    duplicateFreeIngreds.forEach(ingred => allItemIngredStorage.push(ingred))

  })


  const duplicateFreeAllOrderItemIngreds = removeDuplicateIngredsAndAddQuantity(allItemIngredStorage);

  const duplicatefreePackagingStorage = removeDuplicatePackaging(allItemPackagingStorage)

  const ingredsPropertyNamesFixedArray = duplicateFreeAllOrderItemIngreds.map((ingred) => {
    return {
      id: ingred.id,
      ingredientName: ingred.ingredientName,
      unit: ingred.unitOfStock,
      quantity: ingred.quantity,
      costPerUnit: ingred.costPerUnit,
      caloriePerUnit: ingred.caloriesPerUnit
    }
  })

  const packagingPropertyNamesFixedArray = duplicatefreePackagingStorage.map((packaging) => {
    return {
      id: packaging.id,
      boxName: packaging.boxName,
      quantity: packaging.quantity,
      costPerUnit: packaging.costPerUnit

    }
  })

  // Data I will be sending to Inventory
  const dataForInventory = {
    restaurantId: fullOrder.restaurantId,
    orderId: fullOrder._id,
    orderType: fullOrder.type,
    ingredientsToReduce: ingredsPropertyNamesFixedArray,
    deliveryBoxesToReduce: packagingPropertyNamesFixedArray
  }

  return dataForInventory
}


// Extracts Ingredients from an array of Recipes and returns an array of Ingredients
export function extractIngredsFromRecipeArr(recipeArr: IRecipeForInventory[]): IIngredientForInventory[] {
  let ingredsArr: IIngredientForInventory[] = []
  recipeArr.forEach((singleRecipe) => {
    const ingreds = singleRecipe.ingredients
    ingreds.forEach((i) => ingredsArr.push(i))
  });
  return ingredsArr;
}

// Remove duplicate ingredients from an array of ingredients. And increases quantity of ingredient if found duplicate
export function removeDuplicateIngredsAndAddQuantity(ingredsArray: IIngredientForInventory[]): IIngredientForInventory[] {
  const resultIngredArray: IIngredientForInventory[] = [];
  ingredsArray.forEach(ingred => {
    const foundIndex = resultIngredArray.findIndex((el) => el.id === ingred.id)
    if (foundIndex === -1) {
      resultIngredArray.push(ingred)
    }
    else if (foundIndex > -1) {
      resultIngredArray[foundIndex].quantity = resultIngredArray[foundIndex].quantity + ingred.quantity
    }
  });

  return resultIngredArray
}


// Remove duplicate packaging
export function removeDuplicatePackaging(packagingArray: IPackingForInventory[]) {
  const resultingArray: IPackingForInventory[] = []

  packagingArray.forEach((singlePackaging) => {
    const foundIndex = resultingArray.findIndex((el) => el.id === singlePackaging.id)
    if (foundIndex === -1) {
      resultingArray.push({ ...singlePackaging, quantity: 1 })
    }
    else {
      const item = resultingArray[foundIndex];
      if (foundIndex != -1 && item && item.quantity) {
        item.quantity++;
      }
    }
  });

  return resultingArray;
}