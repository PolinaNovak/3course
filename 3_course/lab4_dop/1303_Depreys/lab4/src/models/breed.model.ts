import {AllowNull, Column, DataType, HasMany, Index, Model, PrimaryKey, Table} from "sequelize-typescript";
import {Chicken} from "./chicken.model.js";

export interface BreedI{
    breed_name: string;
    average_eggs_per_month: number;
    average_weight: number;
    recommended_diet_number: number;
}

@Table({
    tableName: "breed",
    timestamps: false
})
export class Breed extends Model implements BreedI{


    @PrimaryKey
    @Column(DataType.TEXT)
    breed_name: string;

    @Index
    @AllowNull(false)
    @Column({
        type:DataType.INTEGER,
    })
    average_eggs_per_month: number;

    @AllowNull(false)
    @Column({
        type:DataType.REAL,
    })
    average_weight: number;

    @AllowNull(false)
    @Column({
        type:DataType.INTEGER,
    })
    recommended_diet_number: number;

    @HasMany(() => Chicken)
    chickens: Chicken[];
}