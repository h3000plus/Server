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
//# sourceMappingURL=restaurant.service.js.map