import { Request, Response } from "express";
import { WorkoutExerciseRepository } from "../repositories/workout_exercice.repository";

export class WorkoutExerciseController {
    private workoutExerciseRepo: WorkoutExerciseRepository;

    constructor() {
        this.workoutExerciseRepo = new WorkoutExerciseRepository();
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const { workoutId, exerciceId, sets, reps } = req.body;

            const workout = await this.workoutExerciseRepo.getWorkoutById(workoutId);
            const exercice = await this.workoutExerciseRepo.getExerciceById(exerciceId);

            if (!workout || !exercice) {
                return res.status(404).json({ message: "Treino ou exercício não encontrado" });
            }

            const workoutExercise = await this.workoutExerciseRepo.create({
                workout: workout,
                exercice: exercice,
                sets,
                reps
            });

            return res.status(201).json(workoutExercise);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao criar associação de treino e exercício", error });
        }
    }

    async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const workoutExercises = await this.workoutExerciseRepo.getAll();
            return res.json(workoutExercises);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar WorkoutExercises", error });
        }
    }

    async getOne(req: Request, res: Response): Promise<Response> {
        try {
            const workoutExercise = await this.workoutExerciseRepo.getOne(Number(req.params.id));
            if (!workoutExercise) {
                return res.status(404).json({ message: "WorkoutExercise não encontrado" });
            }
            return res.json(workoutExercise);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar WorkoutExercise", error });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const workoutExercise = await this.workoutExerciseRepo.update(Number(req.params.id), req.body);
            if (!workoutExercise) {
                return res.status(404).json({ message: "WorkoutExercise não encontrado" });
            }
            return res.json(workoutExercise);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao atualizar WorkoutExercise", error });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const result = await this.workoutExerciseRepo.delete(Number(req.params.id));
            if (result.affected === 0) {
                return res.status(404).json({ message: "WorkoutExercise não encontrado" });
            }
            return res.json({ message: "WorkoutExercise removido com sucesso" });
        } catch (error) {
            return res.status(500).json({ message: "Erro ao remover WorkoutExercise", error });
        }
    }
}
