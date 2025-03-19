import { Repository } from "typeorm";
import { WorkoutExercise } from "../entities/WorkoutExercise";
import { AppDataSource } from "../data-source";
import {Workout} from "../entities/Workout";
import {Exercice} from "../entities/Exercice";

export class WorkoutExerciseRepository {
    private repo: Repository<WorkoutExercise>;

    constructor() {
        this.repo = AppDataSource.getRepository(WorkoutExercise);
    }

    async create(data: Partial<WorkoutExercise>) {
        const workoutExercise = this.repo.create(data);
        return await this.repo.save(workoutExercise);
    }


    async getWorkoutById(workoutId: number) {
        return await AppDataSource.getRepository(Workout).findOne({ where: { id: workoutId } });
    }

    async getExerciceById(exerciceId: number) {
        return await AppDataSource.getRepository(Exercice).findOne({ where: { id: exerciceId } });
    }

    async getAll() {
        return await this.repo.find({ relations: ["workout", "exercice"] });
    }

    async getOne(id: number) {
        return await this.repo.findOne({ where: { id }, relations: ["workout", "exercice"] });
    }

    async update(id: number, data: Partial<WorkoutExercise>) {
        await this.repo.update(id, data);
        return await this.repo.findOne({ where: { id }, relations: ["workout", "exercice"] });
    }

    async delete(id: number) {
        return await this.repo.delete(id);
    }
}
