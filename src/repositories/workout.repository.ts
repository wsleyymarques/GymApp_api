import { Repository } from "typeorm";
import { Workout } from "../entities/Workout";
import { AppDataSource } from "../data-source";

export class WorkoutRepository {
    private repo: Repository<Workout>;

    constructor() {
        this.repo = AppDataSource.getRepository(Workout);
    }

    async create(data: Partial<Workout>) {
        const workout = this.repo.create(data);
        return await this.repo.save(workout);
    }

    async getAll() {
        return await this.repo.find({ relations: ["exercises"] });
    }

    async getOne(id: number) {
        return await this.repo.findOne({ where: { id }, relations: ["exercises"] });
    }

    async update(id: number, data: Partial<Workout>) {
        await this.repo.update(id, data);
        return await this.repo.findOne({ where: { id } });
    }

    async delete(id: number) {
        return await this.repo.delete(id);
    }
}
