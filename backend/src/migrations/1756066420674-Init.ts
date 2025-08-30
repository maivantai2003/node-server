import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1756066420674 implements MigrationInterface {
    name = 'Init1756066420674'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "detail_subject" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "numericIndex" integer NOT NULL, "cofficient" integer NOT NULL, "midterm" integer NOT NULL, "final" integer NOT NULL, "total" integer NOT NULL, "subjectId" uuid, CONSTRAINT "PK_65038ea19693a65cc820ba76f81" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subject" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subjectName" character varying NOT NULL, "progress" integer NOT NULL, "numericIndex" integer NOT NULL, "isCompleted" boolean NOT NULL, "userId" uuid, CONSTRAINT "PK_12eee115462e38d62e5455fc054" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "age" integer NOT NULL DEFAULT '18', "password" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8" UNIQUE ("name"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "detail_subject" ADD CONSTRAINT "FK_61da8bf2a186ad8fb08db725f70" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subject" ADD CONSTRAINT "FK_f3d464e642ccfc389de4463d6c9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subject" DROP CONSTRAINT "FK_f3d464e642ccfc389de4463d6c9"`);
        await queryRunner.query(`ALTER TABLE "detail_subject" DROP CONSTRAINT "FK_61da8bf2a186ad8fb08db725f70"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "subject"`);
        await queryRunner.query(`DROP TABLE "detail_subject"`);
    }

}
