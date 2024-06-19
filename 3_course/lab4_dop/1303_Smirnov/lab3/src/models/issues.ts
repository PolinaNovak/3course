import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import {Instance} from "./instance";
import {Abonent} from "./abonent";


@Table({
    tableName: 'issues'
})
export class Issues extends Model{
    @BelongsTo(() => Instance, {onDelete: "CASCADE"})
    declare instance: Instance

    @BelongsTo(() => Abonent, {onDelete: "CASCADE"})
    declare abonent: Abonent

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    declare issue_id: number

    @AllowNull(false)
    @Column(DataType.DATEONLY)
    declare date_of_issue: Date

    @AllowNull(false)
    @ForeignKey(() => Instance)
    @Column({
        type: DataType.INTEGER,
        unique: true
    })
    declare instance_id: number

    @AllowNull(false)
    @ForeignKey(()=> Abonent)
    @Column(DataType.INTEGER)
    declare abonent_id: number
}