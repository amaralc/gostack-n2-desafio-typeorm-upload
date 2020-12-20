import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateTransactions1608454619951
  implements MigrationInterface {
  /**
   * Alterações que serão realizadas no banco de dados quando a migration for
   * executada.
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      /** Cria nova tabela */
      new Table({
        /** Nome da tabela */
        name: 'transactions',
        /** Colunas da tabela */
        columns: [
          /** Primeira coluna */
          {
            /** Nome de uma coluna */
            name: 'id',
            /** Tipo da coluna */
            type: 'uuid',
            /** Chave primaria: (true | false) */
            isPrimary: true,
            /** Define como uuid (mais recomendado, inclusive por segurança) */
            generationStrategy: 'uuid',
            /** Define geração automática de id */
            default: 'uuid_generate_v4()',
          },
          /** Outra coluna */
          {
            name: 'title',
            type: 'varchar',
            /** Pode ser nulo? (true | false) */
            isNullable: false,
          },
          /** Outra coluna */
          {
            name: 'value',
            /** Define value como float */
            type: 'float',
            isNullable: false,
          },
          /** Outra coluna */
          {
            name: 'type',
            /** Define type como varchar */
            type: 'varchar',
            isNullable: false,
          },
          /** Outra coluna */
          {
            name: 'category_id',
            /** Define como float */
            type: 'uuid',
          },
          /** Outra coluna */
          {
            name: 'created_at',
            type: 'timestamp',
            /** Valor default deve ser o timestamp de agora */
            default: 'now()',
          },
          /** Outra coluna */
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    /** Cria relacionamento */
    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        /** Nome do relacionamento */
        name: 'TransactionCategory',
        /** Coluna desta tabela que referencia tabela externa */
        columnNames: ['category_id'],
        /** Tabela referenciada pelo campo desta tabela */
        referencedTableName: 'categories',
        /** Nome da coluna referenciada, na tabela externa */
        referencedColumnNames: ['id'],
        /** Se instancia na tabela referenciada for deletada, seta nulo nesta tabela */
        onDelete: 'SET NULL',
        /** Se instancia na tabela referenciada for alterada, altera valor nesta tabela */
        onUpdate: 'CASCADE',
      }),
    );
  }

  /**
   * Reverte as alterações realizadas no método up, quando precisarmos voltar
   * nas migrations (ex.: migrate:undo)
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    /** Remove relacionamento */
    await queryRunner.dropForeignKey('transactions', 'TransactionCategory');

    /** Deleta tabela */
    await queryRunner.dropTable('transactions');
  }
}
