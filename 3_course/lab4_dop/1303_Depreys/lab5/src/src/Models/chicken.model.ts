import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Index,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Breed } from './breed.model.js';
import { WatchingChickenInCage } from './watching_chicken_in_cage.model.js';

export interface ChickenI {
  chicken_id?: number | null;
  weight: number;
  age: number;
  eggs_per_month: number;
  breed: Breed;
  breed_name: string;
}

@Table({
  tableName: 'chicken',
  timestamps: false,
})
export class Chicken extends Model implements ChickenI {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  chicken_id?: number;

  @AllowNull(false)
  @Column({
    type: DataType.REAL,
  })
  weight: number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  age: number;

  @Index
  @AllowNull(false)
  @Column(DataType.INTEGER)
  eggs_per_month: number;

  @Index
  @AllowNull(false)
  @ForeignKey(() => Breed)
  @Column
  breed_name: string;

  @BelongsTo(() => Breed)
  breed: ReturnType<() => Breed>;

  @HasOne(() => WatchingChickenInCage)
  watching_chicken_in_cages: WatchingChickenInCage[];
}
