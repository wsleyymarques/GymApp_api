import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { WorkoutExercise } from "./WorkoutExercise"

@Entity('exercices')
export class Exercice {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    duration: number

    @Column()
    muscular: string

    @Column({ type: 'text' })
    gif_animation: string

    @OneToMany(() => WorkoutExercise, (workoutExercise) => workoutExercise.exercice)
    workoutExercises: WorkoutExercise[]
}
