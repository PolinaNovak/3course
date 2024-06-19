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
import {Document} from "./document";
import {Abonent} from "./abonent";


@Table({
    tableName: 'issues_archive',
    paranoid: true
})
export class IssuesArchive extends Model{

    @BelongsTo(() => Document, {onDelete: "CASCADE"})
    declare document: Document

    @BelongsTo(()=> Abonent, {onDelete: "CASCADE"})
    declare abonent: Abonent

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    declare issues_archive_id

    @AllowNull(false)
    @ForeignKey(() => Document)
    @Column(DataType.INTEGER)
    declare document_id: number

    @AllowNull(false)
    @Column(DataType.DATEONLY)
    declare date_of_issue: Date

    @AllowNull(false)
    @ForeignKey(() => Abonent)
    @Column(DataType.INTEGER)
    declare abonent_id: number
}