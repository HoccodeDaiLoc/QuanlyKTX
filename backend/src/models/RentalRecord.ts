import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import { Room } from "./Room";
import { Renter } from "./Renter";

@Table({
    tableName: RentalRecord.RENTALRECORD_TABLE_NAME
})
export class RentalRecord extends Model {
    private static RENTALRECORD_TABLE_NAME = "renterRecords" as string;
    private static RENTALRECORD_ID = "renter_id" as string;
    private static RENTALRECORD_CHECK_IN_DATE = "date_of_birth" as string;
    private static RENTALRECORD_CHECK_OUT_DATE = "address" as string;

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        field: RentalRecord.RENTALRECORD_ID,
        autoIncrement: true
    })
    renterRecordId!: number;

    @Column({
        type: DataType.DATE,
        field: RentalRecord.RENTALRECORD_CHECK_IN_DATE
    })
    checkInDate!: Date;

    @Column({
        type: DataType.DATE,
        field: RentalRecord.RENTALRECORD_CHECK_OUT_DATE
    })
    checkOutDate!: Date;

    @ForeignKey(() => Room)
    @Column({
        type: DataType.INTEGER,
        field: "room_id"
    })
    roomId!: number;

    @ForeignKey(() => Renter)
    @Column({
        type: DataType.INTEGER,
        field: "renter_id"
    })
    renterId!: string;

    @BelongsTo(() => Room)
    room!: Room;

    @BelongsTo(() => Renter)
    renter!: Renter;
}