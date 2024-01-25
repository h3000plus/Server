import axios, { AxiosResponse } from "axios";


export async function getFilteredRestaurants(mode: string , searchTerm: string, cuisine: string): Promise<void> {
    try {
        let apiUrl = `${process.env.RESTAURANTS_URL}?mode=${mode}`
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': process.env.SKELETON_TOKEN,
        };

        if(searchTerm){
            apiUrl += `&searchTerm=${searchTerm}`

        }
        if(cuisine){
            apiUrl += `&cuisine=${cuisine}`
        }
        // const apiUrl = `${process.env.RESTAURANTS_URL}?mode=${mode}&searchTerm=${searchTerm}&cuisine=${cuisine}`;
        console.log(apiUrl)
        const response: AxiosResponse = await axios.get(apiUrl, {headers});
        const data = response.data;

        const restaurants = data.map((res: any)=>{
            return {resId: res.restaurantId, resName: res.restaurantName, resImage: res.restaurantLogo}
        })

        return restaurants;
    } catch (error) {
        console.log(error);
    }
}


export async function getCuisines() {
    try {

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': process.env.SKELETON_TOKEN,
        };

        let apiUrl = process.env.CUISINES_URL as string;

        console.log(apiUrl)
        const response: AxiosResponse = await axios.get(apiUrl,  {headers});
        const data = response.data;

        const cuisines = data.map((cuisine: any)=>{
            return {name: cuisine.cuisineName, image: cuisine.cuisineImg}
        })

        return cuisines;
    } catch (error) {
        console.log(error);
    }
}






