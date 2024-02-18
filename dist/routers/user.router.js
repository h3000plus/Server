import express from "express";
import { checkEmailController, getUserDetailsByIdController, loginController, postManyCustomers, signupController, } from "../controllers/user.controller.js";
const router = express.Router();
router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/check-email", checkEmailController);
router.get("/user-details/:user-id", getUserDetailsByIdController);
router.put("/user-update/:user-id");
router.post("/users", postManyCustomers);
export default router;
// router.get('/', getUserByTokenController);
//# sourceMappingURL=user.router.js.map