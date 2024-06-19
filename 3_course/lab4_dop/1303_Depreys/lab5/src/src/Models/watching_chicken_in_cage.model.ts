import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Index,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Worker } from './worker.model.js';
import { Cell } from './cell.model.js';
import { Chicken } from './chicken.model.js';

export interface WatchingChickenInCageI {
  watching_chicken_in_cage_id?: number | null;
  worker_id: number;
  cell_id: number;
  chicken_id: number;
  worker: Worker;
  cell: Cell;
  chicken: Chicken;
}

@Table({
  tableName: 'watching_chicken_in_cage',
  timestamps: false,
})
export class WatchingChickenInCage
  extends Model
  implements WatchingChickenInCageI
{
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  watching_chicken_in_cage_id?: number;

  @Index
  @AllowNull(false)
  @ForeignKey(() => Worker)
  @Column({
    type: DataType.INTEGER,
    unique: 'WatchingChickenInCage',
  })
  worker_id: number;

  @Index
  @AllowNull(false)
  @ForeignKey(() => Cell)
  @Column({
    type: DataType.INTEGER,
    unique: 'WatchingChickenInCage',
  })
  cell_id: number;

  @Index
  @AllowNull(false)
  @ForeignKey(() => Chicken)
  @Column({
    type: DataType.INTEGER,
    unique: 'WatchingChickenInCage',
  })
  chicken_id: number;

  @BelongsTo(() => Worker)
  worker: ReturnType<() => Worker>;

  @BelongsTo(() => Cell)
  cell: ReturnType<() => Cell>;

  @BelongsTo(() => Chicken)
  chicken: ReturnType<() => Chicken>;
}
