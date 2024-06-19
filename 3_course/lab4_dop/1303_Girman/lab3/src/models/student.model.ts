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
import { Department } from './department.model';
import { Group } from './group.model';
import { ExaminationSheet } from './examinationSheet.model';

@Table({
    tableName: 'Абитуриент',
    timestamps: false
})
export class Student extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        unique: true
    })
    uniqueNumber: number;

    @AllowNull(false)
    @Column({
        type: DataType.TEXT
    })
    lastName: string;

    @AllowNull(false)
    @Column({
        type: DataType.TEXT
    })
    firstName: string;

    @AllowNull(false)
    @Column({
        type: DataType.TEXT
    })
    middleName: string;

    @AllowNull(false)
    @Column({
        type: DataType.SMALLINT
    })
    passportSeries: number;

    @AllowNull(false)
    @Column({
        type: DataType.INTEGER
    })
    passportNumber: number;

    @Column({
        type: DataType.TEXT
    })
    educationalInstitution: string | null;

    @Column({
        type: DataType.TEXT
    })
    city: string | null;

    @Column({
        type: DataType.DATEONLY
    })
    graduationDateOfTheEI: Date | null;

    @Column({
        type: DataType.TEXT
    })
    medal: string | null;

    @Column({
        type: DataType.TEXT
    })
    statusOfDocuments: string | null;

    @AllowNull(false)
    @Column({
        type: DataType.SMALLINT
    })
    numberOfExams: number;

    @ForeignKey(() => Department)
    @Column({
        type: DataType.SMALLINT
    })
    departmentId: number | null;

    @BelongsTo(() => Department, {onDelete: 'SET NULL'})
    department: Department;

    @ForeignKey(() => Group)
    @Column({
        type: DataType.INTEGER
    })
    groupId: number | null;

    @BelongsTo(() => Group, {onDelete: 'SET NULL'})
    group: Group;

    @HasMany(() => ExaminationSheet)
    examinationSheets: ExaminationSheet[];
}