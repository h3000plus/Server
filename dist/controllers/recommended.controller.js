import { getUserDetails } from '../models/user/query.js';
import { recommendedEngine, restaurantsMatching } from '../service/restaurant.service.js';
export const getRecommendedRestaurantsController = async (req, res) => {
    try {
        const id = req.body.user.id;
        const user = await getUserDetails(id);
        const recommended = await recommendedEngine(user);
        const prepareForFronted = await restaurantsMatching(recommended);
        res.send(prepareForFronted);
    }
    catch (error) {
        console.error("Controller Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
//# sourceMappingURL=recommended.controller.js.map