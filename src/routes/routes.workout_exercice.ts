import { Router } from "express";
import {WorkoutExerciseController} from "../controllers/workouts_exercice.controller";

const workoutExerciseRoutes = Router();
const workoutExerciseController = new WorkoutExerciseController();

const asyncHandler = (fn: Function) => (req: any, res: any, next: any) =>
    Promise.resolve(fn(req, res, next)).catch(next);

workoutExerciseRoutes.post("/", asyncHandler(workoutExerciseController.create.bind(workoutExerciseController)));

workoutExerciseRoutes.get("/", asyncHandler(workoutExerciseController.getAll.bind(workoutExerciseController)));

workoutExerciseRoutes.get("/:id", asyncHandler(workoutExerciseController.getOne.bind(workoutExerciseController)));

workoutExerciseRoutes.put("/:id", asyncHandler(workoutExerciseController.update.bind(workoutExerciseController)));

workoutExerciseRoutes.delete("/:id", asyncHandler(workoutExerciseController.delete.bind(workoutExerciseController)));

export default workoutExerciseRoutes;
