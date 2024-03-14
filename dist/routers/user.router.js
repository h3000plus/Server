import express from "express";
import { checkEmailController, getUserDetailsByIdController, loginController, postManyCustomers, signupController, } from "../controllers/user.controller.js";
const router = express.Router();
router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/check-email", checkEmailController);
router.get("/user-details/:id", getUserDetailsByIdController);
router.post("/users", postManyCustomers);
export default router;
//# sourceMappingURL=user.router.js.map