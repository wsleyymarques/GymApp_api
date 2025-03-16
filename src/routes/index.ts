import { Router } from "express"
import exerciceRoutes from "./routes.exercices"
import workoutRoutes from "./routes.workouts"
import workoutExerciseRoutes from "./routes.workout_exercice"

const routes = Router()

routes.use("/exercices", exerciceRoutes)
routes.use("/workouts", workoutRoutes)
routes.use("/workouts_exercice", workoutExerciseRoutes)

export default routes
