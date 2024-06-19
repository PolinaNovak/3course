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
  Unique,
} from 'sequelize-typescript';

@Table({
  tableName: 'clubs',
})
export class Club extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.BIGINT)
  declare id: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;
}