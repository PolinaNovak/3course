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
import {Club} from "./club.model";
import {Ring} from "./ring.model";


@Table({
  tableName: 'experts',
})
export class Expert extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.BIGINT)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @ForeignKey(() => Club)
  @Column(DataType.BIGINT)
  club_id: number;

  @BelongsTo(() => Club, {
    onDelete: 'CASCADE',
  })
  club: ReturnType<() => Club>;

  @AllowNull(false)
  @ForeignKey(() => Ring)
  @Column(DataType.BIGINT)
  ring_id: number;

  @BelongsTo(() => Ring, {
    onDelete: 'SET NULL',
  })
  ring: ReturnType<() => Ring>;
}