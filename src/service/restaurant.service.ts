import axios, { AxiosResponse } from "axios";

export async function getFilteredRestaurants(
  mode: string,
  searchTerm: string,
  cuisine: string
): Promise<void> {
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

    const response: AxiosResponse = await axios.get(apiUrl, { headers });
    const data = response.data;

    const restaurants = data.map((res: any) => {
      return {
        resId: res.restaurantId,
        resName: res.restaurantName,
        resImage: res.restaurantCoverPhoto,
      };
    });

    return restaurants;
  } catch (error) {
    console.log(error);
  }
}

export async function getCuisines() {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: process.env.SKELETON_TOKEN,
    };

    let apiUrl = process.env.CUISINES_URL as string;

    const response: AxiosResponse = await axios.get(apiUrl, { headers });
    const data = response.data;

    const cuisines = data.map((cuisine: any) => {
      return { name: cuisine.cuisineName, image: cuisine.cuisineImg };
    });

    return cuisines;
  } catch (error) {
    console.log(error);
  }
}

export async function getMenuItemsByRestaurant(id: string) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: process.env.SKELETON_TOKEN,
  };

  // console.log(`${process.env.MENU_ITEMS}/menu/one-restaurant-menu/${id}`)
  const response = await axios.get(`${process.env.MENU_ITEMS}${id}`, {
    headers,
  });
  const data = response.data;

  interface Item {
    _id: string;
    name: string;
    price: string;
    description: string;
    categoryName: string;
    image: string;
    // other properties of an item
  }

  interface ItemsByCategory {
    [key: string]: Item[];
  }

  const categories: string[] = [];
  const items: ItemsByCategory = { all: [] };

  for (const item of data) {
    const catg = item.categoryName;
    if (!categories.includes(catg)) {
      categories.push(catg);

      items[catg] = [];
    }

    // items['all'].push(item);
    items["all"].push({
      _id: item._id as string,
      name: item.item.itemName as string,
      price: item.item.itemPrice as string,
      description: item.item.itemDescription?.slice(0, 9) as string,
      categoryName: item.categoryName,
      image: item.item.itemImage as string,
    });

    items[catg].push({
      _id: item._id as string,
      name: item.item.itemName as string,
      price: item.item.itemPrice as string,
      description: item.item.itemDescription?.slice(0, 9) as string,
      categoryName: item.categoryName,
      image: item.item.itemImage as string,
    });
  }

  return items;
}

export async function getRestaurantDetails(id: string) {
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

export async function getItemDetails(id: string) {
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
    addon: data.item.options.add.map((ing: any) => {
      return {
        name: ing.ingredientName,
        price: ing.costPerUnit,
        id: ing.id,
        _id: ing._id,
      };
    }),
    no: data.item.options.no.map((ing: any) => {
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



export async function recommendedEngine(user: any) {
  
    interface TastyTags {
      [key: string]: number;
    }
    
    interface CurrentLatLong {
      longitude: number;
      latitude: number;
    }
    
    interface CustomerPreference {
      tastyTags: string[];
      category: string; // Assuming category is a string
    }
    
    interface UserDetails {
      _id: string;
      currentLatLong: CurrentLatLong;
      customerPreference: CustomerPreference;
    }
    
    const data: TastyTags = user.customerPreference.tastyTags;
    const sortedArray = Object.entries(data);
    sortedArray.sort((a, b) => b[1] - a[1]);
    const sortedObject = Object.fromEntries(sortedArray);
    const keysArray = Object.keys(sortedObject).slice(0, 3);

    const userDetails: UserDetails = {
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
    console.log(userDetails)
    const response = await axios.post<any>(
     "https://bento-recommender.onrender.com/get-all-restaurants",
      userDetails,
    );

    console.log('response is: ', response);

    return response.data;
}