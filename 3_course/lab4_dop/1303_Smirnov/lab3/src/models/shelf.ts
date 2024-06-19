import {AllowNull, AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table} from "sequelize-typescript";
import {Rack} from "./rack";


@Table({
    tableName: 'shelf'
})
export class Shelf extends Model {
    @HasMany(() => Rack)
    declare racks: Rack[];

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    declare shelf_id: number

    @AllowNull(false)
    @Column(
        {
            type: DataType.INTEGER,
            unique: true
        }
    )
    declare shelf_unique_number: number
}