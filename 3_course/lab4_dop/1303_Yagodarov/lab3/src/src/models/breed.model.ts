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
  Unique, ForeignKey, BelongsTo, HasMany,
} from 'sequelize-typescript';
import {Show} from "./show.model";
import {Dog} from "./dog.model";

@Table({
  tableName: 'breeds',
})
export class Breed extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.BIGINT)
  declare id: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @HasMany(() => Show)
  shows: Show[];

  @HasMany(() => Dog)
  dogs: Dog[];
}