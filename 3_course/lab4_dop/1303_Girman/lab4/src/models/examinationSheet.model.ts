import { 
    Table,
    Column,
    Model,
    PrimaryKey,
    AllowNull,
    DataType,
    ForeignKey,
    BelongsTo
} from 'sequelize-typescript';
import { Exam } from './exam.model';
import { Student } from './student.model';

@Table({
    tableName: 'Ведомость',
    timestamps: false
})
export class ExaminationSheet extends Model {
    @PrimaryKey
    @ForeignKey(() => Exam)
    @Column({
        type: DataType.INTEGER
    })
    examId: number | null;

    @BelongsTo(() => Exam, {onDelete: 'SET NULL'})
    exam: Exam;

    @PrimaryKey
    @ForeignKey(() => Student)
    @Column({
        type: DataType.INTEGER
    })
    studentId: number | null;

    @BelongsTo(() => Student, {onDelete: 'SET NULL'})
    student: Student;

    @AllowNull(false)
    @Column({
        type: DataType.INTEGER
    })
    grade: number;

    @AllowNull(false)
    @Column({
        type: DataType.BOOLEAN
    })
    Appeal: boolean;
}