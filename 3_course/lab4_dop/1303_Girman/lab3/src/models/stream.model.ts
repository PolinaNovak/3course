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
import { Group } from './group.model';
import { Exam } from './exam.model';

@Table({
    tableName: 'Поток',
    timestamps: false
})
export class Stream extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column({
        type: DataType.SMALLINT
    })
    streamId: number;

    @AllowNull(false)
    @Column({
        type: DataType.SMALLINT
    })
    streamNumber: number;

    @HasMany(() => Group)
    groups: Group[];

    @HasMany(() => Exam)
    exams: Exam[];
}