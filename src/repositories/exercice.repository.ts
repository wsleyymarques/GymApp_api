import { Repository } from "typeorm";
import { Exercice } from "../entities/Exercice";
import { AppDataSource } from "../data-source";

export class ExerciceRepository {
    private repo: Repository<Exercice>;

    constructor() {
        this.repo = AppDataSource.getRepository(Exercice);
    }

    async create(data: Partial<Exercice>) {
        const exercice = this.repo.create(data);
        return await this.repo.save(exercice);
    }

    async getAll() {
        return await this.repo.find();
    }

    async getOne(id: number) {
        return await this.repo.findOne({ where: { id } });
    }

    async update(id: number, data: Partial<Exercice>) {
        await this.repo.update(id, data);
        return await this.repo.findOne({ where: { id } });
    }

    async delete(id: number) {
        return await this.repo.delete(id);
    }
}
