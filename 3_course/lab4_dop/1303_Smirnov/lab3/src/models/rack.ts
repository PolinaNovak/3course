import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column,
    DataType,
    ForeignKey, HasMany,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import {Shelf} from "./shelf";
import {Cell} from "./cell";


@Table({
    tableName: 'rack'
})
export class Rack extends Model {
    @BelongsTo(()=> Shelf, {onDelete: 'CASCADE'})
    declare shelf: Shelf;
    @HasMany(()=> Cell)
    declare cells: Cell[];

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    declare rack_id: number;

    @AllowNull(false)
    @Column(
        {
            type: DataType.INTEGER,
            unique: true
        }
    )
    declare rack_unique_number: number;

    @ForeignKey(() => Shelf)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare shelf_id: number;
}