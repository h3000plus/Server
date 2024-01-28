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
        const restaurants = data.map((res) => {
            return {
                resId: res.restaurantId,
                resName: res.restaurantName,
                resImage: res.restaurantLogo,
            };
        });
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
    const data = response.data;
    const categories = [];
    const items = { all: [] };
    for (const item of data) {
        const catg = item.categoryName;
        if (!categories.includes(catg)) {
            categories.push(catg);
            items[catg] = [];
        }
        // items['all'].push(item);
        items["all"].push({
            _id: item._id,
            name: item.item.itemName,
            price: item.item.itemPrice,
            description: item.item.itemDescription.slice(0, 9),
            categoryName: item.categoryName,
            image: item.item.itemImage,
        });
        items[catg].push({
            _id: item._id,
            name: item.item.itemName,
            price: item.item.itemPrice,
            description: item.item.itemDescription.slice(0, 9),
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
    // const details: any = data.map( (item: any) => {
    return {
        _id: data._id,
        resId: data.restaurantId,
        name: data.item.itemName,
        image: data.item.itemImage,
        description: data.item.itemDescription,
        price: data.item.itemPrice,
        addon: data.item.options.add.map((ing) => {
            return {
                name: ing.ingredientName,
                price: ing.costPerUnit,
                _id: ing._id,
            };
        }),
        no: data.item.options.no.map((ing) => {
            return {
                name: ing.ingredientName,
                price: ing.costPerUnit,
                _id: ing._id,
            };
        }),
    };
    // })
    // console.log(data);
    // return data;
}
//# sourceMappingURL=restaurant.service.js.map