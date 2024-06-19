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
  Unique, ForeignKey, BelongsTo,
} from 'sequelize-typescript';
import {Breed} from "./breed.model";
import {Dog} from "./dog.model";

@Table({
  tableName: 'medals'
})
export class Medal extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.BIGINT)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  rank: number;

  @AllowNull(false)
  @ForeignKey(() => Breed)
  @Column(DataType.BIGINT)
  breed_id: number;

  @BelongsTo(() => Breed, {
    onDelete: 'SET NULL',
  })
  breed: ReturnType<() => Breed>;

  @AllowNull(false)
  @ForeignKey(() => Dog)
  @Column(DataType.BIGINT)
  dog_id: number;

  @BelongsTo(() => Dog, {
    onDelete: 'CASCADE',
  })
  dog: ReturnType<() => Dog>;
}