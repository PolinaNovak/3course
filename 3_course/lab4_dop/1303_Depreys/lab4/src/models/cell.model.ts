import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    HasMany,
    HasOne,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import {WatchingChickenInCage} from "./watching_chicken_in_cage.model.js";

export interface CellI{
    cell_id?: number | null;
    workshop_number: number;
    row_number: number;
    cell_number: number;
}

@Table({
    tableName: "cell",
    timestamps: false
})
export class Cell extends Model implements CellI{

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    cell_id?: number;

    @AllowNull(false)
    @Column({
        type:DataType.INTEGER,
        unique: "unique_cell"
    })
    workshop_number: number;

    @AllowNull(false)
    @Column({
        type:DataType.INTEGER,
        unique: "unique_cell"
    })
    row_number: number;

    @AllowNull(false)
    @Column({
        type:DataType.INTEGER,
        unique: "unique_cell"
    })
    cell_number: number;

    @HasOne(() => WatchingChickenInCage)
    watching_chicken_in_cages: WatchingChickenInCage[];
}