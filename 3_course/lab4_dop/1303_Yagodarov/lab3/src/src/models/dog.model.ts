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
import {Owner} from "./owner.model";
import {Breed} from "./breed.model";
import {Medal} from "./medal.model";

@Table({
  tableName: 'dogs'
})
export class Dog extends Model {
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
  @ForeignKey(() => Breed)
  @Column(DataType.BIGINT)
  breed_id: number;

  @BelongsTo(() => Breed, {
    onDelete: 'CASCADE',
  })
  breed: ReturnType<() => Breed>;

  @AllowNull(false)
  @ForeignKey(() => Owner)
  @Column(DataType.BIGINT)
  owner_id: number;

  @BelongsTo(() => Owner, {
    onDelete: 'SET NULL',
  })
  owner: ReturnType<() => Owner>;

  @HasMany(() => Medal)
  medals: Medal[];
}