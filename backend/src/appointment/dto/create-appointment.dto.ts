import {IsDateString, IsMilitaryTime, IsNotEmpty, IsString} from "class-validator";
import {Type} from "class-transformer";
import {User} from "../../user/entities/user.entity";
import {Date} from "mongoose";

export class CreateAppointmentDto {

    @IsString()
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsString()
    @IsMilitaryTime()
    start_timeslot: Date

    @IsNotEmpty()
    @IsString()
    @IsMilitaryTime()
    end_timeslot: Date

    @Type(() => User)
    author: User;

}
