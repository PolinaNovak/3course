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
import {Club} from "./club.model";
import {Dog} from "./dog.model";

@Table({
  tableName: 'owners'
})
export class Owner extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.BIGINT)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  age: number;

  @AllowNull(false)
  @ForeignKey(() => Club)
  @Column(DataType.BIGINT)
  club_id: number;

  @BelongsTo(() => Club, {
    onDelete: 'CASCADE',
  })
  club: ReturnType<() => Club>;

  @HasMany(() => Dog)
  dogs: Dog[];
}