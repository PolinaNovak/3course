import { 
    Table,
    Column,
    Model,
    PrimaryKey,
    AllowNull,
    AutoIncrement,
    DataType,
    HasMany,
    Index
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
        type: DataType.INTEGER
    })
    subjectId: number;

    @Index
    @AllowNull(false)
    @Column({
        type: DataType.TEXT
    })
    name: string;

    @HasMany(() => Exam)
    exams: Exam[];
}