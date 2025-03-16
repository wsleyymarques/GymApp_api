import { Router } from "express";
import {WorkoutController} from "../controllers/workouts.controller";

const workoutRoutes = Router();
const workoutController = new WorkoutController();

const asyncHandler = (fn: Function) => (req: any, res: any, next: any) =>
    Promise.resolve(fn(req, res, next)).catch(next);

workoutRoutes.post("/", asyncHandler(workoutController.create.bind(workoutController)));
workoutRoutes.get("/", asyncHandler(workoutController.getAll.bind(workoutController)));
workoutRoutes.get("/:id", asyncHandler(workoutController.getOne.bind(workoutController)));
workoutRoutes.put("/:id", asyncHandler(workoutController.update.bind(workoutController)));
workoutRoutes.delete("/:id", asyncHandler(workoutController.delete.bind(workoutController)));

export default workoutRoutes;
