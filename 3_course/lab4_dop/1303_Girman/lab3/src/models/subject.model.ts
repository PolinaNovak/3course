import { 
    Table,
    Column,
    Model,
    PrimaryKey,
    AllowNull,
    AutoIncrement,
    DataType,
    HasMany
} from 'sequelize-typescript';
import { Exam } from './exam.model';

@Table({
    tableName: 'Предмет',
    timestamps: false
})
export class Subject extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column({
        type: DataType.SMALLINT
    })
    subjectId: number;

    @AllowNull(false)
    @Column({
        type: DataType.TEXT
    })
    name: string;

    @HasMany(() => Exam)
    exams: Exam[];
}