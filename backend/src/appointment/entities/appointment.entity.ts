import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, {Date, Document} from 'mongoose';
import {Transform, Type} from 'class-transformer';
import {User, UserSchema} from "../../user/entities/user.entity";

export type AppointmentDocument = Appointment & Document;

@Schema({timestamps: true})
export class Appointment {

    @Transform(value => value.obj._id.toString())
    _id: string;

    @Prop()
    name: string;

    @Prop({type: Date})
    start_timeslot: Date;

    @Prop({type: Date})
    end_timeslot: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    @Type(() => User)
    author: User;

}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
