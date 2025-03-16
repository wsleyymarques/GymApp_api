import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm"
import { Workout } from "./Workout"
import { Exercice } from "./Exercice"

@Entity('workout_exercises')
export class WorkoutExercise {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Workout, (workout) => workout.exercises, { onDelete: "CASCADE" })
    workout: Workout

    @ManyToOne(() => Exercice, (exercice) => exercice.workoutExercises, { onDelete: "CASCADE" })
    exercice: Exercice;

    @Column()
    sets: number

    @Column()
    reps: number
}
