import {PartialType} from '@nestjs/mapped-types';
import {CreateAppointmentDto} from './create-appointment.dto';
import {IsNotEmpty, IsOptional} from "class-validator";
import {Exclude, Type} from "class-transformer";
import {User} from "../../user/entities/user.entity";

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {

    @IsOptional()
    @Exclude()
    _id: string;

    @Type(() => User)
    @IsOptional()
    @IsNotEmpty()
    author?: User;
}
