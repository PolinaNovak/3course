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
import { Department } from './department.model';

@Table({
    tableName: 'Факультет',
    timestamps: false
})
export class Faculty extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column({
        type: DataType.INTEGER
    })
    facultyId: number;

    @Index
    @AllowNull(false)
    @Column({
        type: DataType.TEXT,
        unique: true
    })
    name: string;

    @AllowNull(false)
    @Column({
        type: DataType.INTEGER
    })
    places: number;

    @HasMany(() => Department)
    departments: Department[];
}
