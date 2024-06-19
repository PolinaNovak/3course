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
import {Department} from "./department";
import {Issues} from "./issues";

@Table({
    tableName: 'abonent',
    paranoid: true
})
export class Abonent extends Model{
    @BelongsTo(() => Department, {onDelete: "CASCADE"})
    declare department: Department

    @HasMany(() => Issues)
    declare issues: Issues[]

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    declare abonent_id: number

    @AllowNull(false)
    @Column(DataType.STRING)
    declare phone_number: string

    @AllowNull(false)
    @Column(DataType.STRING)
    declare name: string

    @Column(DataType.STRING)
    declare surname: string | null

    @Column(DataType.STRING)
    declare middle_name: string | null

    @AllowNull(false)
    @ForeignKey(() => Department)
    @Column(DataType.INTEGER)
    declare department_id: number

    get fullName(): string {
        let full = `${this.name}`;
        if (this.surname !== null)
            full += ' ' + this.surname
        if (this.middle_name != null)
            full += ' ' + this.middle_name
        return full
    }
}