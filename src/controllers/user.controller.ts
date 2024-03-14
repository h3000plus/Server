import { Request, Response } from "express";
import {
  createUser,
  findUserByEmail,
  getUserDetails,
  insertManyCustomers,
  isEmailExists,
} from "../models/user/query.js";
import {
  comparePassword,
  generateToken,
} from "../utilities/auth.js";

// signup
const signupController = async (req: Request, res: Response) => {
  try {
    console.log('incoming data from fe', req.body);
    const user = await createUser(req.body);
    res.status(201).json({
      message: "added",
      data: user
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//login
const loginController = async (req: Request, res: Response) => {
  try {
    const user = await findUserByEmail(req.body.email);
    // console.log('user', user);
    if (user) {
      const isMatch = await comparePassword(req.body.password, user.password);
      console.log('is match', isMatch);
      if (isMatch) {
        // generate token
        const payload = {
          id: user._id,
          name: user.name,
          email: user.email,
        };
        const token = generateToken(payload);
        res.status(200).json({
          access_token: token,
          message: "Login Successful",
        });
      } else {
        res.status(401).json({
          error: "Authentication failed",
        });
      }
    } else {
      res.status(401).json({
        error: "Authentication failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// check email
const checkEmailController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const emailExists = await isEmailExists(email.email);

    res.status(200).json({
      exists: emailExists,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const postManyCustomers = async (req: Request, res: Response) => {
  try {
    const customers = req.body;
    const insertedCustomers = await insertManyCustomers(customers);
    res.status(200).json({
      insertedCustomers,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};


const getUserDetailsByIdController = async (req: Request, res: Response) => {
  try {
    console.log('from inside controller', req.params.id);
    const id = req.params.id; 
    const userDetails = await getUserDetails(id);
    res.status(200).json(userDetails);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export {
  signupController,
  loginController,
  checkEmailController,
  postManyCustomers,
  getUserDetailsByIdController
};
