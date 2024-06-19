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
import { Subject } from './subject.model';
import { ExaminationSheet } from './examinationSheet.model';
import { Consultation } from './consultation.model';
import { Stream } from './stream.model';

@Table({
    tableName: 'Экзамен',
    timestamps: false
})
export class Exam extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column({
        type: DataType.INTEGER
    })
    examId: number;

    @ForeignKey(() => Stream)
    @Column({
        type: DataType.INTEGER
    })
    streamId: number | null;

    @BelongsTo(() => Stream, {onDelete: 'SET NULL'})
    stream: Stream;

    @AllowNull(false)
    @ForeignKey(() => Subject)
    @Column({
        type: DataType.INTEGER
    })
    subjectId: number;

    @BelongsTo(() => Subject, {onDelete: 'CASCADE'})
    subject: Subject;

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

    @HasMany(() => ExaminationSheet)
    examinationSheets: ExaminationSheet[];

    @HasMany(() => Consultation)
    consultations: Consultation[];
}