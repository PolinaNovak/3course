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
import { Department } from './department.model';

@Table({
    tableName: 'Факультет',
    timestamps: false
})
export class Faculty extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column({
        type: DataType.SMALLINT
    })
    facultyId: number;

    @AllowNull(false)
    @Column({
        type: DataType.TEXT,
        unique: true
    })
    name: string;

    @AllowNull(false)
    @Column({
        type: DataType.SMALLINT
    })
    places: number;

    @HasMany(() => Department)
    departments: Department[];
}
