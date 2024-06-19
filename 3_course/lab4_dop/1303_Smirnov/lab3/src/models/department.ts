import {AllowNull, AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table} from "sequelize-typescript";
import {Abonent} from "./abonent";


@Table({
    tableName: 'department'
})
export class Department extends Model{
    @HasMany(() => Abonent)
    declare abonents: Abonent[]

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    declare department_id: number

    @AllowNull(false)
    @Column(DataType.STRING)
    declare department_name: string

    @AllowNull(false)
    @Column(DataType.STRING)
    declare department_phone: string
}