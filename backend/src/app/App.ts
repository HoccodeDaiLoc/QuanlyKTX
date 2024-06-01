import express, { Application, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import globalHandler from "../middlewares/ErrorMiddleware";

import Database from "../config/Database";
import RoomRoutes from "../routes/RoomRoutes";
import { AppError } from "../errors/AppError";
import DeviceRoutes from "../routes/DeviceRoutes";
import DeviceCategoryRoutes from "../routes/DeviceCategoryRoutes";
import RenterRoutes from "../routes/RenterRoutes";
import UserRoutes from "../routes/UserRoutes";
import ContractRoutes from "../routes/ContractRoutes";
import RentalRecordRoutes from "../routes/RentalRecordRoutes";
import WaterReadingRoutes from "../routes/WaterReadingRoutes";
import ElectricReadingRoutes from "../routes/ElectricReadingRoutes";
import BillRoutes from "../routes/BillRoutes";
dotenv.config();

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.databaseSync();
    this.plugins();
    this.routes();
    this.catchError();
  }

  private databaseSync(): void {
    const database = Database.getInstance();
    database
      .sequelize!.sync({ force: false })
      .then(() => {
        // console.log('✅ Cơ sở dữ liệu đã được đồng bộ hóa.');
      })
      .catch((error: Error) => {
        console.error("❌ Lỗi đồng bộ hóa cơ sở dữ liệu:", error);
      });
  }

  private routes(): void {
    this.app.use("/api/room", RoomRoutes);
    this.app.use("/api/device", DeviceRoutes);
    this.app.use("/api/category", DeviceCategoryRoutes);
    this.app.use("/api/renter", RenterRoutes);
    this.app.use("/api/user", UserRoutes);
    this.app.use("/api/contract", ContractRoutes);
    this.app.use("/api/waterReading", WaterReadingRoutes);
    this.app.use("/api/rentalrecord", RentalRecordRoutes);
    this.app.use("/api/electricReading", ElectricReadingRoutes);
    this.app.use("/api/bill", BillRoutes);
  }

  private plugins(): void {
    this.app.use(express.json());
    this.app.use(cors({methods: ['GET', 'POST', 'PUT', 'DELETE']}));
    if (process.env.NODE_ENV === "development") {
      this.app.use(morgan("dev"));
    }
	}

  private catchError(): void {
    this.app.all('*', (req: Request, res: Response, next: NextFunction) => {
      next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
    });
    this.app.use(globalHandler);
  }
}

export default new App().app;
