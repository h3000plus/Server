import express from "express";
import {
  checkEmailController,
  loginController,
  postManyCustomers,
  signupController,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/check-email", checkEmailController);
router.get("/user-details/:user-id");
router.put("/user-update/:user-id");
router.post("/users", postManyCustomers);

export default router;

// router.get('/', getUserByTokenController);
