/** Importa entidade (algo a ser salvo no banco de dados) */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import Category from './Category';

@Entity('transactions')
class Transaction {
  /** Define id como primary generated column of type uuid */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Define title como coluna (nao gerada) do tipo string (padrão) */
  @Column()
  title: string;

  /** Define title como coluna (nao gerada) do tipo string com duas opcoes validas */
  @Column()
  type: 'income' | 'outcome';

  @Column()
  value: number;

  @Column()
  @Exclude()
  category_id: string;

  /** Relacionamento tipo 'muitos' deste model para 'um' do model referenciado */
  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Transaction;
