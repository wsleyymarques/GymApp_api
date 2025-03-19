import { Request, Response } from "express";
import { WorkoutExerciseRepository } from "../repositories/workout_exercice.repository";

export class WorkoutExerciseController {
    private workoutExerciseRepo: WorkoutExerciseRepository;

    constructor() {
        this.workoutExerciseRepo = new WorkoutExerciseRepository();
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const { workoutId, exercises } = req.body;

            const workout = await this.workoutExerciseRepo.getWorkoutById(workoutId);
            if (!workout) {
                return res.status(404).json({ message: "Treino não encontrado" });
            }

            const formattedExercices = [];

            for (const exercise of exercises) {
                const { exerciceId, sets, reps } = exercise;

                const exercice = await this.workoutExerciseRepo.getExerciceById(exerciceId);
                if (!exercice) {
                    return res.status(404).json({ message: `Exercício com ID ${exerciceId} não encontrado` });
                }

                await this.workoutExerciseRepo.create({
                    workout: workout,
                    exercice: exercice,
                    sets,
                    reps
                });

                formattedExercices.push({
                    id: exercice.id,
                    name: exercice.name,
                    sets,
                    reps
                });
            }

            return res.status(201).json({
                workoutId: workout.id,
                exercices: formattedExercices
            });
        } catch (error) {
            return res.status(500).json({ message: "Erro ao criar associações de treino e exercício", error });
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
