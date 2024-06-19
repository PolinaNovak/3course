import { 
    Table,
    Column,
    Model,
    PrimaryKey,
    AllowNull,
    AutoIncrement,
    DataType,
    HasMany,
    ForeignKey,
    BelongsTo
} from 'sequelize-typescript';
import { Faculty } from './faculty.model';
import { Student } from './student.model';

@Table({
    tableName: 'Кафедра',
    timestamps: false
})
export class Department extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column({
        type: DataType.INTEGER
    })
    departmentId: number;

    @AllowNull(false)
    @Column({
        type: DataType.TEXT
    })
    name: string;

    @AllowNull(false)
    @ForeignKey(() => Faculty)
    @Column({
        type: DataType.SMALLINT
    })
    facultyId: number;

    @BelongsTo(() => Faculty, {onDelete: 'CASCADE'})
    faculty: Faculty;

    @HasMany(() => Student)
    students: Student[];
}