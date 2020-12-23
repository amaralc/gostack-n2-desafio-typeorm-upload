/** Importa entidade (algo a ser salvo no banco de dados) */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import Transaction from './Transaction';

/**
 * Utiliza experimental decorators (@) para definir que o model
 * Appointment deve ser salvo dentro da tabela 'appointments'.
 *
 * Os decorators, indicam que a informação da linha imediatamente abaixo do
 * decorator deve ser passada como parâmetro para a entidade indicada pelo
 * sinal @.
 */
@Entity('categories')
class Category {
  /** Define id como primary generated column of type uuid */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Define provider como coluna (nao gerada) do tipo string (padrão) */
  @Column()
  title: string;

  @OneToMany(() => Transaction, transaction => transaction.category)
  transaction: Transaction;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Category;
