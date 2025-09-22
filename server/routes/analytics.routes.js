import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { mostBorrowed ,activeUsers } from "../controllers/analytics.controller";

const analyticsRouter = Router()

analyticsRouter.get("/most-borrowed" , authMiddleware , mostBorrowed )

analyticsRouter.get("/active-users",authMiddleware, activeUsers)

export default analyticsRouter