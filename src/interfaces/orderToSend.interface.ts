export interface IPosition {
  id: number;
  position: string;
  employeeId: number;
  restaurantId: number;
  services: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IEmployeeInfo {
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
  position: IPosition;
}

export interface IUser {
  positionId: number;
  employeeInformation: IEmployeeInfo;
}

export interface OptionInterface {
  id: number;
  ingredientName: string;
  unitOfStock: string;
  quantity: number;
  costPerUnit: number;
  caloriesPerUnit: number;
  price: string;
  _id: string;
}

export interface RecipeInterface {
  restaurantId?: number;
  categoryId: number;
  recipeId: number;
  recipeName: string;
  recipeItemPortionSize: number;
  recipeItemPreparationTime: number;
  recipeItemCost: number;
  recipeItemCalories: number;
  recipeItemDescription: string;
  ingredients: IngredientInterface[];
}

export interface IngredientInterface {
  id: number;
  restaurantId?: number;
  ingredientName: string;
  unitOfStock: string;
  quantity: number;
  costPerUnit: number;
  caloriesPerUnit: number; //spelling change to calories
  _id: string;
}

export interface IPacking {
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
}

export interface ItemInterface {
  _id: string;
  restaurantId: number;
  categoryId: string;
  mealTimeId: number;
  item: {
    _id: string;
    itemId: number;
    itemName: string;
    itemImage: string; //
    itemDescription: string; //
    itemQuantity: number; //
    itemPreparationTime: number;
    itemPackingType: IPacking;
    itemLastingTime?: number; //needed for marketplace
    itemPortionSize: string;
    ingredients: {
      rawIngredients: IngredientInterface[];
      recipes: RecipeInterface[];
    };
    options: { add: OptionInterface[]; no: OptionInterface[] };
    chosenOptions?: { add: OptionInterface[]; no: OptionInterface[] };
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

export interface IOrderToSend {
  _id?: string;
  restaurantId: number;
  type: string;
  customerId?: number;
  waiterId?: number;
  bill: number;
  unit: string; //currency unit
  status: string;
  vipCustomer: boolean;
  items?: ItemInterface[];
  createdAt: Date;
  orderPosted?: Date;
  orderUpdatedAt?: Date;
  preparingTimestamp?: Date;
  readyTimestamp?: Date;
  servedTimestamp?: Date;
  chef?: IUser;
  deliveryTimestamp?: Date;
  cancelTimestamp?: Date;
}
