import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AllowNull,
  CreatedAt,
  UpdatedAt,
  AutoIncrement,
  DataType,
  Default,
  Unique, HasMany,
} from 'sequelize-typescript';
import {Show} from "./show.model";

@Table({
  tableName: 'rings',
})
export class Ring extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.BIGINT)
  declare id: number;

  @HasMany(() => Show)
  shows: Show[];
}