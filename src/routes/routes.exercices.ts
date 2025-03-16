import { Router } from "express";
import { ExerciceController } from "../controllers/exercice.controller";

const exerciceRoutes = Router();
const exerciceController = new ExerciceController();

const asyncHandler = (fn: Function) => (req: any, res: any, next: any) =>
    Promise.resolve(fn(req, res, next)).catch(next);

exerciceRoutes.post("/", asyncHandler(exerciceController.create.bind(exerciceController)));
exerciceRoutes.get("/", asyncHandler(exerciceController.getAll.bind(exerciceController)));
exerciceRoutes.get("/:id", asyncHandler(exerciceController.getOne.bind(exerciceController)));
exerciceRoutes.put("/:id", asyncHandler(exerciceController.update.bind(exerciceController)));
exerciceRoutes.delete("/:id", asyncHandler(exerciceController.delete.bind(exerciceController)));

export default exerciceRoutes;
