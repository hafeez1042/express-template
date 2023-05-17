import express from "express";
import { auth0jwtMiddleware } from "../../../middlewares/auth0jwt.middleware";
import { currentUserMiddleware } from "../../../middlewares/currentUser.middleware";
import crudRoutes from "../../../functions/crudRoutes";
import dayPlanController from "../../../controllers/api/v1/DayPlanController";
import userController from "../../../controllers/api/v1/UserController";
import organizationController from "../../../controllers/api/v1/OrganizationController";
import { handshake, logout } from "../../../controllers/api/v1/AuthController";

const router = express.Router()

// router.use(currentUserMiddleware);

router.post("/handshake", auth0jwtMiddleware, handshake)
router.post("/logout", logout)

router.use(currentUserMiddleware);

router.get("/day-plan/today", dayPlanController.getToday);
crudRoutes("/day-plan", router, dayPlanController);

crudRoutes("/user", router, userController);
crudRoutes("/organization", router, organizationController);

export default router;
