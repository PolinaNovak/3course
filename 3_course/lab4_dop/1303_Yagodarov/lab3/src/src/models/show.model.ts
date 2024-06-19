import {
  Table,
  BelongsTo,
  Column,
  Model,
  PrimaryKey,
  AllowNull,
  CreatedAt,
  UpdatedAt,
  AutoIncrement,
  DataType,
  Default, ForeignKey,
} from 'sequelize-typescript';
import {Breed} from "./breed.model";
import {Ring} from "./ring.model";

@Table({
  tableName: 'shows',
})
export class Show extends Model {
  @PrimaryKey
  @AllowNull(false)
  @ForeignKey(() => Breed)
  @Column(DataType.BIGINT)
  breed_id: number;

  @BelongsTo(() => Breed, {
    onDelete: 'CASCADE',
  })
  breed: ReturnType<() => Breed>;

  @PrimaryKey
  @ForeignKey(() => Ring)
  @Column(DataType.BIGINT)
  ring_id: number;

  @BelongsTo(() => Ring, {
    onDelete: 'SET NULL'
  })
  ring: ReturnType<() => Ring>;

  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.DATE)
  date: Date;
}