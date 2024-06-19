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
import { Stream } from './stream.model';
import { Student } from './student.model';

@Table({
    tableName: 'Группа',
    timestamps: false
})
export class Group extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column({
        type: DataType.INTEGER
    })
    groupId: number;

    @AllowNull(false)
    @Column({
        type: DataType.INTEGER
    })
    groupNumber: number;

    @ForeignKey(() => Stream)
    @Column({
        type: DataType.INTEGER
    })
    streamId: number | null;

    @BelongsTo(() => Stream, {onDelete: 'SET NULL'})
    stream: Stream;

    @HasMany(() => Student)
    students: Student[];
}