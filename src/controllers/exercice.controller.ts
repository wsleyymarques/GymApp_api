import { Request, Response } from "express"
import {ExerciceRepository} from "../repositories/exercice.repository"

export class ExerciceController {
    private exerciceRepo = new ExerciceRepository()

    async create(req: Request, res: Response) {
        try {
            const exercice = await this.exerciceRepo.create(req.body)
            return res.status(201).json(exercice)
        } catch (error) {
            return res.status(500).json({ message: "Erro ao criar exercício", error })
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const exercices = await this.exerciceRepo.getAll()
            return res.json(exercices)
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar exercícios", error })
        }
    }

    async getOne(req: Request, res: Response) {
        try {
            const exercice = await this.exerciceRepo.getOne(Number(req.params.id))
            if (!exercice) return res.status(404).json({ message: "Exercício não encontrado" })
            return res.json(exercice)
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar exercício", error })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const exercice = await this.exerciceRepo.update(Number(req.params.id), req.body)
            if (!exercice) return res.status(404).json({ message: "Exercício não encontrado" })
            return res.json(exercice);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao atualizar exercício", error })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await this.exerciceRepo.delete(Number(req.params.id))
            return res.json({ message: "Exercício removido com sucesso" })
        } catch (error) {
            return res.status(500).json({ message: "Erro ao remover exercício", error })
        }
    }
}
