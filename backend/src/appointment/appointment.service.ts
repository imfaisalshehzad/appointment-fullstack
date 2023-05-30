import {HttpException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateAppointmentDto} from './dto/create-appointment.dto';
import {UpdateAppointmentDto} from './dto/update-appointment.dto';
import {InjectConnection, InjectModel} from "@nestjs/mongoose";
import mongoose, {Connection, Model, Schema} from "mongoose";
import {Appointment, AppointmentDocument} from "./entities/appointment.entity";
import {User} from "../user/entities/user.entity";
import {DateTime} from 'luxon'

@Injectable()
export class AppointmentService {
    constructor(@InjectModel(Appointment.name) private appointmentModel: Model<AppointmentDocument>) {}
    async create(createAppointmentDto: CreateAppointmentDto, author: User) {

        let start = DateTime.fromISO(`${createAppointmentDto.start_timeslot}`).toISO();
        let end = DateTime.fromISO(`${createAppointmentDto.end_timeslot}`).toISO();
        const res = await this.appointmentModel.count({
            start_timeslot: { $gte: start },
            end_timeslot: { $lte: end },
        }).exec();
        if (res){
            throw new HttpException("appointment already exist.", 400);
        }

        const createdData = new this.appointmentModel({
            ...createAppointmentDto,
            start_timeslot: start,
            end_timeslot: end,
            author
        });
        return createdData.save();
    }

    async findAll() {
        return this.appointmentModel.find().populate('author').sort({"createdAt": "desc"})
    }

    async findOne(id: string) {
        const data = await this.appointmentModel.findById(id);
        if (!data) {
            throw new NotFoundException();
        }
        return data;
    }

    async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {

        let start = DateTime.fromISO(`${updateAppointmentDto.start_timeslot}`).toISO();
        let end = DateTime.fromISO(`${updateAppointmentDto.end_timeslot}`).toISO();
        const res = await this.appointmentModel.count({
            start_timeslot: { $gte: start },
            end_timeslot: { $lte: end },
        }).exec();
        if (res){
            throw new HttpException("appointment already exist.", 400);
        }

        const data = await this.appointmentModel
            .findByIdAndUpdate(id, updateAppointmentDto)
            .setOptions({overwrite: true, new: true});
        if (!data) {
            throw new NotFoundException();
        }
        return data;
    }

    async remove(id: string) {
        const result = await this.appointmentModel.findByIdAndDelete(id);
        if (!result) {
            throw new NotFoundException();
        }
    }

    async deleteMany(ids: string[], session: mongoose.ClientSession | null = null,) {
        return this.appointmentModel.deleteMany({_id: ids}).session(session);
    }

}
