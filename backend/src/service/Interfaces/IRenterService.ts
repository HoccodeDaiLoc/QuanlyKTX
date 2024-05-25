import { Renter } from "../../models/Renter";

export interface IRenterService {
  getAllRenter(page: number, limit: number): Promise<Renter[]>;
  getRenterById(id: number): Promise<Renter | null>;
  deleteRenterById(id: number): Promise<void>;
  addRenter(
    name: string,
    dateOfBirth: Date,
    address: string,
    phone: string,
    email: string,
    cccd: string,
    roomId: number | undefined,
    checkInDate: Date | undefined,
    checkOutDate: Date | undefined,
  ): Promise<Renter>;
  updateRenterById(id: number, newData: any): Promise<Renter>;
}