import { Service } from "typedi";
import { Room } from "../models/Room";
import { BaseRepository } from "./BaseRepository";
import { IRoomRepository } from "./Interfaces/IRoomRepository";
import { RoomImage } from "../models/RoomImage";
import { Image } from "../models/Image";
import { Op } from "sequelize";
import { Device } from "../models/Device";
import { DeviceCategory } from "../models/DeviceCategory";

@Service()
export class RoomRepository
  extends BaseRepository<Room>
  implements IRoomRepository
{
  constructor() {
    super(Room);
  }

  async getAllRooms(page: number, limit: number): Promise<Room[]> {
    try {
      const offsetValue = (page - 1) * limit;
      const allRooms = await this.model.findAll({
        limit: limit,
        offset: offsetValue,
        include: [
          {
            model: RoomImage,
            attributes: ["imageId"],
            include: [
              {
                model: Image,
                attributes: ["imageUrl"],
              },
            ],
          },
        ],
      });
      return allRooms;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getRoomById(id: number): Promise<Room | null> {
    try {
      const room = await this.model.findOne({
        where: { room_id: id },
        include: [
          {
            model: RoomImage,
            attributes: ["imageId"],
            include: [
              {
                model: Image,
                attributes: ["imageUrl"],
              },
            ],
          },
          {
            model: Device,
            attributes: ["categoryId", "deviceName"],
          },
        ],
      });
      return room;
    } catch (err) {
      throw err;
    }
  }

  async getRoomByDeviceCategory(
    categoryId: number,
    limit: number,
    offset: number
  ): Promise<{ rows: Room[]; count: number }> {
    try {
      const offsetValue = (offset - 1) * limit;
      const room = await this.model.findAndCountAll({
        limit: limit,
        offset: offsetValue,
        include: [
          {
            model: RoomImage,
            attributes: ["imageId"],
            include: [
              {
                model: Image,
                attributes: ["imageUrl"],
              },
            ],
          },
          {
            model: Device,
            attributes: ["categoryId", "deviceName"],
            include: [
              {
                model: DeviceCategory,
                where: {
                  id: categoryId,
                },
              },
            ],
          },
        ],
      });
      return room;
    } catch (err) {
      throw err;
    }
  }

  async deleteRoomById(id: number): Promise<void> {
    try {
      await this.model.destroy({
        where: {
          room_id: id,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async createRoom(
    roomNumber: number,
    description: string,
    price: number,
    roomArea: number,
    max_occupancy: number,
    roomStatus: string | undefined
  ): Promise<Room> {
    try {
      const room = await this.model.create({
        roomNumber: roomNumber,
        description: description,
        price: price,
        roomArea: roomArea,
        maxOccupancy: max_occupancy,
        roomStatus: roomStatus,
      });
      return room;
    } catch (err) {
      throw err;
    }
  }

  async filterRoomByPrice(
    leftPrice: number | undefined,
    rightPrice: number
  ): Promise<Room[]> {
    try {
      let whereCondition: any = {};
      if (leftPrice !== undefined && rightPrice !== undefined) {
        whereCondition.price = {
          [Op.between]: [leftPrice, rightPrice],
        };
      } else if (leftPrice !== undefined) {
        whereCondition.price = {
          [Op.gte]: leftPrice,
        };
      } else if (rightPrice !== undefined) {
        whereCondition.price = {
          [Op.lte]: rightPrice,
        };
      }
      const rooms = await this.model.findAll({
        where: whereCondition,
        include: [
          {
            model: RoomImage,
            attributes: ["imageId"],
            include: [
              {
                model: Image,
                attributes: ["imageUrl"],
              },
            ],
          },
        ],
      });
      return rooms;
    } catch (err) {
      throw err;
    }
  }

  async getNumberRoom(): Promise<number> {
    try {
      const numberRoom = this.model.count();
      return numberRoom;
    } catch (err) {
      throw err;
    }
  }

  async updateRoomById(id: string, newData: any): Promise<Room> {
    try {
      await this.model.update(newData, {
        where: {
          room_id: id,
        },
      });
      const room = await this.model.findOne({
        where: {
          room_id: id,
        },
      });
      return room!;
    } catch (err) {
      throw err;
    }
  }
}
