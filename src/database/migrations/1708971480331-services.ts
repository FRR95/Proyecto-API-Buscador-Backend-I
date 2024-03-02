import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Services1708971480331 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "services",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "services_name",
                        type: "varchar",
                        length: "50",
                        isNullable: false,
                        isUnique: true,

                    },
                    {
                        name: "description",
                        type: "varchar",
                        length: "300",
                        isNullable: false
                    },
          
                ],
            }),
            true
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("services");
    }

}
