import axios from "axios";
export async function getFilteredRestaurants(mode, searchTerm, cuisine) {
    try {
        let apiUrl = `${process.env.RESTAURANTS_URL}?mode=${mode}`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': process.env.SKELETON_TOKEN,
        };
        if (searchTerm) {
            apiUrl += `&searchTerm=${searchTerm}`;
        }
        if (cuisine) {
            apiUrl += `&cuisine=${cuisine}`;
        }
        // const apiUrl = `${process.env.RESTAURANTS_URL}?mode=${mode}&searchTerm=${searchTerm}&cuisine=${cuisine}`;
        console.log(apiUrl);
        const response = await axios.get(apiUrl, { headers });
        const data = response.data;
        const restaurants = data.map((res) => {
            return { resId: res.restaurantId, resName: res.restaurantName, resImage: res.restaurantLogo };
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
            'Content-Type': 'application/json',
            'Authorization': process.env.SKELETON_TOKEN,
        };
        let apiUrl = process.env.CUISINES_URL;
        console.log(apiUrl);
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
        'Content-Type': 'application/json',
        'Authorization': process.env.SKELETON_TOKEN,
    };
    // console.log(`${process.env.MENU_ITEMS}/menu/one-restaurant-menu/${id}`)
    const response = await axios.get(`${process.env.MENU_ITEMS}menu/one-restaurant-menu/${id}`, { headers });
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
        items['all'].push({
            _id: item._id,
            name: item.item.itemName,
            price: item.item.itemPrice,
            description: item.item.itemDescription.slice(0, 9),
            categoryName: item.categoryName,
            image: item.item.itemImage
        });
        items[catg].push({
            _id: item._id,
            name: item.item.itemName,
            price: item.item.itemPrice,
            description: item.item.itemDescription.slice(0, 9),
            categoryName: item.categoryName,
            image: item.item.itemImage
        });
    }
    console.log(items);
    // return data.map((foodItem : any)=>{
    //     return {
    //         _id : foodItem._id,
    //         name : foodItem.item.itemName,
    //         price : foodItem.item.itemPrice,
    //         description : foodItem.item.itemDescription.slice(0,9),
    //         image : foodItem.item.itemImage
    //     }
    // })
    // return await fetch();
    return items;
}
export async function getRestaurantDetails(id) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': process.env.SKELETON_TOKEN,
    };
    const response = await axios.get(`${process.env.RESTAURANT_DETAILS}20`, { headers });
    // console.log(response)
    const data = response.data;
    return {
        name: data.restaurantName,
    };
}
export async function getItemDetails(id) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': process.env.SKELETON_TOKEN,
    };
    console.log(id);
    const response = await axios.get(`${process.env.MENU_ITEMS}/menu/menu-item-details/${id}`, { headers });
    // console.log(response)
    const data = response.data;
    console.log(data);
    return data;
}
//# sourceMappingURL=restaurant.service.js.map