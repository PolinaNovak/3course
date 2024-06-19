import { 
    Table,
    Column,
    Model,
    PrimaryKey,
    AllowNull,
    AutoIncrement,
    DataType,
    ForeignKey,
    BelongsTo
} from 'sequelize-typescript';
import { Exam } from './exam.model';

@Table({
    tableName: 'Консультация',
    timestamps: false
})
export class Consultation extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column({
        type: DataType.SMALLINT
    })
    consultationId: number;

    @ForeignKey(() => Exam)
    @Column({
        type: DataType.SMALLINT
    })
    examId: number | null;

    @BelongsTo(() => Exam, {onDelete: 'SET NULL'})
    exam: Exam;

    @AllowNull(false)
    @Column({
        type: DataType.DATEONLY
    })
    date: Date;

    @AllowNull(false)
    @Column({
        type: DataType.TIME
    })
    time: string;

    @Column({
        type: DataType.INTEGER
    })
    auditorium: number | null;
}