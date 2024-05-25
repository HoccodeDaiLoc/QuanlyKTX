import { Device } from "../../models/Device";
import { DeviceCategory } from "../../models/DeviceCategory";

export interface IDeviceService {
  getAllDevice(): Promise<Device[]>;
  getDeviceById(id: number): Promise<Device | null>;
  deleteDeviceById(id: number): Promise<void>;
  addDevice(
    name: string,
    price: number,
    category_id: number | undefined,
    images: string[] | undefined,
    roomId: number | undefined
  ): Promise<Device>;
  getCategoryOfDevice(id: number[]): Promise<DeviceCategory | null>;
}
