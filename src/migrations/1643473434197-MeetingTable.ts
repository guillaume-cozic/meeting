import {MigrationInterface, QueryRunner} from "typeorm";

export class MeetingTable1643473434197 implements MigrationInterface {
    name = 'MeetingTable1643473434197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`meeting\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(200) NOT NULL, \`uuid\` varchar(255) NOT NULL, \`date\` datetime NOT NULL, \`agenda\` json NULL, \`participants\` json NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`meeting\``);
    }

}
