import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column,
    DataType,
    ForeignKey, HasMany, HasOne,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import {Document} from "./document";
import {Issues} from "./issues";
import {IssuesArchive} from "./issues_archive";


@Table({
    tableName: 'instance'
})
export class Instance extends Model {
    @BelongsTo(() => Document, {onDelete: "CASCADE"})
    declare document: Document
    @HasOne(() => Issues)
    declare issue: Issues

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    declare instance_id: number

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
        unique: true
    })
    declare inventory_number: string

    @AllowNull(false)
    @Column({
        type: DataType.ENUM,
        values: ['есть', 'утерян'],
        defaultValue: 'есть'
    })
    declare status: string

    @AllowNull(false)
    @Column(DataType.STRING)
    declare title: string

    @ForeignKey(() => Document)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare document_id: number
}