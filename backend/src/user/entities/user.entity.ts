import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {Exclude, Transform} from "class-transformer";

export type UserDocument = User & Document;

@Schema({timestamps: true})
export class User {

    @Transform(value => value.obj._id.toString())
    _id: string;

    @Prop({required: true})
    name: string;

    @Prop({unique: true, required: true})
    email: string;

    @Prop({required: true})
    @Exclude()
    password: string;

    @Prop({default: "patient"})
    role: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
