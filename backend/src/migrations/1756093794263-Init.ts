import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1756093794263 implements MigrationInterface {
    name = 'Init1756093794263'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subject" ADD "isPassed" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subject" DROP COLUMN "isPassed"`);
    }

}
