export interface IPositionForInventory {
    id: number;
    position: string;
    employeeId: number;
    restaurantId: number;
    services: string[];
    createdAt: Date;
    updatedAt: Date;
}


export interface IEmployeeInfoForInventory {
    id: number;
    restaurantId: number;
    name: string;
    email: string;
    experience: string[];
    phoneNumber: number | string;
    address: string;
    skillTags: string[];
    hourlyRate: number;
    efficiency: string;
    createdAt: Date;
    updatedAt: Date;
    applicantId: number | null;
    position: IPositionForInventory
}

export interface IUser {
    positionId: number;
    employeeInformation: IEmployeeInfoForInventory;
}

export interface IOptionForInventory {
    id: number;
    ingredientName: string;
    unitOfStock: string;
    quantity: number;
    costPerUnit: number;
    caloriesPerUnit: number;
    price: string;
    _id: string;
}


export interface IIngredientForInventory {
    id: number;
    restaurantId?: number;
    ingredientName: string;
    unitOfStock: string;
    quantity: number;
    costPerUnit: number;
    caloriesPerUnit: number;
    _id: string;
}


export interface IPackingForInventory {
    id: number;
    boxName: string;
    currentStockQuantity: number;
    unitOfPrice: string;
    costPerUnit: number;
    reorderPoint: number;
    unitOfDimentions: string;
    dimensions: string;
    weightLimit: number;
    temperatureLimit: number;
    waterproof: string;
    expectedStockForToday: number;
    expectedStockForTomorrow: number;
    restaurantId: number;
    createdAt: Date;
    updatedAt: Date;
    quantity?: number;
}

export interface IItemForInventory {
    _id: string;
    restaurantId: number;
    categoryId: string;
    mealTimeId: number;
    item: {
        _id: string; //
        itemId: number; //
        itemName: string; //
        itemImage: string; //
        itemDescription: string; //
        itemQuantity: number; //
        itemPreparationTime: number; //
        itemPackingType: IPackingForInventory[]; //
        itemLastingTime?: number; //needed for marketplace
        itemPortionSize: string;
        ingredients: { rawIngredients: IIngredientForInventory[]; recipes: IRecipeForInventory[] }; //IRecipe[]
        options: { add: IOptionForInventory[]; no: IOptionForInventory[] };
        chosenOptions?: { add: IOptionForInventory[]; no: IOptionForInventory[] };
        optionalNotes?: string;
        discount?: number;
        isDisabled?: boolean;
        itemPrice: number;
        itemCalories: number;
        timeOfDay: string[];
        itemProfileTastyTags: string[];
        typeOfFoods: string[];
        servingTemperature: number;
        itemDietaryRestrictions: string[];
    };
}

export interface IRecipeForInventory {

    restaurantId: number,
    recipeId: number,
    recipeName: string,
    recipeItemPortionSize: number,
    recipeItemPreparationTime: number,
    recipeItemCost: number,
    recipeItemCalories: number,
    ingredients: IIngredientForInventory[],
    _id: string

}

export interface IOrderForInventory {
    _id: string;
    restaurantId: number;
    type: string;
    customerId?: number;
    waiterId?: number;
    bill: number;
    unit: string;
    status: string;
    vipCustomer: boolean;

    items: IItemForInventory[];

    updatedAt?: Date;
    createdAt?: Date;
    orderPosted?: Date;
    orderUpdatedAt?: Date;
    preparingTimestamp?: Date;
    readyTimestamp?: Date;
    servedTimestamp?: Date;
    chef?: IUser;
    deliveryTimestamp?: Date;
    cancelTimestamp?: Date;
}

