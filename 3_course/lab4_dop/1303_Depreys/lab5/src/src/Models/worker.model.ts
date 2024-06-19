import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { WatchingChickenInCage } from './watching_chicken_in_cage.model.js';

export interface WorkerI {
  worker_id?: number | null;
  passport_id: number;
  passport_series: number;
  salary: number;
  name: string;
  surname: string;
  patronymic: string;
}

@Table({
  tableName: 'worker',
  timestamps: false,
})
export class Worker extends Model implements WorkerI {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  worker_id?: number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    unique: 'passport',
  })
  passport_id: number;

  @AllowNull(false)
  @Column({
    type: DataType.SMALLINT,
    unique: 'passport',
  })
  passport_series: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  salary: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  name: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  surname: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  patronymic: string;

  @HasMany(() => WatchingChickenInCage)
  watching_chicken_in_cages: WatchingChickenInCage[];
}
