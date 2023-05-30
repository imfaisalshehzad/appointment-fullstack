import {Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards} from '@nestjs/common';
import {AppointmentService} from './appointment.service';
import {CreateAppointmentDto} from './dto/create-appointment.dto';
import {UpdateAppointmentDto} from './dto/update-appointment.dto';
import ParamsWithId from "../utils/paramsWithId";
import RequestWithUser from "../auth/requestWithUser.interface";

@Controller('appointment')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) {}

    /*@todo: @UseGuards(JwtAuthenticationGuard) */
    @Post()
    async create(@Body() createAppointmentDto: CreateAppointmentDto, @Req() req: RequestWithUser) {
        return this.appointmentService.create(createAppointmentDto, req.user);
    }

    @Get()
    async findAll() {
        return this.appointmentService.findAll();
    }

    @Get(':id')
    async findOne(@Param() {id}: ParamsWithId) {
        return this.appointmentService.findOne(id);
    }

    @Patch(':id')
    async update(@Param() {id}: ParamsWithId, @Body() updateAppointmentDto: UpdateAppointmentDto) {
        return this.appointmentService.update(id, updateAppointmentDto);
    }

    @Delete(':id')
    async remove(@Param() {id}: ParamsWithId) {
        return this.appointmentService.remove(id);
    }
}
