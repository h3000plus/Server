import express from "express";
import { checkEmailController, getUserDetailsByIdController, loginController, postManyCustomers, signupController, } from "../controllers/user.controller.js";
const router = express.Router();
router.post("/signup", signupController);
router.post("/login", loginController);
// router.get("/individual/:id", getUserDetailsByIdController);
router.post("/check-email", checkEmailController);
router.get("/user-details/:id", getUserDetailsByIdController);
router.put("/user-update/:user-id");
router.post("/users", postManyCustomers);
export default router;
// router.get('/', getUserByTokenController);65d1b671c4cce0bc0d348f17
//# sourceMappingURL=user.router.js.map