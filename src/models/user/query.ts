import { ObjectId } from 'mongoose';
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



// extract tasty tags from orders and update tasty tag scores in db
async function updateTastyTagsScoreInDB(itemsArray: any[], userId: string) {
  try {
    let tastyTagsArray: string[] = []

    // extracting the tasty tags
    itemsArray.forEach((singleFullItem) => {
      tastyTagsArray = tastyTagsArray.concat(singleFullItem.item.itemProfileTastyTags)
    });

    // creating an array with duplicate free extracted tasty tags
    const duplicateFreeTatyTags = tastyTagsArray.filter((tag, index) => {
      return tastyTagsArray.indexOf(tag) === index
    })

    // Finding the customer
    const userDocument = await Customer.findById(userId) as ICustomer

    interface TastyTags {
      [key: string]: number;
    }
    const existingTastyTags = userDocument.customerPreference.tastyTags as TastyTags

    // updating the tasty tags
    duplicateFreeTatyTags.forEach((tag) => {
      if (existingTastyTags[tag]) {
        existingTastyTags[tag] = existingTastyTags[tag] + 1
      } else {
        existingTastyTags[tag] = 1
      }
    })

    // updating the customer document in db
    const updatedDocumentInDB = await Customer.findByIdAndUpdate(userId,
      { $set: { 'customerPreference.tastyTags': existingTastyTags } },
      { new: true }
    );
    return updatedDocumentInDB

  } catch (error) {
    console.log(error);
    throw new Error((error as Error).message)
  }
}

const getUserDetails = async (id: string) => {
  try {
      const userDetails = await Customer.findById(id); // Assuming User model has a method to find user by ID
      if (!userDetails) {
          throw new Error('User not found');
      }
      return userDetails;
  } catch (error) {
      throw error;
  }
};

export {
  findUserByEmail,
  findUserById,
  createUser,
  isEmailExists,
  getUserDetails,
  insertManyCustomers, updateTastyTagsScoreInDB
};
