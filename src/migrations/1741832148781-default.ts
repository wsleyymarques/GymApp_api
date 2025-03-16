import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1741832148781 implements MigrationInterface {
    name = 'Default1741832148781'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "workouts" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "muscle_group" character varying NOT NULL, "duration" integer NOT NULL, CONSTRAINT "PK_5b2319bf64a674d40237dbb1697" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exercices" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "duration" integer NOT NULL, "muscular" character varying NOT NULL, "gif_animation" text NOT NULL, CONSTRAINT "PK_eff59bcb35c452829a0836c1a9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workout_exercises" ("id" SERIAL NOT NULL, "sets" integer NOT NULL, "reps" integer NOT NULL, "workoutId" integer, "exerciceId" integer, CONSTRAINT "PK_377f9ead6fd69b29f0d0feb1028" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "workout_exercises" ADD CONSTRAINT "FK_d616bcfffe0b6bb322281ae3754" FOREIGN KEY ("workoutId") REFERENCES "workouts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workout_exercises" ADD CONSTRAINT "FK_c5f1ff25aecefd4dae6d15d986d" FOREIGN KEY ("exerciceId") REFERENCES "exercices"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workout_exercises" DROP CONSTRAINT "FK_c5f1ff25aecefd4dae6d15d986d"`);
        await queryRunner.query(`ALTER TABLE "workout_exercises" DROP CONSTRAINT "FK_d616bcfffe0b6bb322281ae3754"`);
        await queryRunner.query(`DROP TABLE "workout_exercises"`);
        await queryRunner.query(`DROP TABLE "exercices"`);
        await queryRunner.query(`DROP TABLE "workouts"`);
    }

}
