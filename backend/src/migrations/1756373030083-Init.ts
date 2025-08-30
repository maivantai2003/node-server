import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1756373030083 implements MigrationInterface {
    name = 'Init1756373030083'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_session" ALTER COLUMN "refreshToken" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_session" ALTER COLUMN "refreshToken" SET NOT NULL`);
    }

}
