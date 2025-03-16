import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { WorkoutExercise } from "./WorkoutExercise"

@Entity('workouts')
export class Workout {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    muscle_group: string

    @Column()
    duration: number

    @OneToMany(() => WorkoutExercise, (workoutExercise) => workoutExercise.workout)
    exercises: WorkoutExercise[]
}
