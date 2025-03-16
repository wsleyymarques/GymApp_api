import { Request, Response } from "express";
import {WorkoutRepository} from "../repositories/workout.repository";

export class WorkoutController {
    private workoutRepo = new WorkoutRepository();

    async create(req: Request, res: Response) {
        try {
            const workout = await this.workoutRepo.create(req.body);
            return res.status(201).json(workout);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao criar treino", error });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const workouts = await this.workoutRepo.getAll();
            return res.json(workouts);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar treinos", error });
        }
    }

    async getOne(req: Request, res: Response) {
        try {
            const workout = await this.workoutRepo.getOne(Number(req.params.id));
            if (!workout) return res.status(404).json({ message: "Treino não encontrado" });
            return res.json(workout);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar treino", error });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const workout = await this.workoutRepo.update(Number(req.params.id), req.body);
            if (!workout) return res.status(404).json({ message: "Treino não encontrado" });
            return res.json(workout);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao atualizar treino", error });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await this.workoutRepo.delete(Number(req.params.id));
            return res.json({ message: "Treino removido com sucesso" });
        } catch (error) {
            return res.status(500).json({ message: "Erro ao remover treino", error });
        }
    }
}
