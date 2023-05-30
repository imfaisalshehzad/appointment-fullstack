import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./entities/user.entity";
import {AppointmentService} from "../appointment/appointment.service";
import {Appointment, AppointmentSchema} from "../appointment/entities/appointment.entity";

@Module({
    imports: [
        MongooseModule.forFeature([
                {name: User.name, schema: UserSchema},
                {name: Appointment.name, schema: AppointmentSchema},
            ],
        ),
    ],
    controllers: [UserController],
    providers: [UserService, AppointmentService],
    exports: [UserService],
})
export class UserModule {}
