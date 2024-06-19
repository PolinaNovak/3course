import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column,
    DataType, DeletedAt,
    ForeignKey, HasMany,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import {Cell} from "./cell";
import {Instance} from "./instance";
import {IssuesArchive} from "./issues_archive";


@Table({
    tableName: 'document',
    paranoid: true
})
export class Document extends Model{
    @BelongsTo(() => Cell, {onDelete: "RESTRICT"})
    declare cell: Cell

    @HasMany(() => Instance)
    declare instances: Instance[]

    @HasMany(() => IssuesArchive)
    declare previous_issues: IssuesArchive[]

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    declare document_id: number

    @AllowNull(false)
    @Column(DataType.STRING)
    declare theme_name: string

    @AllowNull(false)
    @Column(DataType.STRING)
    declare document_title: string

    @AllowNull(false)
    @Column({
            type: DataType.STRING,
            unique: true
        })
    declare inventory_number: string

    @ForeignKey(() => Cell)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare cell_id: number
}