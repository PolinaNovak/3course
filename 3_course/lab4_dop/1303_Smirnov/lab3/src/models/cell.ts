import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    HasOne,
    Table
} from "sequelize-typescript";
import {Rack} from "./rack";
import {Document} from './document';

@Table({
    tableName: 'cell'
})
export class Cell extends Model {
    @BelongsTo(() => Rack, {onDelete: 'CASCADE'})
    declare rack: Rack;

    @HasOne(()=> Document)
    declare document: Document;

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    declare cell_id: number

    @AllowNull(false)
    @Column(
        {
            type: DataType.INTEGER,
            unique: true
        }
    )
    declare cell_unique_number: number

    @ForeignKey(() => Rack)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare rack_id: number
}