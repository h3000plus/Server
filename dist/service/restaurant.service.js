import axios from "axios";
export async function getFilteredRestaurants(mode, searchTerm, cuisine) {
    try {
        let apiUrl = `${process.env.RESTAURANTS_URL}?mode=${mode}`;
        const headers = {
            "Content-Type": "application/json",
            Authorization: process.env.SKELETON_TOKEN,
        };
        if (searchTerm) {
            apiUrl += `&searchTerm=${searchTerm}`;
        }
        if (cuisine) {
            apiUrl += `&cuisine=${cuisine}`;
        }
        // const apiUrl = `${process.env.RESTAURANTS_URL}?mode=${mode}&searchTerm=${searchTerm}&cuisine=${cuisine}`;
        const response = await axios.get(apiUrl, { headers });
        const data = response.data;
        const restaurants = data.map(async (res) => {
            return {
                resId: res.restaurantId,
                resName: res.restaurantName,
                resImage: res.restaurantCoverPhoto,
                resDiscount: res.marketplaceDiscountPercentage,
                resPriceRange: res.priceRange,
            };
        });
        console.log(restaurants);
        return restaurants;
    }
    catch (error) {
        console.log(error);
    }
}
export async function getCuisines() {
    try {
        const headers = {
            "Content-Type": "application/json",
            Authorization: process.env.SKELETON_TOKEN,
        };
        let apiUrl = process.env.CUISINES_URL;
        const response = await axios.get(apiUrl, { headers });
        const data = response.data;
        const cuisines = data.map((cuisine) => {
            return { name: cuisine.cuisineName, image: cuisine.cuisineImg };
        });
        return cuisines;
    }
    catch (error) {
        console.log(error);
    }
}
export async function getMenuItemsByRestaurant(id) {
    const headers = {
        "Content-Type": "application/json",
        Authorization: process.env.SKELETON_TOKEN,
    };
    // console.log(`${process.env.MENU_ITEMS}/menu/one-restaurant-menu/${id}`)
    const response = await axios.get(`${process.env.MENU_ITEMS}${id}`, {
        headers,
    });
    const discount = await axios.get(`${process.env.RES_DISCOUNT}${id}`, {
        headers,
    });
    const data = response.data;
    const discountPrice = discount.data.marketplaceDiscountPercentage;
    console.log(discountPrice);
    const categories = [];
    const items = { all: [] };
    for (const item of data) {
        const catg = item.categoryName;
        if (!categories.includes(catg)) {
            categories.push(catg);
            items[catg] = [];
        }
        const discoutPrc = item.item.itemPrice - (discountPrice / 100 * item.item.itemPrice) + "";
        // items['all'].push(item);
        items["all"].push({
            _id: item._id,
            name: item.item.itemName,
            price: discoutPrc,
            originalPrice: item.item.itemPrice + "",
            description: item.item.itemDescription?.slice(0, 9),
            categoryName: item.categoryName,
            image: item.item.itemImage,
        });
        items[catg].push({
            _id: item._id,
            name: item.item.itemName,
            price: discoutPrc,
            originalPrice: item.item.itemPrice + "",
            description: item.item.itemDescription?.slice(0, 9),
            categoryName: item.categoryName,
            image: item.item.itemImage,
        });
    }
    return items;
}
export async function getRestaurantDetails(id) {
    const headers = {
        "Content-Type": "application/json",
        Authorization: process.env.SKELETON_TOKEN,
    };
    const response = await axios.get(`${process.env.RESTAURANT_DETAILS}${id}`, {
        headers,
    });
    // console.log(response)
    const data = response.data;
    return {
        name: data.restaurantName,
    };
}
export async function getItemDetails(id) {
    const headers = {
        "Content-Type": "application/json",
        Authorization: process.env.SKELETON_TOKEN,
    };
    const response = await axios.get(`${process.env.SINGLE_MENU_ITEM}${id}`, {
        headers,
    });
    const data = response.data;
    const discount = await axios.get(`${process.env.RES_DISCOUNT}${data.restaurantId}`, {
        headers,
    });
    const discountPrice = discount.data.marketplaceDiscountPercentage;
    const discoutPrc = data.item.itemPrice - (discountPrice / 100 * data.item.itemPrice);
    // const details: any = data.map( (item: any) => {
    return {
        _id: data._id,
        resId: data.restaurantId,
        name: data.item.itemName,
        image: data.item.itemImage,
        description: data.item.itemDescription,
        price: discoutPrc,
        originalPrice: data.item.itemPrice,
        addon: data.item.options.add.map((ing) => {
            return {
                name: ing.ingredientName,
                price: ing.costPerUnit,
                id: ing.id,
                _id: ing._id,
            };
        }),
        no: data.item.options.no.map((ing) => {
            return {
                name: ing.ingredientName,
                price: ing.costPerUnit,
                id: ing.id,
                _id: ing._id,
            };
        }),
    };
    // })
    // console.log(data);
    // return data;
}
export async function recommendedEngine(user) {
    const data = user.customerPreference.tastyTags;
    const sortedArray = Object.entries(data);
    sortedArray.sort((a, b) => b[1] - a[1]);
    const sortedObject = Object.fromEntries(sortedArray);
    const keysArray = Object.keys(sortedObject).slice(0, 3);
    const userDetails = {
        _id: user.id,
        currentLatLong: {
            longitude: user.currentLatLong.longitude,
            latitude: user.currentLatLong.latitude,
        },
        customerPreference: {
            tastyTags: keysArray,
            category: user.customerPreference.category
        }
    };
    console.log(userDetails);
    const response = await axios.post("https://bento-recommender.onrender.com/get-all-restaurants", userDetails);
    // console.log('response is: ', response);
    return response.data;
}
export async function restaurantsMatching(restaurants) {
    try {
        const headers = {
            "Content-Type": "application/json",
            Authorization: process.env.SKELETON_TOKEN, // Assuming SKELETON_TOKEN is a string
        };
        const response = await axios.get("https://sak-skeleton-samiya-kazi.koyeb.app/marketplace/restaurants?limit=0", { headers });
        // console.log(restaurants)
        // console.log(response.data)
        const matchedRestaurants = findObjectsWithProperty(response.data, restaurants);
        // console.log(matchedRestaurants)
        return matchedRestaurants;
    }
    catch (error) {
        console.error("Error fetching or matching restaurants:", error);
        throw error; // Re-throwing error for handling in higher layers
    }
}
function findObjectsWithProperty(resArr1, resArr2) {
    const matchingIds = new Set(resArr2.map(restaurant => restaurant.restaurantId));
    const restaurants = resArr1.filter(restaurant => matchingIds.has(restaurant.restaurantId));
    console.log(matchingIds);
    return restaurants;
}
//# sourceMappingURL=restaurant.service.js.map