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
import {Dog} from "./dog.model";

@Table({
  tableName: 'pedigrees'
})
export class Pedigree extends Model {
  @PrimaryKey
  @AllowNull(false)
  @ForeignKey(() => Dog)
  @Column(DataType.BIGINT)
  father_id: number;

  @BelongsTo(() => Dog, {
    foreignKey: 'father_id',
    onDelete: 'SET NULL',
  })
  father: ReturnType<() => Dog>;

  @PrimaryKey
  @AllowNull(false)
  @ForeignKey(() => Dog)
  @Column(DataType.BIGINT)
  son_id: number;

  @BelongsTo(() => Dog, {
    foreignKey: 'son_id',
    onDelete: 'CASCADE',
  })
  son: ReturnType<() => Dog>;
}