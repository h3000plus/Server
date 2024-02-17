import Customer from "./model.js";
import { ICustomer } from "../../interfaces/user.interface.js";
// import UserLogin from "../userLogin/model.js";

const findUserByEmail = async (email: string) => {
  try {
    const user = await Customer.findOne({ email: email });

    return user;
  } catch (error) {
    console.error("Error in findUserByEmail:", error);
    throw error;
  }
};

const findUserById = async (id: string) => {
  try {
    const user = await Customer.findById(id);

    return user;
  } catch (error) {
    console.error("Error in findUserByEmail:", error);
    throw error;
  }
};

const createUser = async (userObject: ICustomer) => {
  try {
    const { email, address, password, customerPreference, currentLatLong, dob } = userObject;
    const user = await Customer.create({ email, address, password, customerPreference, currentLatLong, dob });
    return user;
  } catch (error) {
    console.error("Error in createUser:", error);
    throw error;
  }
};

const isEmailExists = async (email: string) => {
  try {
    const existingUser = await Customer.findOne({ email });
    // console.log(existingUser);
    if (existingUser) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error in isEmailExists:", error);
    throw error;
  }
};

const insertManyCustomers = async (customers: [ICustomer]) => {
  try {
    const insertedCustomers = await Customer.insertMany(customers);
    return insertedCustomers;
  } catch (error) {
    console.log("error when inserting data into mongoDb", error);
    throw error;
  }
};

export {
  findUserByEmail,
  findUserById,
  createUser,
  isEmailExists,
  insertManyCustomers,
};
